
const express = require("express");

const { createJob, getAllJobs, getJobById, updateJob, deleteJob } = require("../controllers/JobController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a Job
router.post("/", authMiddleware, createJob);

// Get all jobs of the logged-in user
router.get("/", authMiddleware, getAllJobs);

// Get one Job by id
router.get("/:id", authMiddleware, getJobById)

// Update a Job
router.put("/:id", authMiddleware, updateJob)

// Delete a Job
router.delete("/:id", authMiddleware, deleteJob)

module.exports = router;
