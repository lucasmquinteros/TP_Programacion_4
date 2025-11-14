import axios from "axios";
import { da } from "zod/v4/locales";

const { VITE_API_URL: url } = import.meta.env;

export const getTurns = async (date) => {
  const res = await axios.get(`${url}/turnos/`, {
    withCredentials: true,
  });

  return res.data;
};

export const getTurnByDay = async (dateString) => {
  console.log(dateString);
  const res = await axios.get(`${url}/turnos/disponibilidad`, {
    withCredentials: true,
    params: {
      fecha: dateString,
    },
  });

  return res.data;
};
