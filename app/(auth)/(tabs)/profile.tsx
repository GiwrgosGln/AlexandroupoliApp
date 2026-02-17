import { Colors } from "@/constants/colors";
import { useUser } from "@/features/users/api/get-user";
import { useAuth, useClerk } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Button, Card, Separator, Switch } from "heroui-native";
import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { data: user } = useUser({ userId: useAuth().userId! });
  const { signOut } = useClerk();
  const router = useRouter();
  const [isPushNotificationEnabled, setPushNotificationEnabled] =
    useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/sign-in");
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="px-6 mb-6">
          <View className="items-center mb-3.5 mt-2">
            <View className="mb-2 relative">
              <View className="w-[92px] h-[92px] rounded-full items-center justify-center overflow-hidden">
                {user?.image_url ? (
                  <Image
                    source={{ uri: user.image_url }}
                    style={{ width: "100%", height: "100%" }}
                    contentFit="cover"
                  />
                ) : (
                  <View
                    className="w-full h-full items-center justify-center"
                    style={{ backgroundColor: Colors.primary }}
                  >
                    <Text
                      className="text-[32px] font-bold"
                      style={{ color: Colors.background.primary }}
                    >
                      {user?.username?.charAt(0) || "U"}
                    </Text>
                  </View>
                )}
              </View>

              <View
                className="absolute -right-px bottom-1 w-[22px] h-[22px] rounded-full items-center justify-center border-2"
                style={{
                  backgroundColor: Colors.primary,
                  borderColor: Colors.background.primary,
                }}
              >
                <Ionicons
                  name="camera"
                  size={14}
                  color={Colors.background.primary}
                />
              </View>
            </View>

            <Text
              className="text-[28px] font-semibold leading-[34px]"
              style={{ color: Colors.text.primary }}
            >
              {user?.username}
            </Text>

            <Text
              className="mt-1 text-[13px]"
              style={{ color: Colors.text.secondary }}
            >
              {user?.email}
            </Text>
          </View>

          <Text
            className="text-[11px] font-bold tracking-[0.8px] mb-2 mt-1"
            style={{ color: Colors.text.secondary }}
          >
            SETTINGS
          </Text>

          <Card className="mb-4 rounded-[10px] p-0">
            <Card.Body
              className="p-0"
              style={{ backgroundColor: Colors.background.primary }}
            >
              <TouchableOpacity
                className="flex-row items-center justify-between h-[62px] px-3"
                onPress={() => router.push("/(auth)/account")}
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
                    Account
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
                className="flex-row items-center justify-between h-[62px] px-3"
                onPress={() => Alert.alert("Saved Places", "Coming soon")}
              >
                <View className="flex-row items-center">
                  <Ionicons
                    name="bookmark"
                    size={18}
                    color={Colors.text.secondary}
                  />
                  <Text
                    className="text-[17px] ml-2.5"
                    style={{ color: Colors.text.primary }}
                  >
                    Saved Places
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

              <View className="flex-row items-center justify-between h-[62px] px-3">
                <View className="flex-row items-center">
                  <Ionicons
                    name="notifications"
                    size={18}
                    color={Colors.text.secondary}
                  />
                  <Text
                    className="text-[17px] ml-2.5"
                    style={{ color: Colors.text.primary }}
                  >
                    Push Notifications
                  </Text>
                </View>

                <View className="w-[84px] items-end justify-center">
                  <Switch
                    isSelected={isPushNotificationEnabled}
                    onSelectedChange={setPushNotificationEnabled}
                  />
                </View>
              </View>

              <Separator />

              <TouchableOpacity
                className="flex-row items-center justify-between h-[62px] px-3"
                onPress={() => router.push("/(auth)/language-selection")}
              >
                <View className="flex-row items-center">
                  <Ionicons
                    name="language"
                    size={18}
                    color={Colors.text.secondary}
                  />
                  <Text
                    className="text-[17px] ml-2.5"
                    style={{ color: Colors.text.primary }}
                  >
                    Language
                  </Text>
                </View>

                <View className="w-[84px] items-end justify-center flex-row gap-1 items-center">
                  <Text
                    className="text-[15px] text-right"
                    style={{ color: Colors.text.secondary }}
                  >
                    English
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={Colors.text.secondary}
                  />
                </View>
              </TouchableOpacity>
            </Card.Body>
          </Card>

          <Text
            className="text-[11px] font-bold tracking-[0.8px] mb-2 mt-1"
            style={{ color: Colors.text.secondary }}
          >
            SUPPORT
          </Text>

          <Card className="mb-4 rounded-[10px] p-0">
            <Card.Body
              className="p-0"
              style={{ backgroundColor: Colors.background.primary }}
            >
              <TouchableOpacity
                className="flex-row items-center justify-between h-[62px] px-3"
                onPress={() =>
                  Alert.alert("Help", "Help functionality coming soon")
                }
              >
                <View className="flex-row items-center">
                  <Ionicons
                    name="help-circle"
                    size={18}
                    color={Colors.text.secondary}
                  />
                  <Text
                    className="text-[17px] ml-2.5"
                    style={{ color: Colors.text.primary }}
                  >
                    Help Center
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
                className="flex-row items-center justify-between h-[62px] px-3"
                onPress={() =>
                  Alert.alert("Rate", "Rating functionality coming soon")
                }
              >
                <View className="flex-row items-center">
                  <Ionicons
                    name="thumbs-up"
                    size={18}
                    color={Colors.text.secondary}
                  />
                  <Text
                    className="text-[17px] ml-2.5"
                    style={{ color: Colors.text.primary }}
                  >
                    Rate the App
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

          <Button onPress={handleSignOut} variant="danger">
            Log Out
          </Button>

          <Text
            className="mt-3 text-center text-[12px]"
            style={{ color: Colors.text.secondary }}
          >
            MyAXD v1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
