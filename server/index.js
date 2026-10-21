const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const mongoModel = require("./Controller/MongoSchema");
const Project = require("./Controller/ProjectSchema");
const Testimonial = require("./Controller/TestimonialSchema");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken")
dotenv.config();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));


const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,
};

// Configure static directory for uploaded custom images
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use("/uploads", express.static(uploadsDir));

// Multer Storage for device image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const safeOriginalName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_");
        const ext = path.extname(safeOriginalName).toLowerCase() || ".jpg";
        cb(null, `img-${uniqueSuffix}${ext}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 25 * 1024 * 1024 }, // 25MB max file size
    fileFilter: (req, file, cb) => {
        const allowedExts = /\.(jpg|jpeg|png|webp|gif|svg)$/i;
        const isExtValid = allowedExts.test(path.extname(file.originalname).toLowerCase());
        const isMimeValid = file.mimetype && file.mimetype.startsWith("image/");
        if (isExtValid || isMimeValid) {
            cb(null, true);
        } else {
            cb(new Error("Only image files (JPG, PNG, WEBP, GIF, SVG) are allowed!"), false);
        }
    }
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log(err);
    });

app.get("/api", (req, res) => {
    res.send("Hello World!");
});

// Image Upload Endpoint (from user device)
app.post("/api/upload", (req, res) => {
    upload.single("image")(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.error("Multer error:", err);
            return res.status(400).json({ success: false, message: `Upload error: ${err.message}` });
        } else if (err) {
            console.error("Upload file filter error:", err);
            return res.status(400).json({ success: false, message: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: "No image file provided in request." });
        }

        const relativeUrl = `/uploads/${req.file.filename}`;
        const fullUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

        res.status(200).json({
            success: true,
            message: "Image uploaded successfully from device",
            url: fullUrl,
            relativeUrl: relativeUrl,
            filename: req.file.filename,
            size: req.file.size,
            mimetype: req.file.mimetype
        });
    });
});

app.post("/auth/register", async (req, res) => {
    try {
        const { username, name, email, password } = req.body || {};
        const userEmail = email || username;
        const userName = name || username;

        if (!userEmail || !password) {
            return res.status(400).json({ success: false, message: "Please enter your username/email and password" });
        }

        const existingUser = await mongoModel.findOne({
            $or: [{ email: userEmail }, { name: userName }]
        });

        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists with this username/email" });
        }

        const user = new mongoModel({
            name: userName,
            email: userEmail,
            password: password
        });
        await user.save();
        res.status(201).json({ success: true, message: "User registered successfully", user });
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post("/auth/login", async (req, res) => {
    try {
        const { username, password } = req.body || {};
        if (!username || !password) {
            return res.status(400).json({ success: false, message: "Please enter your username and password" });
        }

        const result = await mongoModel.findOne({
            $or: [{ email: username }, { name: username }],
            password: password
        });

        if (result) {
            console.log("LOGIN SUCCESS for user:", username);
            res.status(200).json({ success: true, message: "Login successful", result });


        } else {
            res.status(401).json({ success: false, message: "Invalid username or password" });
        }
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Fallback GET route to prevent crashes if visited in browser
app.get("/auth/login", (req, res) => {
    res.status(405).json({ success: false, message: "Method Not Allowed. Please use POST for login." });
});

// ==========================================
// PROJECTS CRUD APIs
// ==========================================

// GET all projects
app.get("/api/projects", async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = {};
        if (category && category !== "All") {
            query.category = new RegExp(`^${category}$`, "i");
        }
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { location: { $regex: search, $options: "i" } },
                { shortDesc: { $regex: search, $options: "i" } }
            ];
        }
        const projects = await Project.find(query).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: projects.length, data: projects });
    } catch (err) {
        console.error("Error fetching projects:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET single project
app.get("/api/projects/:id", async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }
        res.status(200).json({ success: true, data: project });
    } catch (err) {
        console.error("Error fetching project:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST create new project
app.post("/api/projects", async (req, res) => {
    try {
        const {
            title, category, location, area, year, status,
            scope, structure, image, shortDesc, fullDesc,
            highlights, clientQuote, clientAuthor
        } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({ success: false, message: "Project title is required" });
        }

        let parsedHighlights = highlights;
        if (typeof highlights === "string") {
            parsedHighlights = highlights.split("\n").map(h => h.trim()).filter(Boolean);
        }

        const newProject = new Project({
            title: title.trim(),
            category: category || "Residential",
            location: location || "",
            area: area || "",
            year: year || new Date().getFullYear().toString(),
            status: status || "Completed",
            scope: scope || "",
            structure: structure || "",
            image: image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
            shortDesc: shortDesc || "",
            fullDesc: fullDesc || "",
            highlights: Array.isArray(parsedHighlights) ? parsedHighlights : [],
            clientQuote: clientQuote || "",
            clientAuthor: clientAuthor || ""
        });

        const savedProject = await newProject.save();
        res.status(201).json({ success: true, message: "Project created successfully", data: savedProject });
    } catch (err) {
        console.error("Error creating project:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// PUT update project
app.put("/api/projects/:id", async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (typeof updateData.highlights === "string") {
            updateData.highlights = updateData.highlights.split("\n").map(h => h.trim()).filter(Boolean);
        }
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );
        if (!updatedProject) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }
        res.status(200).json({ success: true, message: "Project updated successfully", data: updatedProject });
    } catch (err) {
        console.error("Error updating project:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// DELETE project
app.delete("/api/projects/:id", async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }
        res.status(200).json({ success: true, message: "Project deleted successfully", id: req.params.id });
    } catch (err) {
        console.error("Error deleting project:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// TESTIMONIALS CRUD APIs
// ==========================================

// GET all testimonials
app.get("/api/testimonials", async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: testimonials.length, data: testimonials });
    } catch (err) {
        console.error("Error fetching testimonials:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET single testimonial
app.get("/api/testimonials/:id", async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ success: false, message: "Testimonial not found" });
        }
        res.status(200).json({ success: true, data: testimonial });
    } catch (err) {
        console.error("Error fetching testimonial:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST create new testimonial
app.post("/api/testimonials", async (req, res) => {
    try {
        const { name, role, project, avatar, text, rating } = req.body;
        if (!name || !name.trim()) {
            return res.status(400).json({ success: false, message: "Customer name is required" });
        }
        if (!text || !text.trim()) {
            return res.status(400).json({ success: false, message: "Testimonial feedback text is required" });
        }

        const newTestimonial = new Testimonial({
            name: name.trim(),
            role: role || "Client",
            project: project || "",
            avatar: avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
            text: text.trim(),
            rating: Number(rating) || 5
        });

        const savedTestimonial = await newTestimonial.save();
        res.status(201).json({ success: true, message: "Testimonial created successfully", data: savedTestimonial });
    } catch (err) {
        console.error("Error creating testimonial:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// PUT update testimonial
app.put("/api/testimonials/:id", async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (updateData.rating) {
            updateData.rating = Number(updateData.rating);
        }
        const updatedTestimonial = await Testimonial.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );
        if (!updatedTestimonial) {
            return res.status(404).json({ success: false, message: "Testimonial not found" });
        }
        res.status(200).json({ success: true, message: "Testimonial updated successfully", data: updatedTestimonial });
    } catch (err) {
        console.error("Error updating testimonial:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// DELETE testimonial
app.delete("/api/testimonials/:id", async (req, res) => {
    try {
        const deletedTestimonial = await Testimonial.findByIdAndDelete(req.params.id);
        if (!deletedTestimonial) {
            return res.status(404).json({ success: false, message: "Testimonial not found" });
        }
        res.status(200).json({ success: true, message: "Testimonial deleted successfully", id: req.params.id });
    } catch (err) {
        console.error("Error deleting testimonial:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// SEED INITIAL DATA
// ==========================================
app.post("/api/seed", async (req, res) => {
    try {
        const defaultProjects = [
            {
                title: "The Grand Crest Villa",
                category: "Residential",
                location: "Worli Sea Face, Mumbai",
                area: "7,200 Sq. Ft.",
                year: "2024",
                status: "Completed",
                scope: "Turnkey Civil & Interiors",
                structure: "RCC Earthquake-Resistant Frame",
                image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
                shortDesc: "A bespoke 4-storey private waterfront villa with cantilevered terraces, rooftop infinity pool, and Italian marble finishes.",
                fullDesc: "Commissioned as a private architectural landmark, The Grand Crest Villa integrates state-of-the-art structural engineering with luxury coastal aesthetics.",
                highlights: [
                    "Heavy-duty marine grade Fe-550D TMT reinforcement",
                    "Cantilevered 18-meter panoramic sea-view deck",
                    "Integrated solar-ready rooftop & smart building automation"
                ],
                clientQuote: "Sufi Construction delivered our dream home with zero compromises on structural strength.",
                clientAuthor: "Farhan M. - Property Owner"
            },
            {
                title: "Skyline Horizon Towers",
                category: "Apartments",
                location: "Andheri East, Mumbai",
                area: "145,000 Sq. Ft.",
                year: "2024",
                status: "Completed",
                scope: "Full Multi-Storey Construction",
                structure: "18-Storey High-Rise RCC",
                image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
                shortDesc: "Premium 18-storey twin tower residential development featuring 72 luxury 3BHK & 4BHK apartments.",
                fullDesc: "Skyline Horizon Towers showcases Sufi Construction's high-rise construction capabilities.",
                highlights: [
                    "Speedy Mivan aluminium formwork construction cycle",
                    "Double basement parking with diaphragm wall protection",
                    "Seismic Zone III certified structural foundation"
                ],
                clientQuote: "Partnering with Sufi Construction ensured our 18-storey development was handed over 2 months ahead of schedule.",
                clientAuthor: "K. R. Developers Group"
            },
            {
                title: "Apex Corporate Park",
                category: "Commercial",
                location: "BKC, Mumbai",
                area: "85,000 Sq. Ft.",
                year: "2023",
                status: "Completed",
                scope: "Commercial Civil Framing & Façade",
                structure: "Composite Steel-Concrete Matrix",
                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
                shortDesc: "Grade-A corporate commercial office complex with double-glazed acoustic curtain wall façade.",
                fullDesc: "Built to house multinational corporate headquarters with IGBC Gold green building specifications.",
                highlights: [
                    "Acoustic insulated double-glazed thermal curtain façade",
                    "Column-free office floor plates for modular interior planning"
                ],
                clientQuote: "Flawless engineering and zero safety incidents across 350,000 safe man-hours.",
                clientAuthor: "Apex Commercial Assets"
            }
        ];

        const defaultTestimonials = [
            {
                name: "Ahmed Al-Mansoor",
                role: "Villa Owner, Green Valley",
                project: "Luxury 5BHK Villa",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
                text: "Sufi Construction turned our dream villa into a masterpiece. From the seismic structural foundation to premium interior finishes, their craftsmanship exceeded all expectations.",
                rating: 5
            },
            {
                name: "Sarah Jenkins",
                role: "Managing Director, Apex Ventures",
                project: "Commercial Business Hub",
                avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
                text: "They delivered our 6-story commercial complex two weeks ahead of schedule. Their cost-conscious approach and structural precision saved us significant time and budget.",
                rating: 5
            },
            {
                name: "Rajesh Patel",
                role: "Real Estate Developer",
                project: "Modern Duplex Enclave",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
                text: "We have partnered on three multi-unit residential developments with Sufi Construction. Their engineering excellence makes them our most trusted builder.",
                rating: 5
            }
        ];

        let seededProjects = 0;
        let seededTestimonials = 0;

        const projCount = await Project.countDocuments();
        if (projCount === 0) {
            await Project.insertMany(defaultProjects);
            seededProjects = defaultProjects.length;
        }

        const testCount = await Testimonial.countDocuments();
        if (testCount === 0) {
            await Testimonial.insertMany(defaultTestimonials);
            seededTestimonials = defaultTestimonials.length;
        }

        res.status(200).json({
            success: true,
            message: `Seed complete. Added ${seededProjects} projects and ${seededTestimonials} testimonials.`,
            projectsCount: await Project.countDocuments(),
            testimonialsCount: await Testimonial.countDocuments()
        });
    } catch (err) {
        console.error("Seed error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

