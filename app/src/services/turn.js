import axios from "axios";
import { da } from "zod/v4/locales";

const { VITE_API_URL: url } = import.meta.env;

export const getTurns = async (date) => {
  const res = await axios.get(`${url}/turnos/`, {
    withCredentials: true,
  });

  return res.data;
};

export const getTurnByDay = async (dateTime) => {
  console.log(dateTime);
  const res = await axios.get(`${url}/turnos/porDia`, {
    withCredentials: true,
    params: { dateTime },
  });

  return res.data;
};
