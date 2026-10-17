const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    category: { type: String, default: "Residential", trim: true },
    location: { type: String, default: "", trim: true },
    area: { type: String, default: "", trim: true },
    year: { type: String, default: () => new Date().getFullYear().toString(), trim: true },
    status: { type: String, default: "Completed", trim: true }, // Completed, In Progress, Planning
    scope: { type: String, default: "", trim: true },
    structure: { type: String, default: "", trim: true },
    image: { 
        type: String, 
        default: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" 
    },
    shortDesc: { type: String, default: "" },
    fullDesc: { type: String, default: "" },
    highlights: { type: [String], default: [] },
    clientQuote: { type: String, default: "" },
    clientAuthor: { type: String, default: "" }
}, {
    timestamps: true
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
