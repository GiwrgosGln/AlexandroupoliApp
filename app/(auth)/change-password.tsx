import { useUser } from "@clerk/clerk-expo";
import { Button, Description, Input, Label, TextField } from "heroui-native";
import { useState } from "react";
import { View } from "react-native";
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
    <SafeAreaView className="flex-1 flex-col justify-between">
      <View className="flex-col gap-4 px-4">
        <TextField>
          <Label>Current Password</Label>
          <Input
            placeholder="Enter your current password"
            secureTextEntry
            onChangeText={setCurrentPassword}
          />
          <Description>
            Enter your current password to confirm your identity.
          </Description>
        </TextField>
        <TextField>
          <Label>New Password</Label>
          <Input
            placeholder="Enter your new password"
            secureTextEntry
            onChangeText={setNewPassword}
          />
          <Description>
            Your new password must be at least 8 characters long and contain a
            mix of letters and numbers.
          </Description>
        </TextField>
      </View>
      <Button onPress={updatePassword} className="mt-10 mx-4">
        Update Password
      </Button>
    </SafeAreaView>
  );
}
