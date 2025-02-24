import chatApi from "../helper/chatApi";

export const createRoomApi = async (roomDetail) => {
  const respone = await chatApi.post(`/v1/rooms`, roomDetail, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
  return respone.data;
};

export const joinChatApi = async (roomId) => {
  const response = await chatApi.get(`/v1/rooms/${roomId}`);
  return response.data;
};

export const getMessagess = async (roomId, size = 50, page = 0) => {
  const response = await chatApi.get(
    `/v1/rooms/${roomId}/messages?size=${size}&page=${page}`
  );
  return response.data;
};

// export const baseURL = "http://localhost:8080"; // URL for Local
export const baseURL = "https://hive-chat-server.onrender.com" // URL for Server