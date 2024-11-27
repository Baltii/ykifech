import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import {
  ForkKnife,
  Coffee,
  Brandy,
  Confetti,
  CaretLeft,
} from "phosphor-react-native";
import * as ImagePicker from "expo-image-picker";
import PlaceService from "@/lib/PlaceService";
import { router } from "expo-router";

const PLACE_TYPES = [
  { icon: ForkKnife, label: "Restaurant" },
  { icon: Coffee, label: "Coffee" },
  { icon: Brandy, label: "Bar" },
  { icon: Confetti, label: "Fun" },
];

const AddPlace = () => {
  const [selectedType, setSelectedType] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [form, setForm] = useState({
    title: "",
    address: "",
    description: "",
    phone: "",
    openingHours: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pickImage = async () => {
    if (images.length >= 5) {
      Alert.alert("Limit Reached", "You can only add up to 5 images");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newImages = result.assets.map((asset) => asset.uri);
      const totalImages = [...images, ...newImages];

      if (totalImages.length > 5) {
        Alert.alert("Limit Reached", "You can only add up to 5 images");
        const allowedNewImages = newImages.slice(0, 5 - images.length);
        setImages((prev) => [...prev, ...allowedNewImages]);
      } else {
        setImages((prev) => [...prev, ...newImages]);
      }
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.address || !selectedType || images.length === 0) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await PlaceService.create({
        ...form,
        type: selectedType,
        photos: images,
      });
      Alert.alert("Success", "Place added successfully");
      router.back();
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to add place");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#111111" }}
      edges={["top"]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 24,
          }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#222222",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 12,
            }}>
            <CaretLeft size={24} color="white" />
          </TouchableOpacity>
          <Text
            style={{
              color: "white",
              fontSize: 24,
              fontWeight: "bold",
            }}>
            Add New Place
          </Text>
        </View>

        {/* Image Upload Section */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ color: "white", fontSize: 18, marginBottom: 8 }}>
            Photos ({images.length}/5)
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              onPress={pickImage}
              style={{
                width: 48,
                height: 48,
                backgroundColor: "#6B7280",
                borderRadius: 16,
                marginRight: 16,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Text style={{ color: "#3B82F6", fontSize: 24 }}>+</Text>
            </TouchableOpacity>
            {images.map((uri, index) => (
              <View
                key={index}
                style={{ marginRight: 16, position: "relative" }}>
                <Image
                  source={{ uri }}
                  style={{ width: 48, height: 48, borderRadius: 16 }}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  onPress={() => removeImage(index)}
                  style={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    backgroundColor: "#EF4444",
                    borderRadius: 16,
                    width: 24,
                    height: 24,
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Text style={{ color: "white" }}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Place Type Selection */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ color: "white", fontSize: 18, marginBottom: 8 }}>
            Place Type
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
            {PLACE_TYPES.map((type) => (
              <TouchableOpacity
                key={type.label}
                onPress={() => setSelectedType(type.label)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 16,
                  backgroundColor:
                    selectedType === type.label ? "#3B82F6" : "#6B7280",
                }}>
                <type.icon size={16} color="white" />
                <Text style={{ color: "white", marginLeft: 8 }}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Form Fields */}
        <FormField
          title="Place Name"
          value={form.title}
          placeholder="Enter place name"
          handleChangeText={(text) => setForm({ ...form, title: text })}
        />
        <FormField
          title="Address"
          value={form.address}
          placeholder="Enter address"
          handleChangeText={(text) => setForm({ ...form, address: text })}
        />
        <FormField
          title="Description"
          value={form.description}
          placeholder="Enter description"
          handleChangeText={(text) => setForm({ ...form, description: text })}
          multiline
          numberOfLines={4}
        />
        <FormField
          title="Phone Number"
          value={form.phone}
          placeholder="Enter phone number"
          handleChangeText={(text) => setForm({ ...form, phone: text })}
          keyboardType="phone-pad"
        />
        <FormField
          title="Opening Hours"
          value={form.openingHours}
          placeholder="e.g., 09:00 - 22:00"
          handleChangeText={(text) => setForm({ ...form, openingHours: text })}
        />

        {/* Submit Button */}
        <CustomButton
          text={isSubmitting ? "Adding Place..." : "Add Place"}
          onPress={handleSubmit}
          disabled={isSubmitting}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddPlace;
