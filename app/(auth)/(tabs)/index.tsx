import { Colors } from "@/constants/colors";
import UpcomingEventsList from "@/features/events/components/upcoming-events-list";
import Header from "@/features/home/components/header";
import FeaturedPlacesList from "@/features/places/components/featured-places-list";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Header />
        <FeaturedPlacesList />
        <UpcomingEventsList />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  content: {
    paddingBottom: 24,
  },
});
