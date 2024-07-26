import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useCallback, useReducer } from 'react';
import { Platform } from 'react-native';

// Custom hook to manage async state
function useAsyncState(initialValue = [true, null]) {
  return useReducer(
    (state, action) => [false, action],
    initialValue
  );
}

// Function to set storage item based on platform
async function setStorageItemAsync(key, value) {
  if (Platform.OS === 'web') {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

// Custom hook to manage storage state
function useStorageState(key) {
  const [state, setState] = useAsyncState();

  // Get initial value on mount
  useEffect(() => {
    console.log('useEffect triggered');
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          setState(localStorage.getItem(key));
        }
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
    } else {
      SecureStore.getItemAsync(key).then(value => {
        setState(value);
      });
    }
  }, [key]);

  // Set value and update storage
  const setValue = useCallback(
    (value) => {
        console.log('useCallback triggered');
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}

export { useStorageState };
