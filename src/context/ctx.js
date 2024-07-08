import React, { useState } from 'react';
import { useStorageState } from '../hooks/useAsyncState';
import axios from 'axios';

// Define the shape of the context's value
const AuthContext = React.createContext({
  signIn: async (email, password) => null,
  signOut: async () => null,
  session: null,
  isLoading: false,
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
  const [error, setError] = useState(null)

  const signIn = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8080/api/users/login", {
        email,
        password,
      });
      setSession(response.data.tokenSession);
      setError(null)
    } catch (error) {
      setError(error.response.data || "Erro inesperado, tente novamente.")
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
        error,
        setError
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
