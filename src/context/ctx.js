import React, { useEffect, useState } from "react";
import { useStorageState } from "../hooks/useAsyncState";
import axios from "axios";
import { api_url } from "../constants/constants";
import { jwtDecode } from "jwt-decode";

// Define the shape of the context's value
const AuthContext = React.createContext({
  signIn: async (email, password) => null,
  signOut: async () => null,
  session: null,
  isLoading: false,
  error: null,
  setError: () => {},
  refreshAccessToken: async () => null,
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

  useEffect(() => {
    const checkTokenExpiration = async () => {
      if (session && refreshToken) {
        const { exp } = jwtDecode(session);
        const expirationTime = exp * 1000;
        console.log(expirationTime);
        const currentTime = new Date().getTime();
        console.log(currentTime);
        if (expirationTime - currentTime < 5 * 60 * 1000) {
          console.log(true);
          await refreshAccessToken();
        }
      }
    };
    const intervalId = setInterval(checkTokenExpiration, 60 * 1000);
    return () => clearInterval(intervalId);
  }, [session, refreshToken]);

  const refreshAccessToken = async () => {
    try {
      console.log("token:", session);
      console.log("refresh:", refreshToken[1]);
      const response = await axios.post(`${api_url}/users/newtoken`, {
        expiredAccessToken: session,
        refreshToken: refreshToken[1],
      });
      setSession(response?.data?.newAccessToken);
      setRefreshToken(response?.data?.newRefreshToken);
      setError(null);
    } catch (error) {
      setError(error.message);
      signOut();
    }
  };

  const signIn = async (email, password) => {
    try {
      const response = await axios.post(`${api_url}/users/login`, {
        email,
        password,
      });
      console.log(response);
      setSession(response?.data?.accessToken);
      setRefreshToken(response?.data?.refreshToken);
      setError(null);
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 400) {
          setError("Verifique suas credenciais!");
        } else {
          setError("Erro inesperado, tente novamente.");
        }
      } else {
        setError("Erro inesperado, tente novamente.");
      }
    }
  };

  const signOut = () => {
    setSession(null);
    setRefreshToken(null);
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
