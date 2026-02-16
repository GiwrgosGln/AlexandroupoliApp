import { Colors } from "@/constants/colors";
import { useUser } from "@/features/users/api/get-user";
import { useCurrentWeather } from "@/features/weather/api/get-current-weather";
import { useAuth } from "@clerk/clerk-expo";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  const { data: user } = useUser({ userId: useAuth().userId! });
  const { data: currentWeather } = useCurrentWeather();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning!";
    if (hour < 18) return "Good Afternoon!";
    return "Good Evening!";
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Left Side - Avatar and Greeting */}
        <View style={styles.leftSection}>
          <Image
            style={styles.avatar}
            source={{
              uri:
                user?.image_url || "https://reactnative.dev/img/tiny_logo.png",
            }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.subtitle}>Ready to explore AXD?</Text>
          </View>
        </View>

        {/* Right Side - Weather */}
        {currentWeather && (
          <View style={styles.weatherSection}>
            <View style={styles.weatherRow}>
              <Image
                style={styles.weatherIcon}
                source={{ uri: currentWeather.icon + ".svg" }}
              />
              <Text style={styles.temperature}>
                {Math.round(currentWeather.temperature.current)}
                {currentWeather.temperature.unit}
              </Text>
            </View>
            <Text style={styles.location}>Alexandroupoli</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.primary,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text.primary,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  weatherSection: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  weatherRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  weatherIcon: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  temperature: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
  },
  location: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
});
