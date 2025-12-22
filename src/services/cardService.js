import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getMyCards = async (token) => {
  const res = await axios.get(`${API_URL}/cards/my-cards`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.data;
};
