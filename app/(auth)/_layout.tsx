import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import React from "react";

const AuthLayout = () => {
  return (
    <>
      <View style={{ flex: 1 }}>
        {/* Ensure the layout takes full screen */}
        <Stack>
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
          <Stack.Screen name="sign-up" options={{ headerShown: false }} />
          <Stack.Screen
            name="reset-password"
            options={{ headerShown: false }}
          />
        </Stack>
      </View>
      <StatusBar style="light" backgroundColor={"transparent"} />
    </>
  );
};

export default AuthLayout;
