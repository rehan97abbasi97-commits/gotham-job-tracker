
import api from "./api";

// Get all job applications
export const getAllJobs = async () => {
    const response = await api.get("/jobs");
    return response.data;
};

// Create a new job application
export const createJob = async (jobData) => {
    const response = await api.post("/jobs", jobData);
    return response.data;
};


// Update an existing job application
export const updateJob = async (jobId, jobData) => {
    const response = await api.put(`/jobs/${jobId}`, jobData);
    return response.data;
};

// Delete a job application
export const deleteJob = async (jobId) => {
    const response = await api.delete(`/jobs/${jobId}`);
    return response.data;
};
