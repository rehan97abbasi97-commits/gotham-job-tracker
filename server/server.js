require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { PORT } = require("./app/utils/constants.utils");
const authRoutes = require("./app/routes/authRoutes");
const jobRoutes = require("./app/routes/jobRoutes");
const app = express();

app.use(express.json());

app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
    })
);

// 4. Authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to JobTrack API!");
});

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "JobTrack API is running!",
    });
});

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Startup failed:", error.message);
        process.exit(1);
    }
};

startServer();