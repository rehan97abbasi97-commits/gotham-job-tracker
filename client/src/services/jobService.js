
import api from "./api";

// Fetch all jobs for the logged-in user
export const getAllJobs = async () => {
  const response = await api.get("/jobs");
  return response.data;
};
