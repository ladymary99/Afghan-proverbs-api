import axios from "axios";

// Create an axios instance with a base URL
const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Get all proverbs
export const getAllProverbs = async (category = "") => {
  try {
    const url = category ? `/proverbs?category=${category}` : "/proverbs";
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching proverbs:", error);
    throw error;
  }
};

// Get a single proverb by ID
export const getProverbById = async (id) => {
  try {
    const response = await api.get(`/proverbs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching proverb with id ${id}:`, error);
    throw error;
  }
};

// Get a random proverb
export const getRandomProverb = async () => {
  try {
    const response = await api.get("/proverbs/random");
    return response.data;
  } catch (error) {
    console.error("Error fetching random proverb:", error);
    throw error;
  }
};

// Add a new proverb
export const addProverb = async (proverbData) => {
  try {
    const response = await api.post("/proverbs", proverbData);
    return response.data;
  } catch (error) {
    console.error("Error adding proverb:", error);
    throw error;
  }
};

// Update an existing proverb
export const updateProverb = async (id, proverbData) => {
  try {
    const response = await api.put(`/proverbs/${id}`, proverbData);
    return response.data;
  } catch (error) {
    console.error(`Error updating proverb with id ${id}:`, error);
    throw error;
  }
};

// Delete a proverb
export const deleteProverb = async (id) => {
  try {
    const response = await api.delete(`/proverbs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting proverb with id ${id}:`, error);
    throw error;
  }
};

// Get all categories (if the API supports this endpoint)
export const getCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    // If the API doesn't support this endpoint, we'll extract categories from proverbs
    console.warn("Categories endpoint not available, extracting from proverbs");
    const proverbs = await getAllProverbs();
    const categories = [
      ...new Set(proverbs.map((proverb) => proverb.category)),
    ];
    return categories;
  }
};

export default api;
