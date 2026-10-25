
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: true,
            trim: true,
        },

        position: {
            type: String,
            required: true,
            trim: true,
        },

        location: {
            type: String,
            trim: true,
            default: "",
        },

        status: {
            type: String,
            enum: ["Applied", "Interview", "Offer", "Rejected"],
            default: "Applied",
        },

        jobType: {
            type: String,
            enum: ["Full-time", "Part-time", "Internship", "Contract"],
            default: "Full-time",
        },

        appliedDate: {
            type: Date,
            default: Date.now,
        },

        jobUrl: {
            type: String,
            trim: true,
            default: "",
        },

        notes: {
            type: String,
            trim: true,
            default: "",
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Job", jobSchema);
