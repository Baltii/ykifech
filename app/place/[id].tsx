import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import React from "react";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { MapPin, Clock, Phone, Star, ArrowLeft } from "phosphor-react-native";

const PlaceDetails = () => {
  const { id } = useLocalSearchParams();

  // Placeholder data - replace with actual API call
  const placeData = {
    name: "716 Coffee",
    type: "Coffee Shop",
    tags: ["Solo & Group", "Classic"],
    rating: 3.2,
    maxRating: 5,
    description:
      "Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    location: "Lac 2, Tunis",
    hours: "09:00 - 23h00",
    phone: "(+216) 12 345 678",
    image: require("@/assets/images/welcome-bg.jpg"),
  };

  const handleCall = () => {
    Linking.openURL(`tel:${placeData.phone}`);
  };

  const handleOpenMaps = () => {
    // Implement map opening logic
  };

  return (
    <View className="flex-1 bg-[#111111] pt-12">
      {/* Back Button - Now floating over the image */}
      <TouchableOpacity
        className="absolute top-14 left-4 z-10 p-2 bg-black/30 rounded-full"
        onPress={() => router.back()}>
        <ArrowLeft size={24} color="white" />
      </TouchableOpacity>

      {/* Header Image */}
      <View className="relative h-72">
        <Image
          source={placeData.image}
          className="w-full h-full"
          resizeMode="cover"
        />

        {/* Maps Button */}
        <TouchableOpacity
          className="absolute top-2 right-4 flex-row items-center bg-black/30 rounded-full px-4 py-2"
          onPress={handleOpenMaps}>
          <Text className="text-white mr-2">Open in Maps</Text>
          <MapPin size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-6 pt-6">
        {/* Title Section */}
        <View className="flex-row justify-between items-start mb-4">
          <View>
            <Text className="text-white text-3xl font-bold mb-2">
              {placeData.name}
            </Text>
            <Text className="text-gray-400">{placeData.type}</Text>
          </View>
          <View className="flex-row items-center">
            <Star size={20} color="#FFD700" weight="fill" />
            <Text className="text-white ml-1">
              {placeData.rating}/{placeData.maxRating}
            </Text>
          </View>
        </View>

        {/* Tags */}
        <View className="flex-row mb-6">
          {placeData.tags.map((tag, index) => (
            <View
              key={index}
              className={`mr-2 px-3 py-1 rounded-full ${
                tag === "Solo & Group" ? "bg-green-500" : "bg-yellow-500"
              }`}>
              <Text className="text-white text-sm">{tag}</Text>
            </View>
          ))}
        </View>

        {/* About Section */}
        <View className="mb-6">
          <Text className="text-white text-xl mb-2">About</Text>
          <Text className="text-gray-400 leading-5">
            {placeData.description}
          </Text>
        </View>

        {/* Info Section */}
        <View className="space-y-4">
          <View className="flex-row items-center">
            <MapPin size={20} color="#9CA3AF" />
            <Text className="text-gray-400 ml-2">{placeData.location}</Text>
          </View>

          <View className="flex-row items-center">
            <Clock size={20} color="#9CA3AF" />
            <Text className="text-gray-400 ml-2">{placeData.hours}</Text>
          </View>

          <TouchableOpacity
            className="flex-row items-center"
            onPress={handleCall}>
            <Phone size={20} color="#9CA3AF" />
            <Text className="text-gray-400 ml-2">{placeData.phone}</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Button */}
        <TouchableOpacity className="bg-blue-500 rounded-xl py-4 mt-8">
          <Text className="text-white text-center text-lg font-semibold">
            View Menu
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default PlaceDetails;
