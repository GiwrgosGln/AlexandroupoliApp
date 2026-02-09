import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import * as React from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Placeholder for missing SignOutButton - replace with actual path if it exists
// import { SignOutButton } from '@/components/sign-out-button';

const theme = {
  colors: {
    background: "#f8f9fa",
    card: "#ffffff",
    text: "#000000",
    textSecondary: "#6c757d",
    primary: "#007bff",
    border: "#dee2e6",
    error: "#dc3545",
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
  },
};

// Simple responsive text function placeholder to fix 'rt' errors
const dt = (size: number) => size;

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err: any) {
      console.error("Error signing out:", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Profile", headerShown: true }} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {user?.firstName?.charAt(0) || "U"}
            </Text>
          </View>
          <Text style={styles.userName}>{user?.fullName || "User Name"}</Text>
          <Text style={styles.userEmail}>
            {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>

          <TouchableOpacity
            style={styles.menuItem}
            // Navigate to sibling screen 'account' inside (auth)
            onPress={() => router.push("/account")}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons
                name="person-outline"
                size={20}
                color={theme.colors.text}
              />
              <Text style={styles.menuItemText}>Personal Information</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            // Navigate to sibling screen 'language-selection' inside (auth)
            onPress={() => router.push("/(auth)/language-selection")}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons
                name="globe-outline"
                size={20}
                color={theme.colors.text}
              />
              <Text style={styles.menuItemText}>Language</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() =>
              Alert.alert("Help", "Help functionality coming soon")
            }
          >
            <View style={styles.menuItemLeft}>
              <Ionicons
                name="help-circle-outline"
                size={20}
                color={theme.colors.text}
              />
              <Text style={styles.menuItemText}>Help Center</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    padding: theme.spacing.m,
  },
  header: {
    alignItems: "center",
    marginBottom: theme.spacing.l,
    marginTop: theme.spacing.m,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.s,
  },
  avatarText: {
    fontSize: dt(32),
    color: "#fff",
    fontWeight: "bold",
  },
  userName: {
    fontSize: dt(20),
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: dt(14),
    color: theme.colors.textSecondary,
  },
  section: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: dt(14),
    fontWeight: "600",
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.m,
    textTransform: "uppercase",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: dt(16),
    color: theme.colors.text,
    marginLeft: 12,
  },
  logoutButton: {
    marginTop: theme.spacing.m,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.m,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.error,
  },
  logoutText: {
    color: theme.colors.error,
    fontWeight: "600",
    fontSize: dt(16),
  },
});
