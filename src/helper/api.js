import axios from "axios";

const api = axios.create({
  baseURL: "https://hive-server-tpz5.onrender.com/api",
});

export default api;
