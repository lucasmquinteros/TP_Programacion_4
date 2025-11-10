import axios from "axios";
import { useAuthStore } from "../store/auth-store";

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

export const checkAuth = async () => {
  try {
    const res = await axios.get(`${url}/auth/health`, {
      withCredentials: true,
    });
    return true;
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      return false;
    }
    return true;
  }
};

export const signOut = async () => {
  await axios.post(`${url}/auth/logout`, {
    withCredentials: true,
  });
};
