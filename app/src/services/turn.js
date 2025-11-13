import axios from "axios";

const { VITE_API_URL: url } = import.meta.env;

export const getTurns = async (date) => {
  const res = await axios.get(`${url}/turnos/`, {
    withCredentials: true,
  });

  return res.data;
};

export const getTurnByDay = async (date) => {
  const res = await axios.get(`${url}/turnos/${date}`, {
    withCredentials: true,
  });

  return res.data;
};
