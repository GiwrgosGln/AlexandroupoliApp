import { Colors } from "@/constants/colors";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [isOfflineModeEnabled, setOfflineModeEnabled] = useState(true);
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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarContainer}>
              {user?.imageUrl ? (
                <Image
                  source={{ uri: user.imageUrl }}
                  style={styles.avatarImage}
                />
              ) : (
                <View style={styles.avatarFallback}>
                  <Text style={styles.avatarText}>
                    {user?.firstName?.charAt(0) || "U"}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.cameraBadge}>
              <Ionicons
                name="camera"
                size={14}
                color={Colors.background.primary}
              />
            </View>
          </View>

          <Text style={styles.userName}>{user?.username}</Text>

          <Text style={styles.userEmail}>
            {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </View>

        <Text style={styles.sectionLabel}>SETTINGS</Text>

        <View style={styles.sectionCard}>
          <TouchableOpacity
            style={[styles.menuItem, styles.menuItemWithoutBorder]}
            onPress={() => router.push("/(auth)/account")}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="person" size={18} color={Colors.text.secondary} />
              <Text style={styles.menuItemText}>Account</Text>
            </View>

            <View style={styles.rightControl}>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={Colors.text.secondary}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => Alert.alert("Saved Places", "Coming soon")}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons
                name="bookmark"
                size={18}
                color={Colors.text.secondary}
              />
              <Text style={styles.menuItemText}>Saved Places</Text>
            </View>

            <View style={styles.rightControl}>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={Colors.text.secondary}
              />
            </View>
          </TouchableOpacity>

          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons
                name="notifications"
                size={18}
                color={Colors.text.secondary}
              />
              <Text style={styles.menuItemText}>Push Notifications</Text>
            </View>

            <View style={styles.rightControl}>
              <Switch
                value={isPushNotificationEnabled}
                onValueChange={setPushNotificationEnabled}
                trackColor={{
                  false: Colors.border.primary,
                  true: Colors.primary,
                }}
                thumbColor={Colors.background.primary}
                ios_backgroundColor={Colors.border.primary}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.menuItem, styles.menuItemWithoutBorder]}
            onPress={() => router.push("/(auth)/language-selection")}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons
                name="language"
                size={18}
                color={Colors.text.secondary}
              />
              <Text style={styles.menuItemText}>Language</Text>
            </View>

            <View style={[styles.rightControl, styles.rightValueWithChevron]}>
              <Text style={styles.valueText}>English</Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={Colors.text.secondary}
              />
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionLabel}>SUPPORT</Text>

        <View style={styles.sectionCard}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() =>
              Alert.alert("Help", "Help functionality coming soon")
            }
          >
            <View style={styles.menuItemLeft}>
              <Ionicons
                name="help-circle"
                size={18}
                color={Colors.text.secondary}
              />
              <Text style={styles.menuItemText}>Help Center</Text>
            </View>

            <View style={styles.rightControl}>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={Colors.text.secondary}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.menuItemWithoutBorder]}
            onPress={() =>
              Alert.alert("Rate", "Rating functionality coming soon")
            }
          >
            <View style={styles.menuItemLeft}>
              <Ionicons
                name="thumbs-up"
                size={18}
                color={Colors.text.secondary}
              />
              <Text style={styles.menuItemText}>Rate the App</Text>
            </View>

            <View style={styles.rightControl}>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={Colors.text.secondary}
              />
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>MyAXD v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 14,
    marginTop: 8,
  },
  avatarWrapper: {
    marginBottom: 8,
    position: "relative",
  },
  avatarContainer: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: Colors.background.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 1.5,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 44,
  },
  avatarFallback: {
    width: "100%",
    height: "100%",
    borderRadius: 44,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraBadge: {
    position: "absolute",
    right: -1,
    bottom: 4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.background.primary,
  },
  avatarText: {
    fontSize: 32,
    color: Colors.background.primary,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 28,
    fontWeight: "600",
    color: Colors.text.primary,
    lineHeight: 34,
  },
  userEmail: {
    marginTop: 4,
    fontSize: 13,
    color: Colors.text.secondary,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.text.secondary,
    letterSpacing: 0.8,
    marginBottom: 8,
    marginTop: 4,
  },
  sectionCard: {
    backgroundColor: Colors.background.primary,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 62,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background.secondary,
  },
  menuItemWithoutBorder: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 17,
    color: Colors.text.primary,
    marginLeft: 10,
  },
  valueText: {
    fontSize: 15,
    color: Colors.text.secondary,
    textAlign: "right",
  },
  rightControl: {
    width: 84,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  rightValueWithChevron: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  logoutButton: {
    marginTop: 2,
    backgroundColor: Colors.background.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    color: Colors.danger,
    fontWeight: "600",
    fontSize: 16,
  },
  footerText: {
    marginTop: 12,
    textAlign: "center",
    fontSize: 12,
    color: Colors.text.secondary,
  },
});
