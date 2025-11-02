import axios from "axios";

const { VITE_API_URL: url } = import.meta.env;

export const signIn = async (credentials) => {
  const res = await axios.post(`${url}/auth/login`, credentials, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
};

export const signUp = async (user) => {
  const res = await axios.post(`${url}/auth/register`, user, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
};
