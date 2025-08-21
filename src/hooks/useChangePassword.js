import axios from "axios";
import { api_url } from "../constants/constants";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "../context/ctx";

const changePassword = async ({ newPassword, token }) => {
  try {
    console.log("Iniciando a mudança de senha com:", { newPassword, token });
    const res = await axios.post(`${api_url}/passwords/forgot`, {
      token,
      newPassword,
    });

    console.log("Resposta do servidor:", res);
    return res?.data;
  } catch (error) {
    console.error("Erro ao tentar alterar a senha:", error.response || error);
    throw new Error(error.response?.data?.message || "Erro ao alterar senha");
  }
};

export const useChangePassword = () => {
  const { session } = useSession();
  const { mutate, isError, error, isSuccess, isLoading } = useMutation({
    mutationFn: (data) => changePassword(data),
    onError: (error) => {
      console.error("Erro no onError da mutação:", error.message);
    },
    onSuccess: () => {
      console.log("Senha alterada com sucesso!");
    },
  });

  return { mutate, isError, error, isSuccess, isLoading };
};
