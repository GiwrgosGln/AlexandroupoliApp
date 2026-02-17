import i18n from "@/i18n";
import { queryClient } from "@/lib/react-query";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { HeroUINativeProvider } from "heroui-native";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Uniwind } from "uniwind";
import "../global.css";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

export default function RootLayout() {
  useEffect(() => {
    const loadLanguage = async () => {
      const language = await AsyncStorage.getItem("user-language");
      if (language) {
        i18n.changeLanguage(language);
      }
    };

    Uniwind.setTheme("light");

    loadLanguage();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroUINativeProvider>
        <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
          <QueryClientProvider client={queryClient}>
            <Stack>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(public)" options={{ headerShown: false }} />
            </Stack>
          </QueryClientProvider>
        </ClerkProvider>
      </HeroUINativeProvider>
    </GestureHandlerRootView>
  );
}
