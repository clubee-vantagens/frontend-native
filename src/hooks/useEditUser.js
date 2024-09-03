import { useMutation } from "@tanstack/react-query";
import { api_url } from "../constants/constants";
import axios from "axios";

const editUser = async (userData, session) => {
  console.log(session);
  console.log(userData);

  try {
    const res = await axios.put(`${api_url}/users/client`, userData, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
    console.log("resposta do edit", res.data);

    return res?.data;
  } catch (error) {
    console.error("Error response:", error.response);
    throw error?.response?.data || error;
  }
};

export function useEditUser() {
  const mutation = useMutation({
    mutationFn: ({ userData, session }) => editUser(userData, session),
    onError: (error) => {
      console.error("Edit mutation error:", error);
    },
    onSettled: (data, error) => {
      if (data) {
        console.log("User edited successfully:", data);
      }
      if (error) {
        console.error("Edit mutation failed:", error);
      }
    },
  });

  const { mutate, isError, error, isSuccess, status } = mutation;

  return { mutate, isError, error, isSuccess, status };
}
