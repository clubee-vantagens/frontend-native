import React, { useEffect, useState } from 'react';
import { useStorageState } from '../hooks/useAsyncState';
import axios from 'axios';

// Define the shape of the context's value
const AuthContext = React.createContext({
  signIn: async (email, password) => null,
  signOut: async () => null,
  session: null,
  isLoading: false,
  error: null,
  setError: () => {},
  refreshAccessToken: async () => null
});

// Custom hook to use the AuthContext
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }
  return value;
}

// SessionProvider component to provide authentication context
export function SessionProvider(props) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [refreshToken, setRefreshToken] = useStorageState('refreshToken')
  const [error, setError] = useState(null)

  useEffect(() => {
    const checkTokenExpiration = async () => {
      if (session && refreshToken) {
        const {exp} = JSON.parse(atob(session.split('.')[1]))
        const expirationTime = exp * 1000
        console.log(expirationTime)
        const currentTime = new Date().getTime()
        console.log(currentTime);
        if (expirationTime - currentTime < 5 * 60 * 1000) {
          console.log(true)
          await refreshAccessToken()
        }
      }
    }
    const intervalId = setInterval(checkTokenExpiration, 60 * 1000)
    return () => clearInterval(intervalId)
  }, [session, refreshToken])

  const refreshAccessToken = async () => {
    try {
      console.log('token:',session);
      console.log('refresh:', refreshToken[1]);
      const response = await axios.post('http://localhost:8080/api/users/newtoken', {
        expiredAccessToken: session, 
        refreshToken: refreshToken[1]
      })
      setSession(response.data.newAccessToken)
      setRefreshToken(response.data.newRefreshToken)
      setError(null)
    } catch (error) {
      console.log(error);
      setError(error.response?.data)
      signOut()
    }
  }

  const signIn = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8080/api/users/login", {
        email,
        password,
      });
      setSession(response.data.accessToken);
      setRefreshToken(response?.data.refreshToken)
      setError(null)
    } catch (error) {
      setError(error.response.data || "Erro inesperado, tente novamente.")
    }
  };
 const signOut = () => {
    setSession(null)
    setRefreshToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading,
        error,
        setError,
        refreshAccessToken
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
