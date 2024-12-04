import { Redirect } from "expo-router";
import { useSession } from "../../context/ctx";
import LoadingScreen from "../../components/LoadingScreen";
import { Stack } from "expo-router";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/onboardingScreen" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />

      <Stack.Screen name="helpCenter" />
      <Stack.Screen name="faq" />
      <Stack.Screen name="editProfile" />
      <Stack.Screen name="categories" />
      <Stack.Screen name="referalPage" />
    </Stack>
  );
}
