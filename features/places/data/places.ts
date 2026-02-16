export interface Place {
  id: string;
  name: string;
  category: "Attractions" | "Hotels" | "Food" | "Events";
  distance: string;
  status: string;
  statusColor: string;
  image: string;
}

export const PLACE_CATEGORIES = [
  "All",
  "Hotels",
  "Food",
  "Events",
  "Attractions",
] as const;

export const PLACES: Place[] = [
  {
    id: "1",
    name: "Kerouac",
    category: "Food",
    distance: "3.2 mi away",
    status: "OPEN",
    statusColor: "#4CAF50",
    image: "https://kerouac.gr/wp-content/uploads/2021/12/DSC_0158.jpg",
  },
  {
    id: "2",
    name: "Thema",
    category: "Attractions",
    distance: "1.5 mi away",
    status: "TICKETS",
    statusColor: "#2196F3",
    image: "https://www.e-evros.gr/uploads/ALE_9747-1467374116.jpg",
  },
  {
    id: "3",
    name: "Grand Hotel",
    category: "Hotels",
    distance: "0.8 mi away",
    status: "AVAILABLE",
    statusColor: "#4CAF50",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
  },
  {
    id: "4",
    name: "Bella Italia",
    category: "Food",
    distance: "2.1 mi away",
    status: "OPEN",
    statusColor: "#4CAF50",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
  },
  {
    id: "5",
    name: "Jazz Night Live",
    category: "Events",
    distance: "4.5 mi away",
    status: "TONIGHT",
    statusColor: "#FF6B6B",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae",
  },
];
