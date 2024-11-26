import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ForkKnife } from "phosphor-react-native";

interface PlaceCardProps {
  image: number;
  title: string;
  location: string;
  type: string;
}

const PlaceCard = ({ image, title, location, type }: PlaceCardProps) => {
  const [isFavorite, setIsFavorite] = React.useState(false);

  return (
    <TouchableOpacity className="mr-6 w-48">
      <View className="relative">
        <Image
          source={image}
          className="w-full h-32 rounded-lg"
          resizeMode="cover"
        />
        <TouchableOpacity
          className="absolute top-2 right-2 p-1"
          onPress={() => setIsFavorite(!isFavorite)}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={20}
            color={isFavorite ? "#FF3B30" : "white"}
          />
        </TouchableOpacity>
        <View className="absolute top-2 left-2">
          <View className="bg-black/50 px-2 py-1 rounded-full flex-row items-center">
            <ForkKnife size={12} color="white" weight="regular" />
            <Text className="text-xs text-white ml-1">{type}</Text>
          </View>
        </View>
      </View>
      <Text className="text-white text-base mt-2">{title}</Text>
      <Text className="text-gray-400 text-xs">{location}</Text>
    </TouchableOpacity>
  );
};

export default PlaceCard;
