import { useMutation } from "@tanstack/react-query";
import { api_url } from "../constants/constants";
import axios from "axios";

// Function to handle deleting a user
const deleteUser = async (session) => {
  try {
    // Perform the delete request
    const res = await axios.delete(`${api_url}/users/client`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });

    // Log the response for debugging
    console.log("Response from delete:", res);

    // Return the response data
    return res?.data;
  } catch (error) {
    // Handle errors
    const errorMessage = error?.response?.data || "Unknown error occurred";
    console.error("Error response:", errorMessage);
    throw errorMessage;
  }
};

// Custom hook to use the delete user mutation
export function useDeleteUser() {
  const mutation = useMutation({
    // Mutation function for deleting user data
    mutationFn: ( session ) => deleteUser(session),
    // Error callback for mutation failure
    onError: (error) => {
      console.error("Delete mutation error:", error);
    },
    // Settled callback for when the mutation finishes
    onSettled: (data, error) => {
      if (data) {
        console.log("User deleted successfully:", data);
      }
      if (error) {
        console.error("Delete mutation failed:", error);
      }
    },
  });

  // Destructure useful values from the mutation result
  const { mutate, isError, error, isSuccess, status } = mutation;

  // Return these values for use in components
  return { mutate, isError, error, isSuccess, status };
}