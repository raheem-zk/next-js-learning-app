import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// Use the correct way to access environment variables in Next.js
const baseBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || ''; // Ensure it's a string

const userPath: string = ""; // Define userPath appropriately

// Create a function to configure the Axios instance
const createRoleSpecificAxiosInstance = (tokenName: string, rolePath: string): AxiosInstance => {
  const instance: AxiosInstance = axios.create({
    baseURL: `${baseBackendUrl}${rolePath}`,
    timeout: 15000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptor to add the token
  instance.interceptors.request.use((request: AxiosRequestConfig) => {
    const token: string | null = localStorage.getItem(tokenName);
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  });

  // Response interceptor for error handling
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      const { response } = error;

      // Handle specific error cases
      if (response) {
        if (
          (response.status === 401 && response.data.message === "Unauthorized") ||
          response.data.message === "Not authorized, Invalid token" ||
          response.data.message === "Access Denied: Your account has been temporarily blocked"
        ) {
          localStorage.removeItem(tokenName);
          window.location.assign("/logout");
        } else if (response.status === 500) {
          console.error("Internal Server Error:", response.data);
        }
      }
      return Promise.reject(response?.data || error);
    }
  );

  return instance;
};

// Create an Axios instance for user
const userAxios = createRoleSpecificAxiosInstance("userToken", userPath);

export default userAxios;
