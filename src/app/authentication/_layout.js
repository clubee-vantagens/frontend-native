// src/app/authentication/_layout.js
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function AuthenticationLayout() {
  return (
    <>
      {/* Coloque a StatusBar fora do Stack */}
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: {
            backgroundColor: 'rgba(247, 247, 247, 1)',
          },
        }}
      >
        <Stack.Screen name="signin" options={{ title: 'Entrar' }} />
        <Stack.Screen name="signupuser" options={{ title: 'Cadastre-se' }} />
        <Stack.Screen name="passwordrecovery" options={{ title: 'Recuperar Senha' }} />
        <Stack.Screen name="confirmationemail" options={{ title: 'Confirmação de E-mail' }} />
        <Stack.Screen name="onboardingscreen" options={{ title: 'Boas-vindas' }} />
        <Stack.Screen name="preferences" options={{ title: 'Preferências' }} />
        <Stack.Screen name="termsandconditions" options={{ title: 'Termos e Condições' }} />
      </Stack>
    </>
  );
}