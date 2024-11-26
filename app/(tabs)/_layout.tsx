import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import icons from "@/constants/icons";
import {
  PaperPlane,
  House,
  MagnifyingGlass,
  Heart,
  User,
  Plus,
} from "phosphor-react-native";

const TabsLayout = () => {
  return (
    <View className="flex-1 bg-slate-900">
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#559CE4",
          tabBarInactiveTintColor: "#9A9A9A",
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            backgroundColor: "#161622",
            borderTopWidth: 0,
            height: 60,
            borderRadius: 30,
            marginBottom: 25,
            marginHorizontal: 20,
            paddingHorizontal: 10,
            paddingTop: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 8,
            elevation: 8,
          },
        }}>
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <House
                size={24}
                color={focused ? "#559CE4" : "#9A9A9A"}
                weight="regular"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <MagnifyingGlass
                size={24}
                color={focused ? "#559CE4" : "#9A9A9A"}
                weight="regular"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="addPlace"
          options={{
            title: "Add Place",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View className="bg-[#559CE4] p-4 rounded-full -mt-8 shadow-lg">
                <Plus size={20} color="white" weight="regular" />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="favorite"
          options={{
            title: "Favorites",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Heart
                size={24}
                color={focused ? "#559CE4" : "#9A9A9A"}
                weight="regular"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <User
                size={24}
                color={focused ? "#559CE4" : "#9A9A9A"}
                weight="regular"
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
};

export default TabsLayout;
