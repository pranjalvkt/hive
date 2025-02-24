import axios from "axios";

const chatApi = axios.create({
  baseURL: "https://hive-chat-server.onrender.com/api", // URL for Server
  // baseURL: "http://localhost:8080/api", // URL for Local
});

export default chatApi;
