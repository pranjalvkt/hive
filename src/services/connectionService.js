import api from "../helper/api";

export const fetchAddedUsersAPI = async (token) => {
    const response = await api.get("/connections/all-connections", {
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

export const sendConnectionRequestAPI = async (data) => {
    const {token, personId} = data;
    const response = await api.post("/connections/send", {receiverId: personId}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
}

export const fetchSentRequestAPI = async (token) => {
    const response = await api.get("/connections/sent-requests", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
}

export const fetchPendingRequestAPI = async (token) => {
    const response = await api.get("/connections/pending-requests", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
}

export const acceptRequestAPI = async (params) => {
    const [token, data] = params;
    
    const response = await api.post("/connections/accept", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
}

export const rejectRequestAPI = async (params) => {
    const [token, data] = params;
    
    const response = await api.post("/connections/reject", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
}

export const removeRequestOrConnectionAPI = async (params) => {
    const [token, data] = params;
    
    const response = await api.post("/connections/remove-connection", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
}
