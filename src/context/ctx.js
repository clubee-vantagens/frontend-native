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

  useEffect(() => {
    const checkTokenExpiration = async () => {
      if (session && refreshToken) {
        const { exp } = jwtDecode(session);
        const expirationTime = exp * 1000;
        const currentTime = new Date().getTime();
        if (expirationTime - currentTime < 5 * 60 * 1000) {
          await refreshAccessToken();
        }
      }
    };
    const intervalId = setInterval(checkTokenExpiration, 60 * 1000);
    return () => clearInterval(intervalId);
  }, [session, refreshToken]);

  const refreshAccessToken = async () => {
    try {
      const response = await apiService.refreshToken(expiredAccessToken, refreshToken)
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
      const response = await apiService.login(email, password);
      setSession(response?.data?.accessToken);
      setRefreshToken(response?.data?.refreshToken);
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