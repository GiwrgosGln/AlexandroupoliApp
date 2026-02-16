import { useRouter } from "expo-router";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountScreen() {
  const navigate = useRouter();
  return (
    <SafeAreaView>
      <Button
        title="Change Password"
        onPress={() => navigate.push("/(auth)/change-password")}
      />
      <Button
        title="Change Username"
        onPress={() => navigate.push("/(auth)/change-username")}
      />
    </SafeAreaView>
  );
}
