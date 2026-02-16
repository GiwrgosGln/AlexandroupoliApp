import { ChipGroup } from "@/components/shared/ui/molecules/animated-chip/Chip";
import { Colors } from "@/constants/colors";
import { PLACE_CATEGORIES, PLACES } from "@/features/places/data/places";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function FeaturedPlacesList() {
  const [selected, setSelected] = useState(0);

  const getFilteredPlaces = () => {
    if (selected === 0) return PLACES;
    const selectedCategory = PLACE_CATEGORIES[selected];
    return PLACES.filter((place) => place.category === selectedCategory);
  };

  const chips = [
    {
      label: "All",
      activeColor: "#4A90E2",
      inActiveBackgroundColor: "#F5F5F5",
      labelColor: "#fff",
      icon: () => (
        <MaterialCommunityIcons
          name="view-grid"
          size={18}
          color={selected === 0 ? "#fff" : "#666"}
        />
      ),
    },
    {
      label: "Hotels",
      activeColor: "#4A90E2",
      inActiveBackgroundColor: "#F5F5F5",
      labelColor: "#fff",
      icon: () => (
        <MaterialCommunityIcons
          name="bed-double"
          size={18}
          color={selected === 1 ? "#fff" : "#666"}
        />
      ),
    },
    {
      label: "Food",
      activeColor: "#FF6B6B",
      inActiveBackgroundColor: "#F5F5F5",
      labelColor: "#fff",
      icon: () => (
        <MaterialCommunityIcons
          name="silverware-fork-knife"
          size={18}
          color={selected === 2 ? "#fff" : "#666"}
        />
      ),
    },
    {
      label: "Events",
      activeColor: "#9B59B6",
      inActiveBackgroundColor: "#F5F5F5",
      labelColor: "#fff",
      icon: () => (
        <MaterialCommunityIcons
          name="ticket-confirmation"
          size={18}
          color={selected === 3 ? "#fff" : "#666"}
        />
      ),
    },
    {
      label: "Attractions",
      activeColor: "#F39C12",
      inActiveBackgroundColor: "#F5F5F5",
      labelColor: "#fff",
      icon: () => (
        <MaterialCommunityIcons
          name="camera"
          size={18}
          color={selected === 4 ? "#fff" : "#666"}
        />
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.chipWrapper}>
          <ChipGroup
            chips={chips}
            selectedIndex={selected}
            onChange={setSelected}
          />
        </View>

        <FlashList
          data={getFilteredPlaces()}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.placesList}
          renderItem={({ item }) => (
            <Pressable style={styles.placeCardShadow}>
              <View style={styles.placeCard}>
                <Image source={{ uri: item.image }} style={styles.placeImage} />
                <View style={styles.placeOverlay}>
                  <Pressable style={styles.favoriteButton}>
                    <MaterialCommunityIcons
                      name="heart"
                      size={20}
                      color="#fff"
                    />
                  </Pressable>
                </View>
                <View style={styles.placeInfo}>
                  <Text style={styles.placeName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.placeCategory} numberOfLines={1}>
                    {item.category}
                  </Text>
                  <View style={styles.placeDetails}>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: item.statusColor },
                      ]}
                    >
                      <Text style={styles.statusText}>{item.status}</Text>
                    </View>
                    <View style={styles.distanceRow}>
                      <MaterialCommunityIcons
                        name="map-marker"
                        size={13}
                        color={Colors.text.secondary}
                      />
                      <Text style={styles.placeDistance}>{item.distance}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.primary,
  },
  content: {
    paddingHorizontal: 20,
    gap: 8,
  },
  chipWrapper: {
    marginVertical: 16,
  },
  placesList: {
    paddingRight: 20,
    paddingBottom: 10,
  },
  placeCardShadow: {
    width: 292,
    marginRight: 16,
    borderRadius: 20,
  },
  placeCard: {
    borderRadius: 20,
    backgroundColor: Colors.background.primary,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border.primary,
  },
  placeImage: {
    width: "100%",
    height: 188,
    backgroundColor: Colors.background.secondary,
  },
  placeOverlay: {
    position: "absolute",
    top: 14,
    right: 14,
  },
  favoriteButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(0, 0, 0, 0.36)",
    justifyContent: "center",
    alignItems: "center",
  },
  placeInfo: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  placeName: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text.primary,
    letterSpacing: 0.2,
    marginBottom: 4,
  },
  placeCategory: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 10,
  },
  placeDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.2,
  },
  distanceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  placeDistance: {
    fontSize: 13,
    fontWeight: "500",
    color: Colors.text.secondary,
  },
});
