import { useUpdateUser } from "@/features/users/api/update-user";
import { useAuth } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LanguageSelectionScreen() {
  const { t, i18n } = useTranslation();
  const { userId } = useAuth();
  const router = useRouter();

  const updateMutation = useUpdateUser();

  // Function to handle language change
  const changeLanguage = async (lang: "en" | "el") => {
    try {
      // Update the UI language
      await i18n.changeLanguage(lang);

      // Save preference to AsyncStorage
      await AsyncStorage.setItem("user-language", lang);

      // Update user's language preference on the database
      updateMutation.mutate({
        userId: userId!,
        data: { language: lang },
      });

      router.back();
    } catch (error) {
      console.error("Failed to change language", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* English Button */}
      <TouchableOpacity
        style={[styles.button, i18n.language === "en" && styles.activeButton]}
        onPress={() => changeLanguage("en")}
      >
        <Text
          style={[styles.text, i18n.language === "en" && styles.activeText]}
        >
          {t("profile.english")}
        </Text>
      </TouchableOpacity>

      {/* Greek Button */}
      <TouchableOpacity
        style={[styles.button, i18n.language === "el" && styles.activeButton]}
        onPress={() => changeLanguage("el")}
      >
        <Text
          style={[styles.text, i18n.language === "el" && styles.activeText]}
        >
          {t("profile.greek")}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "transparent",
    alignItems: "center",
  },
  activeButton: {
    borderColor: "#007AFF",
    backgroundColor: "#007AFF",
  },
  text: {
    fontSize: 16,
    color: "#007AFF",
  },
  activeText: {
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
