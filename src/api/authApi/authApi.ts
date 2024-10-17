import userAxios from "@/lib/axios/axios";
import axios from "axios";

export const loginApi = async (data : {} ) => {
  const response = await userAxios.post("/login", data);
  if (response?.data?.token) {
    localStorage.setItem("userToken", response?.data?.token);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response?.data?.token}`;
  }
  return { message: response?.data?.message, data: response?.data?.user };
};
