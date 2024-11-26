import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

interface ProfileOptionProps {
  title: string;
  onPress: () => void;
  isLogout?: boolean;
}

const ProfileOption = ({
  title,
  onPress,
  isLogout = false,
}: ProfileOptionProps) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center justify-between p-4">
    <Text
      className={`text-lg ${isLogout ? "text-red-500" : "text-white"}`}
      style={{ fontFamily: "Outfit-Regular" }}>
      {title}
    </Text>
    <Text className="text-gray-400 text-xl">›</Text>
  </TouchableOpacity>
);

const Profile = () => {
  const handleLogout = () => {
    // Add logout logic here
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#111111]">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row justify-between p-4">
          <TouchableOpacity>
            <Text className="text-blue-400 text-2xl">‹</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-blue-400 text-2xl">⋯</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View className="items-center mt-4 mb-8">
          <View className="w-24 h-24 rounded-full bg-purple-100 overflow-hidden mb-4">
            {/* Add profile image here */}
          </View>
          <Text
            className="text-white text-2xl mb-1"
            style={{ fontFamily: "Outfit-Medium" }}>
            Ahmed Balti
          </Text>
          <Text
            className="text-gray-400"
            style={{ fontFamily: "Outfit-Regular" }}>
            Tunis, Tunisia
          </Text>

          {/* Social Icons */}
          <View className="flex-row gap-4 mt-4">
            <TouchableOpacity>
              <View className="w-10 h-10 rounded-full bg-gray-800 items-center justify-center">
                <Text>fb</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View className="w-10 h-10 rounded-full bg-gray-800 items-center justify-center">
                <Text>ig</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View className="w-10 h-10 rounded-full bg-gray-800 items-center justify-center">
                <Text>wa</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Options */}
        <View className="flex-1 px-4">
          <ProfileOption title="Edit Profile" onPress={() => {}} />
          <ProfileOption title="Account Settings" onPress={() => {}} />
          <ProfileOption title="Linked Accounts" onPress={() => {}} />
          <ProfileOption
            title="Log out"
            onPress={handleLogout}
            isLogout={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
