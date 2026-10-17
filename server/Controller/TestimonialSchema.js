const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    role: { type: String, default: "Client", trim: true },
    project: { type: String, default: "", trim: true },
    avatar: { 
        type: String, 
        default: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80" 
    },
    text: { type: String, required: true, trim: true },
    rating: { type: Number, default: 5, min: 1, max: 5 }
}, {
    timestamps: true
});

const Testimonial = mongoose.model("Testimonial", testimonialSchema);
module.exports = Testimonial;
