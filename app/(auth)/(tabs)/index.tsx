import { useUser } from "@/features/users/api/get-user";
import { useAuth } from "@clerk/clerk-expo";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { data: user } = useUser({ userId: useAuth().userId! });
  return (
    <SafeAreaView>
      <View>
        <Text>{user?.username}</Text>
      </View>
    </SafeAreaView>
  );
}
