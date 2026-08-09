import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.PROD
    ? "https://prayas-charitable-trust.vercel.app"
    : "http://localhost:5000",
});

export default api;