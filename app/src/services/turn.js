import axios from "axios";
import { useAuthStore } from "../store/auth-store";

const { VITE_API_URL: url } = import.meta.env;

export const getTurnByDay = async (date) => {
  const res = await axios.get(`${url}/turnos/${date}`, {
    withCredentials: true,
  });

  return res.data;
};
