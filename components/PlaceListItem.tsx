import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Star } from "phosphor-react-native";

interface PlaceListItemProps {
  imageUri: string;
  placeName: string;
  rating: number;
  location: string;
  hours: string;
  tags: string[];
  isActive: boolean;
}

const PlaceListItem: React.FC<PlaceListItemProps> = ({
  imageUri,
  placeName,
  rating,
  location,
  hours,
  tags,
  isActive,
}) => {
  return (
    <TouchableOpacity className="bg-gray-800 rounded-lg p-4 mb-4 flex-row">
      <Image source={{ uri: imageUri }} className="w-24 h-24 rounded-lg" />
      <View className="ml-4 flex-1">
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-lg font-bold">{placeName}</Text>
          <View className="flex-row items-center">
            <Star size={16} color="#FFD700" weight="fill" />
            <Text className="text-white ml-1">{rating}</Text>
          </View>
        </View>
        <Text className="text-gray-400">{location}</Text>
        <Text className="text-gray-400">{hours}</Text>
        <View className="flex-row mt-2">
          {tags.map((tag, index) => (
            <Text
              key={index}
              className={`text-xs text-white px-2 py-1 rounded mr-2 ${
                tag === "+18"
                  ? "bg-red-500"
                  : tag === "Solo & Group"
                  ? "bg-green-500"
                  : "bg-yellow-500"
              }`}>
              {tag}
            </Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PlaceListItem;
