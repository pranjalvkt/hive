import api from "../helper/api";

export const fetchAddedUsersAPI = async (token) => {
    const response = await api.get("/connections/accepted-requests", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
}

export const fetchRecommendedUsersAPI = async (token) => {
    const response = await api.get("/connections/available-users", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
}