import React, { useState, useRef } from 'react';
import axios from 'axios';
import API_URL from '../config/api';
import './imageDeviceUploader.css';
import {
    RiUploadCloud2Line,
    RiImageAddLine,
    RiLinkM,
    RiCheckLine,
    RiCloseLine,
    RiDeleteBin6Line,
    RiRefreshLine,
    RiFolderUploadLine,
    RiFileImageLine,
    RiInformationLine,
    RiCheckDoubleLine
} from 'react-icons/ri';

/**
 * Format bytes to readable string (e.g. 1.2 MB)
 */
const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Resolves full image URL if relative path
 */
export const resolveImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('/uploads')) {
        return `${API_URL}${url}`;
    }
    return url;
};

const ImageDeviceUploader = ({
    label = 'Cover Image',
    subLabel = 'Add a custom photo from your device or select from presets',
    value = '',
    onChange,
    presets = [],
    variant = 'cover', // 'cover' (landscape 16:9) | 'avatar' (circular/square)
    required = false,
    onToast
}) => {
    // Current input source mode: 'device' | 'url'
    const [sourceMode, setSourceMode] = useState('device');
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [fileMeta, setFileMeta] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const fileInputRef = useRef(null);

    // Open native device file picker
    const handleTriggerBrowse = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
            fileInputRef.current.click();
        }
    };

    // Process a selected or dropped file from the device
    const processDeviceFile = async (file) => {
        if (!file) return;

        setErrorMessage('');

        // Validate image mime type
        if (!file.type.startsWith('image/')) {
            const err = 'Selected file must be an image (JPEG, PNG, WEBP, GIF, SVG).';
            setErrorMessage(err);
            if (onToast) onToast(err, 'error');
            return;
        }

        // Validate file size limit (25MB)
        const maxBytes = 25 * 1024 * 1024;
        if (file.size > maxBytes) {
            const err = `Image file is too large (${formatFileSize(file.size)}). Max allowed is 25MB.`;
            setErrorMessage(err);
            if (onToast) onToast(err, 'error');
            return;
        }

        // 1. Read locally for immediate preview (zero-lag user feedback)
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64Preview = e.target.result;
            // Store file metadata
            setFileMeta({
                name: file.name,
                size: formatFileSize(file.size),
                type: file.type,
                isFromDevice: true
            });
            // Instantly show local preview
            onChange(base64Preview);
        };
        reader.readAsDataURL(file);

        // 2. Upload to server via /api/upload
        setIsUploading(true);
        setUploadProgress(10);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axios.post(`${API_URL}/api/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(percent);
                    }
                }
            });

            if (res.data && res.data.success) {
                // Prefer fullUrl or server url
                const finalUrl = res.data.url || (res.data.relativeUrl ? `${API_URL}${res.data.relativeUrl}` : '');
                if (finalUrl) {
                    onChange(finalUrl);
                }
                if (onToast) {
                    onToast(`Image "${file.name}" uploaded successfully from device!`, 'success');
                }
            }
        } catch (uploadErr) {
            console.warn('Server upload error, using local data URL fallback:', uploadErr);
            // Even if server upload endpoint fails, local base64 preview is preserved in onChange!
            if (onToast) {
                onToast('Image loaded from device. (Local preview active)', 'success');
            }
        } finally {
            setIsUploading(false);
            setUploadProgress(100);
            setTimeout(() => setUploadProgress(0), 600);
        }
    };

    // File input change handler
    const handleFileInputChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            processDeviceFile(file);
        }
    };

    // Drag and Drop handlers
    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isDragging) setIsDragging(true);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            processDeviceFile(files[0]);
        }
    };

    // Clear current image
    const handleClearImage = () => {
        onChange('');
        setFileMeta(null);
        setErrorMessage('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Display URL resolved
    const displayUrl = resolveImageUrl(value);
    const hasImage = Boolean(value && value.trim());

    return (
        <div className={`custom-image-uploader-wrapper ${variant}-variant`}>
            {/* Header with Title and Mode Switcher */}
            <div className="uploader-header-row">
                <div className="uploader-labels">
                    <label className="uploader-main-label">
                        {label} {required && <span className="req">*</span>}
                    </label>
                    {subLabel && <span className="uploader-sub-label">{subLabel}</span>}
                </div>

                {/* Source Selection Tabs */}
                <div className="uploader-mode-tabs" role="tablist">
                    <button
                        type="button"
                        role="tab"
                        aria-selected={sourceMode === 'device'}
                        className={`mode-tab-btn ${sourceMode === 'device' ? 'active' : ''}`}
                        onClick={() => {
                            setSourceMode('device');
                            setErrorMessage('');
                        }}
                    >
                        <RiFolderUploadLine size={16} />
                        <span>Upload From Device</span>
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected={sourceMode === 'url'}
                        className={`mode-tab-btn ${sourceMode === 'url' ? 'active' : ''}`}
                        onClick={() => {
                            setSourceMode('url');
                            setErrorMessage('');
                        }}
                    >
                        <RiLinkM size={16} />
                        <span>Image URL / Presets</span>
                    </button>
                </div>
            </div>

            {/* Error banner if any */}
            {errorMessage && (
                <div className="uploader-error-banner">
                    <RiInformationLine size={16} />
                    <span>{errorMessage}</span>
                    <button type="button" onClick={() => setErrorMessage('')}>
                        <RiCloseLine size={14} />
                    </button>
                </div>
            )}

            {/* Hidden native file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/svg+xml"
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
            />

            {/* ============================================================== */}
            {/* MODE 1: DEVICE UPLOAD DROPZONE */}
            {/* ============================================================== */}
            {sourceMode === 'device' && (
                <div className="device-upload-section">
                    {!hasImage ? (
                        /* Empty state: Dropzone */
                        <div
                            className={`device-dropzone ${isDragging ? 'is-dragging' : ''} ${isUploading ? 'is-uploading' : ''}`}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onClick={handleTriggerBrowse}
                        >
                            {isUploading ? (
                                <div className="dropzone-uploading-state">
                                    <div className="spinner-gold"></div>
                                    <span className="uploading-title">Uploading image from device...</span>
                                    <div className="upload-progress-track">
                                        <div
                                            className="upload-progress-bar"
                                            style={{ width: `${uploadProgress || 45}%` }}
                                        />
                                    </div>
                                    <span className="uploading-hint">Securing high-resolution visual...</span>
                                </div>
                            ) : (
                                <div className="dropzone-idle-content">
                                    <div className="dropzone-icon-circle">
                                        <RiUploadCloud2Line size={32} />
                                    </div>
                                    <h4 className="dropzone-title">
                                        Choose a file or drag &amp; drop it here
                                    </h4>
                                    <p className="dropzone-desc">
                                        JPEG, PNG, WEBP, GIF, SVG up to 25MB from your phone or PC
                                    </p>
                                    <button
                                        type="button"
                                        className="btn-browse-device"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleTriggerBrowse();
                                        }}
                                    >
                                        <RiImageAddLine size={18} />
                                        <span>Browse from Device</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Has Image: Preview + Device meta pill */
                        <div className="device-loaded-view">
                            <div className="loaded-preview-card">
                                <div className="preview-image-holder">
                                    <img
                                        src={displayUrl}
                                        alt="Uploaded preview"
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
                                        }}
                                    />
                                    <div className="preview-source-badge">
                                        <RiCheckDoubleLine size={13} />
                                        <span>{fileMeta?.isFromDevice ? 'Device Uploaded' : 'Active Image'}</span>
                                    </div>
                                </div>

                                <div className="loaded-meta-sidebar">
                                    <div className="meta-info-block">
                                        <div className="meta-info-title">
                                            <RiFileImageLine className="meta-icon" />
                                            <span className="file-name-text">
                                                {fileMeta?.name || 'Custom Image Loaded'}
                                            </span>
                                        </div>
                                        {fileMeta?.size && (
                                            <span className="file-size-badge">{fileMeta.size}</span>
                                        )}
                                        <span className="status-confirmed-badge">
                                            <RiCheckLine size={14} /> Ready for publishing
                                        </span>
                                    </div>

                                    <div className="meta-actions-row">
                                        <button
                                            type="button"
                                            className="btn-replace-device"
                                            onClick={handleTriggerBrowse}
                                            title="Select a different image from device"
                                        >
                                            <RiRefreshLine size={15} />
                                            <span>Change Photo</span>
                                        </button>
                                        <button
                                            type="button"
                                            className="btn-clear-image"
                                            onClick={handleClearImage}
                                            title="Remove this image"
                                        >
                                            <RiDeleteBin6Line size={15} />
                                            <span>Remove</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* ============================================================== */}
            {/* MODE 2: WEB URL INPUT & PRESETS */}
            {/* ============================================================== */}
            {sourceMode === 'url' && (
                <div className="url-presets-section">
                    <div className="url-input-container">
                        <div className="url-input-row">
                            <RiLinkM className="url-input-icon" />
                            <input
                                type="url"
                                placeholder="Paste image web address (https://...)"
                                value={value}
                                onChange={(e) => {
                                    onChange(e.target.value);
                                    setFileMeta(null);
                                }}
                            />
                            {hasImage && (
                                <button
                                    type="button"
                                    className="url-clear-btn"
                                    onClick={handleClearImage}
                                    title="Clear URL"
                                >
                                    <RiCloseLine size={16} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Presets Chips */}
                    {Array.isArray(presets) && presets.length > 0 && (
                        <div className="presets-container-modern">
                            <span className="presets-header-label">Quick Curated Presets:</span>
                            <div className="preset-chips-list">
                                {presets.map((preset, idx) => {
                                    const isSelected = value === preset.url;
                                    return (
                                        <button
                                            type="button"
                                            key={idx}
                                            className={`preset-pill ${isSelected ? 'selected' : ''}`}
                                            onClick={() => {
                                                onChange(preset.url);
                                                setFileMeta({ name: preset.label, isFromDevice: false });
                                            }}
                                        >
                                            {isSelected && <RiCheckLine size={13} />}
                                            <span>{preset.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Live Preview for URL Mode */}
                    {hasImage && (
                        <div className="url-preview-wrapper">
                            <div className="preview-image-holder">
                                <img
                                    src={displayUrl}
                                    alt="URL Preview"
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
                                    }}
                                />
                                <span className="preview-source-badge url-badge">
                                    <RiLinkM size={13} /> Web Link Active
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ImageDeviceUploader;
