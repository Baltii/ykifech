import { TouchableOpacity, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface CustomButtonProps {
  text: string;
  leftIcon?: string;
  rightIcon?: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary";
  classNames?: string;
  textClassNames?: string;
}

export default function CustomButton({
  text,
  leftIcon,
  rightIcon,
  onPress,
  disabled,
  variant = "primary",
  classNames,
  textClassNames,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
      style={[
        styles.button,
        variant === "secondary" && styles.buttonSecondary,
        disabled && styles.buttonDisabled,
      ]}
      className={classNames}>
      {leftIcon && (
        <Ionicons
          name={leftIcon}
          size={24}
          color={variant === "primary" ? "#092642" : "#fff"}
          style={styles.leftIcon}
        />
      )}
      <Text
        style={[styles.text, variant === "secondary" && styles.textSecondary]}
        className={textClassNames}>
        {text}
      </Text>
      {rightIcon && (
        <Ionicons
          name={rightIcon}
          size={24}
          color={variant === "primary" ? "#092642" : "#fff"}
          style={styles.rightIcon}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#60a5fa",
  },
  buttonSecondary: {
    backgroundColor: "#1e293b",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  text: {
    color: "#092642",
    fontSize: 16,
    fontFamily: "Outfit-Medium",
  },
  textSecondary: {
    color: "#fff",
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});
