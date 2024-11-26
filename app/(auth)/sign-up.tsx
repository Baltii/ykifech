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

const SignUp = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const screenHeight = Dimensions.get("window").height;

  const handleSignUp = async () => {
    setSubmitting(true);
    try {
      const response = await AuthService.signup(form.email, form.password);
      console.log("Signup successful:", response);
      router.push("/home");
    } catch (error: Error | any) {
      console.error("Signup error:", error);
      Alert.alert(
        "Signup Failed",
        error.message || "Please check your information and try again"
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
              paddingBottom: 40,
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
                Create your account
              </Text>
              <Text
                style={{
                  color: "#f3f4f6",
                  fontSize: 16,
                  textAlign: "center",
                  fontFamily: "Outfit-Light",
                }}>
                Join us! Please enter your details
              </Text>
            </View>

            {/* Form Fields */}
            <View style={{ width: "100%", marginBottom: 16 }}>
              <FormField
                title="Full Name"
                value={form.fullname}
                placeholder="Enter your full name"
                handleChangeText={(text) =>
                  setForm({ ...form, fullname: text })
                }
              />
              <FormField
                title="Email"
                value={form.email}
                placeholder="Enter your email"
                handleChangeText={(text) => setForm({ ...form, email: text })}
              />
              <FormField
                title="Password"
                value={form.password}
                placeholder="Enter your password"
                handleChangeText={(text) =>
                  setForm({ ...form, password: text })
                }
              />
              <Text
                style={{
                  color: "#f3f4f6",
                  fontSize: 14,
                  fontFamily: "Outfit-Light",
                  marginTop: 8,
                }}>
                By creating an account, you agree to our{" "}
                <Text style={{ color: "#60a5fa" }}>Terms of Service</Text> and{" "}
                <Text style={{ color: "#60a5fa" }}>Privacy Policy</Text>
              </Text>
            </View>

            {/* Buttons */}
            <View style={{ width: "100%", marginTop: 32 }}>
              <CustomButton
                text={isSubmitting ? "Creating account..." : "Create account"}
                onPress={handleSignUp}
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
                  or sign up with
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
                text="Sign up with Google"
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
                marginBottom: 20,
              }}>
              <Text
                style={{
                  color: "#f3f4f6",
                  fontSize: 16,
                  fontFamily: "Outfit-Regular",
                }}>
                Already have an account?{" "}
              </Text>
              <Link href="/sign-in">
                <Text
                  style={{
                    color: "#60a5fa",
                    fontSize: 16,
                    fontFamily: "Outfit-Regular",
                    marginLeft: 8,
                  }}>
                  Sign in
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

export default SignUp;
