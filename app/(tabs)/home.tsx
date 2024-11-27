import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Brandy, Coffee, Confetti, ForkKnife } from "phosphor-react-native";
import { CategoryItem } from "@/components/CategoryItem";
import PlaceCard from "@/components/PlaceCard";

interface PlaceCardProps {
  _id: string;
  image: number;
  title: string;
  location: string;
  type: string;
}

const EventBanner = () => (
  <TouchableOpacity className="bg-slate-800 py-6 px-4 rounded-xl">
    <Text className="text-2xl text-white font-bold">EVENT TITLE</Text>
    <Text className="text-gray-100 mt-1">
      Worem ipsum dolor sit amet, consectetur adipiscing elit.
    </Text>
    <Text className="text-gray-100 mt-2">Location</Text>
    <Text className="text-gray-100">Date & Time</Text>
  </TouchableOpacity>
);

const SearchBar = () => (
  <View className="flex-row items-center bg-slate-800 rounded-2xl mt-6 px-4 py-4">
    <Ionicons name="search" size={20} color="#9A9A9A" />
    <TextInput
      placeholder="Find your destination..."
      placeholderTextColor="#9A9A9A"
      className="flex-1 ml-2 text-white"
    />
    <TouchableOpacity className="bg-[#1A1A1A] p-2 rounded-lg">
      <Ionicons name="options" size={20} color="#559CE4" />
    </TouchableOpacity>
  </View>
);

const Categories = () => {
  const [activeCategories, setActiveCategories] = React.useState<string[]>([]);

  const categories = [
    { icon: ForkKnife, label: "Restaurant", isActive: false },
    { icon: Coffee, label: "Coffee", isActive: false },
    { icon: Brandy, label: "Bar", isActive: false },
    { icon: Confetti, label: "Fun", isActive: false },
  ];

  const toggleCategory = (label: string) => {
    setActiveCategories((prev) =>
      prev.includes(label)
        ? prev.filter((cat) => cat !== label)
        : [...prev, label]
    );
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-6">
      {categories.map((category, index) => (
        <CategoryItem
          key={index}
          icon={category.icon}
          label={category.label}
          isActive={activeCategories.includes(category.label)}
          onPress={() => toggleCategory(category.label)}
        />
      ))}
    </ScrollView>
  );
};

const PlaceSection = ({
  title,
  places,
}: {
  title: string;
  places: PlaceCardProps[];
}) => (
  <View className="mt-8">
    <View className="flex-row justify-between items-center mb-4">
      <Text className="text-white text-xl">{title}</Text>
      <TouchableOpacity>
        <Text className="text-blue-400">View all</Text>
      </TouchableOpacity>
    </View>

    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {places.map((place, index) => (
        <PlaceCard key={index} {...place} />
      ))}
    </ScrollView>
  </View>
);

const Home = () => {
  const places = [
    {
      _id: "1",
      image: require("@/assets/images/welcome-bg.jpg"),
      title: "Billionaire",
      location: "Gammarth",
      type: "Restaurant",
    },
    {
      _id: "2",
      image: require("@/assets/images/welcome-bg.jpg"),
      title: "Utopia",
      location: "Gammarth",
      type: "Restaurant",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#111111]">
      <ScrollView
        className="flex-1 px-4 py-6"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}>
        <EventBanner />
        <SearchBar />
        <Categories />
        <PlaceSection title="Popular" places={places} />
        <PlaceSection title="Trendy" places={places} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
