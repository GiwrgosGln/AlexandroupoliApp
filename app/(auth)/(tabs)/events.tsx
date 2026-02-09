import { useEvents } from "@/features/events/api/get-events";
import EventCard from "@/features/events/components/event-card";
import { ScrollView, StyleSheet } from "react-native";

export default function EventsScreen() {
  const { data: events } = useEvents();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {events?.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 60,
  },
});
