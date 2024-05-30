import { Stack } from "expo-router";
import {Query, QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
  <QueryClientProvider client={queryClient}>
    <Stack> 
      <Stack.Screen name="index" />
      <Stack.Screen options={{headerShown: false}} name="signupUser" />
    </Stack>
  </QueryClientProvider>
  );
}
