import axios from "axios";

export const SERVER_URL = import.meta.env.PROD
  ? window.location.origin
  : "http://localhost:5000";

const api = axios.create({
  baseURL: `${SERVER_URL}/api`,
});

export default api;