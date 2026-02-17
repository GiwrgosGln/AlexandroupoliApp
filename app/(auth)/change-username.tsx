import { useUser } from "@clerk/clerk-expo";
import { Button, Description, Input, Label, TextField } from "heroui-native";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChangeUsernameScreen() {
  const { user } = useUser();

  // Username state
  const [newUsername, setNewUsername] = useState("");

  const updateUsername = async () => {
    try {
      await user?.update({ username: newUsername });
      alert("Username updated!");
    } catch (err) {
      console.error("Error updating username:", err);
      alert(
        `Error updating username: ${
          err instanceof Error ? err.message : String(err)
        }`,
      );
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-col px-4">
        <TextField>
          <Label>New Username</Label>
          <Input
            placeholder="Enter your new username"
            onChangeText={setNewUsername}
          />
          <Description>
            Your username must be unique and contain only letters and numbers.
          </Description>
        </TextField>
        <Button onPress={updateUsername} className="mt-10">
          Update Username
        </Button>
      </View>
    </SafeAreaView>
  );
}
