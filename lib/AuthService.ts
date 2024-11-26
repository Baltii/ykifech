import axios from "axios";

const API_URL = "http://192.168.1.161:3000"; // Replace with your actual local IP and port

const AuthService = {
  signin: async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/signin`,
        { email, password },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: Error | any) {
      throw error.response
        ? error.response.data
        : new Error("An error occurred during signin");
    }
  },

  signup: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        email,
        password,
      });
      return response.data;
    } catch (error: Error | any) {
      throw error.response
        ? error.response.data
        : new Error("An error occurred during signup");
    }
  },

  forgotPassword: async (email: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/forgotPassword`, {
        email,
      });
      return response.data;
    } catch (error: Error | any) {
      throw error.response
        ? error.response.data
        : new Error("An error occurred while sending reset instructions");
    }
  },

  resetPassword: async (token: string, password: string) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/resetPassword/${token}`,
        {
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: Error | any) {
      throw error.response
        ? error.response.data
        : new Error("An error occurred while resetting password");
    }
  },
};

export default AuthService;
