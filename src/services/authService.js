import api from "../helper/api";

export const loginAPI = async (credentials) => {
  const response = await api.post("/login", credentials);
  return response;
};

export const registerAPI = async (userData) => {
  const response = await api.post("/register", userData);
  return response;
};

export const userDetailsAPI = async (data) => {
  const response = await api.get("/user", {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
  return response;
}
