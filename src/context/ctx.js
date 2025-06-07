import React, { useEffect, useState } from "react";
import { useStorageState } from "../hooks/useAsyncState";
  import { jwtDecode } from "jwt-decode";
import apiService from "../services/apiService";


// Define the shape of the context's value
const AuthContext = React.createContext({
  signIn: (email, password) => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  error: null,
  setError: () => {},
  refreshAccessToken: () => null,
});

// Custom hook to use the AuthContext
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }
  return value;
}

// SessionProvider component to provide authentication context
export function SessionProvider(props) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [refreshToken, setRefreshToken] = useStorageState("refreshToken");
  const [error, setError] = useState(null);

  // Isso deve ser deletado após implementação do token refresh, está aqui apenas para evitar deslogar do aplicativo em fase de desenvolvimento
  const [credentials, setCredentials] = useStorageState("credentials");

  useEffect(() => {
    const checkTokenExpiration = async () => {
      if (session && refreshToken) {
        const { exp } = jwtDecode(session);
        const expirationTime = exp * 1000;
        const currentTime = new Date().getTime();
        if (expirationTime - currentTime < 14 * 60 * 1000) {
          // Isso deve ser deletado após implementação do token refresh, está aqui apenas para evitar deslogar do aplicativo em fase de desenvolvimento
          await evitarDeslogamento();
          
          //await refreshAccessToken();
        }
      }
    };
    const intervalId = setInterval(checkTokenExpiration, 60 * 1000);
    return () => clearInterval(intervalId);
  }, [session, refreshToken]);

  const refreshAccessToken = async () => {
    const token = Array.isArray(refreshToken) ? refreshToken[1] : refreshToken;
    try {
      const response = await apiService.refreshToken(token);
      setSession(response?.data?.accessToken);
      setRefreshToken(response?.data?.refreshToken);
      setError(null);
    } catch (error) {
      setError(error.message);
      signOut();
    }
  };

   const signIn = async (email, password) => {
    try {
      const response = await apiService.login(email, password);
      setSession(response?.data?.accessToken);
      setRefreshToken(response?.data?.refreshToken);

      // Isso deve ser deletado após implementação do token refresh, está aqui apenas para evitar deslogar do aplicativo em fase de desenvolvimento
      setCredentials({ email, password });

      setError(null);
    } catch (err) {
      if (err.response) {
        setError(err.response)
      } else {
        setError("Erro inesperado, tente novamente.")
      }
    }
  };

  const signOut = () => {
    setSession(null);
    setRefreshToken(null);

    // Isso deve ser deletado após implementação do token refresh, está aqui apenas para evitar deslogar do aplicativo em fase de desenvolvimento
    setCredentials(null);
  };

  // Isso deve ser deletado após implementação do token refresh, está aqui apenas para evitar deslogar do aplicativo em fase de desenvolvimento
  const evitarDeslogamento = async () => {
    if (credentials?.email && credentials?.password) {
      try {
        const loginResponse = await apiService.login(
          credentials.email,
          credentials.password
        );
        setSession(loginResponse?.data?.accessToken);
        setRefreshToken(loginResponse?.data?.refreshToken);
        setError(null);
        return true;
      } catch (loginError) {
        setError("Não foi possível renovar o token nem fazer login.");
        return false;
      }
    } else {
      setError("Refresh token inválido e sem credenciais para tentar login.");
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading,
        error,
        setError,
        refreshAccessToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
