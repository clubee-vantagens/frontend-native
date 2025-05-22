// hooks/useUserService.js
import { useQuery, useMutation } from "@tanstack/react-query";
import apiService from "../services/apiService";

// Get User Data
const fetchUsers = async ({ queryKey }) => {
  const session = queryKey[1];
  const response = await apiService.userGetData(session);
  return response.data;
};

export function useUserData(session, isPolling) {
  return useQuery({
    queryKey: ["users", session],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 2,
    enabled: !!session,
    refetchInterval: isPolling ? 2000 : false,
  });
}

// Register User
const registerUser = async (userData) => {
  const response = await apiService.userRegister(userData);
  return response.data;
};

export function useRegisterUser() {
  return useMutation({
    mutationFn: registerUser,
    onError: (error) => {
      console.error("Register error:", error.response?.data || error.message);
    },
    onSettled: (data, error) => {
      if (data) console.log("User registered:", data);
      if (error) console.error("Registration failed:", error);
    },
  });
}

// Edit User
const editUser = async ({ userData, session }) => {
  const response = await apiService.userEditData(userData, session);
  return response.data;
};

export function useEditUser() {
  return useMutation({
    mutationFn: editUser,
    onError: (error) => {
      console.error("Edit error:", error.response?.data || error.message);
    },
    onSettled: (data, error) => {
      if (data) console.log("User edited:", data);
      if (error) console.error("Edit failed:", error);
    },
  });
}

// Delete User
const deleteUser = async (session) => {
  const response = await apiService.userDeleteData(session);
  return response.data;
};

export function useDeleteUser() {
  return useMutation({
    mutationFn: deleteUser,
    onError: (error) => {
      console.error("Delete error:", error.response?.data || error.message);
    },
    onSettled: (data, error) => {
      if (data) console.log("User deleted:", data);
      if (error) console.error("Delete failed:", error);
    },
  });
}
