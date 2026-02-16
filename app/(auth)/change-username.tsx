import { useUser } from "@clerk/clerk-expo";
import { useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";
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
    <SafeAreaView style={styles.container}>
      <TextInput placeholder="New Username" onChangeText={setNewUsername} />
      <Button title="Update Username" onPress={updateUsername} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
