import { useUser } from "@/features/users/api/get-user";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function AuthLayout() {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const { data: user, isLoading: isUserLoading } = useUser({ userId: userId! });

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn && !isUserLoading) {
        SplashScreen.hideAsync();
      } else if (!isSignedIn) {
        SplashScreen.hideAsync();
      }
    }
  }, [isLoaded, isSignedIn, isUserLoading]);

  // Show nothing while loading
  if (!isLoaded || (isSignedIn && isUserLoading)) {
    return null;
  }

  // Redirect if not signed in
  if (!isSignedIn) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Profile Screens */}
      <Stack.Screen name="account" options={{ headerShown: false }} />
      <Stack.Screen
        name="language-selection"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="change-password" options={{ headerShown: false }} />
      <Stack.Screen name="change-username" options={{ headerShown: false }} />
    </Stack>
  );
}
