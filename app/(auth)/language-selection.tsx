import { Colors } from "@/constants/colors";
import { useUpdateUser } from "@/features/users/api/update-user";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Asset } from "expo-asset";
import { useRouter } from "expo-router";
import { Card, Separator } from "heroui-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgUri } from "react-native-svg";

const GB_FLAG_URI = Asset.fromModule(require("../../assets/images/gb.svg")).uri;
const GR_FLAG_URI = Asset.fromModule(require("../../assets/images/gr.svg")).uri;

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
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: Colors.background.secondary }}
    >
      <ScrollView>
        <View className="px-6 pb-6">
          <Text
            className="text-[11px] font-bold tracking-[0.8px] mb-2 mt-1"
            style={{ color: Colors.text.secondary }}
          >
            LANGUAGE SETTINGS
          </Text>

          <Card className="mb-4 rounded-[10px] p-0">
            <Card.Body
              className="p-0"
              style={{ backgroundColor: Colors.background.primary }}
            >
              <TouchableOpacity
                onPress={() => changeLanguage("en")}
                className="flex-row items-center justify-between h-[62px] px-3"
              >
                <View className="flex-row items-center">
                  <SvgUri width={24} height={18} uri={GB_FLAG_URI} />
                  <Text
                    className="text-[17px] ml-2.5"
                    style={{ color: Colors.text.primary }}
                  >
                    {t("profile.english")}
                  </Text>
                </View>

                <View className="w-[84px] items-end justify-center">
                  {i18n.language === "en" && (
                    <Ionicons
                      name="checkmark"
                      size={20}
                      color={Colors.primary}
                    />
                  )}
                </View>
              </TouchableOpacity>

              <Separator />

              <TouchableOpacity
                onPress={() => changeLanguage("el")}
                className="flex-row items-center justify-between h-[62px] px-3"
              >
                <View className="flex-row items-center">
                  <SvgUri width={24} height={18} uri={GR_FLAG_URI} />
                  <Text
                    className="text-[17px] ml-2.5"
                    style={{ color: Colors.text.primary }}
                  >
                    {t("profile.greek")}
                  </Text>
                </View>

                <View className="w-[84px] items-end justify-center">
                  {i18n.language === "el" && (
                    <Ionicons
                      name="checkmark"
                      size={20}
                      color={Colors.primary}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </Card.Body>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
