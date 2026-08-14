import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

export const getRooms = async () => {
    const response = await api.get("/Rooms");
    return response.data;
};

export const getRoom = async (id) => {
    const response = await api.get(`/rooms/${id}`);
    return response.data;
};

export const createReservation = async (reservation) => {
    const response = await api.post("/reservations", reservation);
    return response.data;
};

export const getReservations = async () => {
    const response = await api.get("/reservations");
    return response.data;
};

export const deleteReservation = async (id) => {
    await api.delete(`/reservations/${id}`);
};

export default api;