import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  withCredentials: true
});

export const productApi = {
  list: (params = {}) => api.get("/api/products", { params }),
  categories: () => api.get("/api/products/categories"),
  get: (id) => api.get(`/api/products/${id}`),
  create: (formData) =>
    api.post("/api/products", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    }),
  update: (id, formData) =>
    api.patch(`/api/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    }),
  remove: (id) => api.delete(`/api/products/${id}`)
};

export const authApi = {
  login: (data) => api.post("/api/auth/login", data),
  logout: () => api.post("/api/auth/logout"),
  me: () => api.get("/api/auth/me")
};
