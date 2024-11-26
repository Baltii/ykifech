import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PlaceListItem from "@/components/PlaceListItem";

const Favorites = () => {
  // Static data for favorite places
  const favoritePlaces = [
    {
      id: 1,
      imageUri: "https://example.com/image1.jpg",
      placeName: "Place One",
      rating: 4.5,
      location: "Location One",
      hours: "10:00 - 22:00 | Open",
      tags: ["Family", "Outdoor"],
      isActive: true,
    },
    {
      id: 2,
      imageUri: "https://example.com/image2.jpg",
      placeName: "Place Two",
      rating: 4.0,
      location: "Location Two",
      hours: "09:00 - 21:00 | Open",
      tags: ["Romantic", "Indoor"],
      isActive: false,
    },
    // Add more places as needed
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#111111]">
      <View className="px-4 py-2">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-white text-2xl font-bold">Favorites</Text>
          <Text className="text-gray-400">{favoritePlaces.length} places</Text>
        </View>

        {/* Favorites List */}
        <ScrollView className="flex-1">
          {favoritePlaces.map((place) => (
            <PlaceListItem
              key={place.id}
              imageUri={place.imageUri}
              placeName={place.placeName}
              rating={place.rating}
              location={place.location}
              hours={place.hours}
              tags={place.tags}
              isActive={place.isActive}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Favorites;
