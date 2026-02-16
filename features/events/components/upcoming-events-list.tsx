import { Colors } from "@/constants/colors";
import { Image } from "expo-image";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useEvents } from "../api/get-events";

export default function UpcomingEventsList() {
  const { data: events, isLoading } = useEvents();

  // Filter events for the next 7 days
  const upcomingEvents = events?.filter((event) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sevenDaysFromNow = new Date(today);
    sevenDaysFromNow.setDate(today.getDate() + 7);

    const eventStartDate = new Date(event.start_date);
    eventStartDate.setHours(0, 0, 0, 0);

    return eventStartDate >= today && eventStartDate <= sevenDaysFromNow;
  });

  const getDaysUntilEvent = (startDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(startDate);
    eventDate.setHours(0, 0, 0, 0);

    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    }
    return `In ${diffDays} ${diffDays === 1 ? "day" : "days"}`;
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Happening Now</Text>
        <Text style={styles.loadingText}>Loading events...</Text>
      </View>
    );
  }

  if (!upcomingEvents || upcomingEvents.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Happening Now</Text>
        <Text style={styles.emptyText}>No upcoming events</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Happening Now</Text>
      <FlatList
        data={upcomingEvents}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => {
          const daysLabel = getDaysUntilEvent(item.start_date);
          return (
            <View style={styles.eventCard}>
              <Image
                source={{ uri: item.image_url }}
                style={styles.eventImage}
              />

              <View style={styles.eventContent}>
                <View style={styles.eventHeader}>
                  <Text style={styles.eventTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                </View>

                <Text style={styles.eventLocation} numberOfLines={1}>
                  {item.location}
                </Text>

                <View style={styles.eventFooter}>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{daysLabel}</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text.primary,
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: "center",
    marginTop: 20,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: "center",
    marginTop: 20,
  },
  eventCard: {
    flexDirection: "row",
    backgroundColor: Colors.background.primary,
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  eventImage: {
    width: 100,
    height: 100,
    backgroundColor: Colors.background.secondary,
  },
  eventContent: {
    flex: 1,
    marginLeft: 12,
    marginVertical: 8,
    marginRight: 8,
    justifyContent: "space-between",
  },
  eventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text.primary,
    flex: 1,
  },
  eventLocation: {
    fontSize: 13,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  eventFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.badge.text,
  },
});
