
const Job = require("../models/Job");

const createJob = async (req, res) => {
    try {
        const {
            company,
            position,
            location,
            status,
            jobType,
            appliedDate,
            jobUrl,
            notes,
        } = req.body;

        if (!company || !position) {
            return res.status(400).json({
                success: false,
                message: "Company and position are required",
            });
        }

        const job = await Job.create({
            company,
            position,
            location,
            status,
            jobType,
            appliedDate,
            jobUrl,
            notes,
            user: req.user.userId,
        });

        return res.status(201).json({
            success: true,
            message: "Job application created successfully",
            job,
        });
    } catch (error) {
        console.error("Create job error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to create job application",
        });
    }
};


const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({
            user: req.user.userId,
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: jobs.length,
            jobs,
        });
    } catch (error) {
        console.error("Get all jobs error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch job applications",
        });
    }
};


const getJobById = async (req, res) => {
    try {
        const { id } = req.params;

        const job = await Job.findOne({
            _id: id,
            user: req.user.userId,
        });

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job application not found",
            });
        }

        return res.status(200).json({
            success: true,
            job,
        });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid job ID",
            });
        }

        console.error("Get job by ID error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch job application",
        });
    }
};


const updateJob = async (req, res) => {
    try {
        const allowedFields = [
            "company",
            "position",
            "location",
            "status",
            "jobType",
            "appliedDate",
            "jobUrl",
            "notes",
        ];

        const updates = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide at least one field to update",
            });
        }

        const job = await Job.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.userId,
            },
            { $set: updates },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job application not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Job application updated successfully",
            job,
        });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid job ID or field value",
            });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        console.error("Update job error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to update job application",
        });
    }
};


const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job application deleted successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    console.error("Delete job error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to delete job application",
    });
  }
};



module.exports = { createJob, getAllJobs, getJobById, updateJob, deleteJob };
