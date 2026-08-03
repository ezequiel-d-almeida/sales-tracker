import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export function getSellers() {
  return api.get("/sellers");
}

export function getLastSale() {
  return api.get("/sales/last");
}

export function createSale(sale) {
  return api.post("/sales", sale);
}

export default api;
