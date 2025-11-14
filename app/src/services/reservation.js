import axios from "axios";

const { VITE_API_URL: url } = import.meta.env;

export const getReservationsToday = async () => {
  const res = await axios.get(`${url}/reservas/today`, {
    withCredentials: true,
  });

  return res.data;
};

export const getReservationsByDay = async (date) => {
  const res = await axios.get(`${url}/reservas/byday`, {
    withCredentials: true,
    params: { date },
  });

  return res.data;
};

export const getReservationById = async (userId) => {
  const res = await axios.get(`${url}/reservas/userRes`, {
    withCredentials: true,
    params: { userId },
  });

  return res.data;
};

export const createReservation = async (reserva) => {
  console.log(reserva);

  const res = await axios.post(`${url}/reservas/create`, reserva, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
};
