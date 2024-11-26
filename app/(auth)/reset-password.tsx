import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  Alert,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Link, router, useLocalSearchParams } from "expo-router";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import images from "@/constants/images";
import AuthService from "@/lib/AuthService";

const ResetPassword = () => {
  const { token } = useLocalSearchParams();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const screenHeight = Dimensions.get("window").height;

  const handleResetPassword = async () => {
    if (!form.password || !form.confirmPassword) {
      Alert.alert("Validation Error", "Please fill in all fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert("Validation Error", "Passwords do not match");
      return;
    }

    setSubmitting(true);
    try {
      const response = await AuthService.resetPassword(
        token as string,
        form.password
      );
      Alert.alert("Success", response.message || "Password reset successful");
      router.push("/sign-in");
    } catch (error: Error | any) {
      console.error("Reset password error:", error);
      Alert.alert(
        "Reset Password Failed",
        error.message || "Please try again later"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
        <ImageBackground
          style={{
            flex: 1,
            minHeight: screenHeight,
          }}
          resizeMode="cover"
          source={images.authBG}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 24,
              paddingTop: 64,
            }}>
            {/* Logo */}
            <View style={{ marginBottom: 32 }}>
              <Image
                source={images.logo}
                style={{ width: 144, height: 80 }}
                resizeMode="contain"
              />
            </View>

            {/* Header Text */}
            <View style={{ marginBottom: 48 }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 30,
                  textAlign: "center",
                  fontFamily: "Outfit-Regular",
                  marginBottom: 8,
                }}>
                Reset Password
              </Text>
              <Text
                style={{
                  color: "#f3f4f6",
                  fontSize: 16,
                  textAlign: "center",
                  fontFamily: "Outfit-Light",
                }}>
                Enter your new password
              </Text>
            </View>

            {/* Form Fields */}
            <View style={{ width: "100%", marginBottom: 32 }}>
              <FormField
                title="Password"
                value={form.password}
                placeholder="Enter new password"
                handleChangeText={(text) =>
                  setForm({ ...form, password: text })
                }
              />
              <FormField
                title="Password"
                value={form.confirmPassword}
                placeholder="Confirm new password"
                handleChangeText={(text) =>
                  setForm({ ...form, confirmPassword: text })
                }
              />
            </View>

            {/* Button */}
            <View style={{ width: "100%" }}>
              <CustomButton
                text={isSubmitting ? "Resetting..." : "Reset Password"}
                onPress={handleResetPassword}
                disabled={isSubmitting}
                classNames="w-full"
              />
            </View>

            {/* Footer */}
            <View style={{ marginTop: 32 }}>
              <Link
                href="/sign-in"
                style={{
                  color: "#60a5fa",
                  fontSize: 16,
                  textAlign: "center",
                  fontFamily: "Outfit-Regular",
                }}>
                Back to Sign In
              </Link>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
      <StatusBar style="light" backgroundColor="transparent" />
    </>
  );
};

export default ResetPassword;
