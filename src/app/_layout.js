import { Slot, useRouter } from "expo-router";
import { SessionProvider, useSession } from "../context/ctx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

const queryClient = new QueryClient();

// Este componente é o layout principal da aplicação
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PoppinsReg: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  const { session, isLoading: sessionIsLoading } = useSession();
  const router = useRouter();

  // Decide para onde navegar com base no estado da sessão
  useEffect(() => {
    if (!fontsLoaded || sessionIsLoading) {
        return; // Retorna e espera o carregamento
    }

    if (session) {
      router.replace("/(tabs)/menu");
    } else {
      router.replace("/authentication/onboardingscreen");
    }
  }, [session, fontsLoaded, sessionIsLoading]);

  // Aguarda o carregamento das fontes e da sessão
  if (!fontsLoaded || sessionIsLoading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <Slot />
        </SessionProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}