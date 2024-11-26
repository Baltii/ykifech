import { TouchableOpacity, Text } from "react-native";
import React from "react";

interface CategoryItemProps {
  icon: React.ComponentType<any>;
  label: string;
  isActive?: boolean;
  onPress: () => void;
}

export const CategoryItem = ({
  icon: Icon,
  label,
  isActive = false,
  onPress,
}: CategoryItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    className={`mr-4 px-4 py-2 rounded-full flex-row items-center ${
      isActive ? "bg-blue-500" : "bg-slate-800"
    }`}>
    <Icon size={16} color="white" weight="regular" />
    <Text className="text-white ml-2">{label}</Text>
  </TouchableOpacity>
);
