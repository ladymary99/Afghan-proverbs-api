import axios from "axios";

const API_BASE = "http://localhost:3000";

export const getProverbs = () => axios.get(`${API_BASE}/proverbs`);
export const getProverb = (id) => axios.get(`${API_BASE}/proverbs/${id}`);
export const createProverb = (data) => axios.post(`${API_BASE}/proverbs`, data);
export const updateProverb = (id, data) =>
  axios.put(`${API_BASE}/proverbs/${id}`, data);
export const deleteProverb = (id) => axios.delete(`${API_BASE}/proverbs/${id}`);
export const getRandomProverb = () => axios.get(`${API_BASE}/proverbs/random`);
export const searchProverbs = (q) =>
  axios.get(`${API_BASE}/proverbs?search=${q}`);
export const filterByCategory = (category) =>
  axios.get(`${API_BASE}/proverbs?category=${category}`);
