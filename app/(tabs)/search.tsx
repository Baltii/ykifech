import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MagnifyingGlass,
  Sliders,
  ForkKnife,
  Coffee,
  Wine,
  GameController,
  Star,
  Video,
  Palette,
  Tree,
} from "phosphor-react-native";
import { CategoryItem } from "@/components/CategoryItem";
import PlaceListItem from "@/components/PlaceListItem";

const SearchPage = () => {
  const [activeCategories, setActiveCategories] = React.useState<string[]>([]);
  const categories = [
    { id: 1, name: "Restaurant", icon: ForkKnife },
    { id: 2, name: "Coffee", icon: Coffee },
    { id: 3, name: "Bar", icon: Wine },
    { id: 4, name: "Fun", icon: GameController },
    { id: 5, name: "Cinema", icon: Video },
    { id: 6, name: "Museum", icon: Palette },
    { id: 7, name: "Park", icon: Tree },
  ];

  const toggleCategory = (label: string) => {
    setActiveCategories((prev) =>
      prev.includes(label)
        ? prev.filter((cat) => cat !== label)
        : [...prev, label]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#111111]">
      <View className="px-4 py-2">
        {/* Search Header */}
        <View className="flex-row items-center space-x-2 bg-gray-800 rounded-lg px-4 py-2">
          <MagnifyingGlass size={20} color="#666" />
          <TextInput
            placeholder="Find your destination..."
            placeholderTextColor="#666"
            className="flex-1 text-white"
          />
          <TouchableOpacity>
            <Sliders size={20} color="#4B9CFF" />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4">
          {categories.map((category) => (
            <CategoryItem
              key={category.id}
              icon={category.icon}
              label={category.name}
              onPress={() => toggleCategory(category.name)}
              isActive={activeCategories.includes(category.name)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Results */}
      <ScrollView className="flex-1 px-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <PlaceListItem
            key={item}
            imageUri="https://placeholder.com/150"
            placeName="Place Name"
            rating={4.5}
            location="Location"
            hours="12:00 - 05:00 | Open"
            tags={["+18", "Solo & Group", "Luxury"]}
            isActive={false}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchPage;
