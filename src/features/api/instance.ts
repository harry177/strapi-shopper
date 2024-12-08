import axios from "axios";

export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://strapi-shopper-backend-c8c4fe79471e.herokuapp.com/api"
    : "http://localhost:1337/api";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
