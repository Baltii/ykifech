import CustomButton from "@/components/CustomButton";
import React from "react";
import {
  Text,
  ImageBackground,
  Image,
  View,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import images from "@/constants/images";

export default function Welcome() {
  const handleGetStarted = () => router.push("/sign-in");
  const screenHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView className="flex-1 h-full">
      <StatusBar style="light" backgroundColor="transparent" />
      <ImageBackground
        className="flex-1 justify-between h-full"
        source={require("../assets/images/welcome-bg.jpg")}
        resizeMode="cover">
        <View className="flex-1 bg-black/20 h-full">
          {/* Logo Section - Only top padding */}
          <View className="items-center pt-24">
            <Image
              source={images.logo}
              className="w-28 h-16"
              resizeMode="contain"
            />
          </View>

          {/* Text Content - Centered with flex */}
          <View className="flex-1 justify-center items-center px-8">
            <View>
              <Text
                className="text-white text-5xl text-center leading-tight mb-6"
                style={{ fontFamily: "Outfit-Medium" }}>
                Find the best <Text className="text-blue-400">locations </Text>
                to go
              </Text>
              <Text
                className="text-gray-100 text-base text-center"
                style={{ fontFamily: "Outfit-Light" }}>
                Morem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
            </View>
          </View>

          {/* Button Section - Only bottom padding */}
          <View className="px-6 pb-24">
            <CustomButton
              text="Get Started"
              onPress={handleGetStarted}
              rightIcon="arrow-forward"
              classNames="w-full"
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
