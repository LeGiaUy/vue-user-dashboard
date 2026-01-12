import axios from "axios";
import type { UserResponse } from "@/types/user.type";

// base axios
const api = axios.create({
  baseURL: "https://dummyjson.com",
});

// gọi api lấy danh sách user
export const getUsers = (params: { limit: number; skip: number }) => {
  return api.get<UserResponse>("/users", {
    params, // payload query params
  });
};

// lấy chi tiết user
export const getUserById = (id: number) => {
  return api.get(`/users/${id}`);
};
