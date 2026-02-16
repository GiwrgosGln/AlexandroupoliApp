import { Colors } from "@/constants/colors";
import { useUser } from "@clerk/clerk-expo";
import { useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChangePasswordScreen() {
  const { user } = useUser();

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const updatePassword = async () => {
    try {
      await user?.updatePassword({
        currentPassword: currentPassword,
        newPassword: newPassword,
      });
      alert("Password updated!");
    } catch (err) {
      console.error("Error updating password:", err);
      alert(`${err instanceof Error ? err.message : String(err)}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Current Password"
        secureTextEntry
        onChangeText={setCurrentPassword}
      />
      <TextInput
        placeholder="New Password"
        secureTextEntry
        onChangeText={setNewPassword}
      />
      <Button title="Update Password" onPress={updatePassword} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
});
