import axios from "axios";

const API_URL = "http://localhost:5000/api/notifications"; // ton backend

// Récupérer toutes les notifications de l'utilisateur
export const getNotifications = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// Marquer une notification comme lue
export const markAsRead = async (id, token) => {
  const res = await axios.patch(`${API_URL}/${id}/read`, null, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
