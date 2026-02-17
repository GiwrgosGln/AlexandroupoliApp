import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Card, Separator } from "heroui-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountScreen() {
  const navigate = useRouter();

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
            ACCOUNT SETTINGS
          </Text>

          <Card className="mb-4 rounded-[10px] p-0">
            <Card.Body
              className="p-0"
              style={{ backgroundColor: Colors.background.primary }}
            >
              <TouchableOpacity
                onPress={() => navigate.push("/(auth)/change-username")}
                className="flex-row items-center justify-between h-[62px] px-3"
              >
                <View className="flex-row items-center">
                  <Ionicons
                    name="person"
                    size={18}
                    color={Colors.text.secondary}
                  />
                  <Text
                    className="text-[17px] ml-2.5"
                    style={{ color: Colors.text.primary }}
                  >
                    Change Username
                  </Text>
                </View>

                <View className="w-[84px] items-end justify-center">
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={Colors.text.secondary}
                  />
                </View>
              </TouchableOpacity>

              <Separator />

              <TouchableOpacity
                onPress={() => navigate.push("/(auth)/change-password")}
                className="flex-row items-center justify-between h-[62px] px-3"
              >
                <View className="flex-row items-center">
                  <Ionicons
                    name="lock-closed"
                    size={18}
                    color={Colors.text.secondary}
                  />
                  <Text
                    className="text-[17px] ml-2.5"
                    style={{ color: Colors.text.primary }}
                  >
                    Change Password
                  </Text>
                </View>

                <View className="w-[84px] items-end justify-center">
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={Colors.text.secondary}
                  />
                </View>
              </TouchableOpacity>
            </Card.Body>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
