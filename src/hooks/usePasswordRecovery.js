import axios from "axios";
import { api_url } from "../constants/constants";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";

const sendEmail = async (dataToSend) => {
  try {
    const res = await axios.post(`${api_url}/password/forgot`, dataToSend);
    return res?.data;
  } catch (error) {
    throw new Error(error.message)
  }
};

export const usePasswordRecovery = () => {
    const {mutate, isError, error, isSuccess, isLoading, status} = useMutation({
        mutationFn: sendEmail,
        onError: (error) => {
            throw new Error(error.message)
          },
          onSuccess: () => {
          },
    })
  return {mutate, isError, error, isSuccess, isLoading, status}
};
