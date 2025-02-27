import api from "../helper/api";

export const userDetailsAPI = async (data) => {
  const response = await api.get("/user", {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
  return response;
};

export const updateUserDetailsAPI = async (userData) => {
  const { id, data } = userData;

  const response = await api.put(`/updateUser/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const searchUserAPI = async (data) => {
  const { token, query } = data;
  const response = await api.get(`/search?q=${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getUserDetails = async (id) => {
  try {
      const response = await api.get(`/getUserDetails/${id}`)
      return response.data;
  } catch (error) {
    throw error.status;
  }
}