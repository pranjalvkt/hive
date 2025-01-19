import api from "../helper/api";

export const createPostAPI = async (data) => {
    const response = await api.post("/posts/create", data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    return response;
}

export const fetchPostAPI = async (token) => {
    const response = await api.get("/posts", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return response;
}

export const deletePostAPI = async (id) => {
    const response = await api.delete(`/posts/${id}`);
    return response;
}