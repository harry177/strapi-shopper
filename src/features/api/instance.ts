import axios from "axios";

export const API_URL = "http://localhost:1337/api";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
