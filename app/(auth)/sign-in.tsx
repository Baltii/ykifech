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
import { Link, router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import images from "@/constants/images";
import AuthService from "@/lib/AuthService";

const SignIn = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const screenHeight = Dimensions.get("window").height;

  const validateForm = () => {
    if (!form.email || !form.password) {
      Alert.alert("Validation Error", "Please fill in all fields");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address");
      return false;
    }

    if (form.password.length < 6) {
      Alert.alert(
        "Invalid Password",
        "Password must be at least 6 characters long"
      );
      return false;
    }

    return true;
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const response = await AuthService.signin(form.email, form.password);
      console.log("Signin successful:", response);
      router.push("/home");
    } catch (error: Error | any) {
      console.error("Signin error:", error);
      Alert.alert(
        "Signin Failed",
        error.message || "Please check your information and try again"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!form.email) {
      Alert.alert(
        "Email Required",
        "Please enter your email address to reset your password"
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address");
      return;
    }

    try {
      await AuthService.forgotPassword(form.email);
      Alert.alert(
        "Reset Email Sent",
        "If an account exists with this email, you will receive password reset instructions"
      );
    } catch (error: Error | any) {
      console.error("Forgot password error:", error);
      Alert.alert(
        "Error",
        error.message || "Failed to process forgot password request"
      );
    }
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="none">
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
                Sign in to your account
              </Text>
              <Text
                style={{
                  color: "#f3f4f6",
                  fontSize: 16,
                  textAlign: "center",
                  fontFamily: "Outfit-Light",
                }}>
                Welcome back! Please enter your details
              </Text>
            </View>

            {/* Form Fields */}
            <View style={{ width: "100%", marginBottom: 16 }}>
              <FormField
                title="Email"
                value={form.email}
                placeholder="Enter your email"
                handleChangeText={(text) => setForm({ ...form, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <FormField
                title="Password"
                value={form.password}
                placeholder="Enter your password"
                handleChangeText={(text) =>
                  setForm({ ...form, password: text })
                }
                secureTextEntry={true}
                otherStyles={{ marginBottom: 16 }}
                keyboardType="default"
                autoCapitalize="none"
              />
              <Text
                onPress={handleForgotPassword}
                style={{
                  color: "#60a5fa",
                  fontSize: 16,
                  fontFamily: "Outfit-Regular",
                  alignSelf: "flex-end",
                }}>
                Forgot password?
              </Text>
            </View>

            {/* Buttons */}
            <View style={{ width: "100%", marginTop: 32 }}>
              <CustomButton
                text={isSubmitting ? "Signing in..." : "Sign in"}
                onPress={handleSignIn}
                disabled={isSubmitting}
                classNames="w-full"
              />

              {/* Divider */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 24,
                }}>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: "rgba(243, 244, 246, 0.2)",
                  }}
                />
                <Text
                  style={{
                    color: "white",
                    marginHorizontal: 16,
                  }}>
                  or login in with
                </Text>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: "rgba(243, 244, 246, 0.2)",
                  }}
                />
              </View>

              <CustomButton
                text="Sign in with Google"
                leftIcon="logo-google"
                onPress={() => router.push("/home")}
                classNames="bg-slate-900"
                textClassNames="text-white"
              />
            </View>

            {/* Footer */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 32,
              }}>
              <Text
                style={{
                  color: "#f3f4f6",
                  fontSize: 16,
                  fontFamily: "Outfit-Regular",
                }}>
                Don't have an account?{" "}
              </Text>
              <Link href="/(auth)/sign-up">
                <Text
                  style={{
                    color: "#60a5fa",
                    fontSize: 16,
                    fontFamily: "Outfit-Regular",
                    marginLeft: 8,
                  }}>
                  Sign up
                </Text>
              </Link>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
      <StatusBar style="light" backgroundColor="transparent" />
    </>
  );
};

export default SignIn;
