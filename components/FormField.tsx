import icons from "@/constants/icons";
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardTypeOptions,
  ViewStyle,
} from "react-native";

interface FormFieldProps {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: ViewStyle;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  secureTextEntry = false,
  keyboardType,
  autoCapitalize,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = React.useRef<TextInput>(null);

  const isPassword = title.toLowerCase() === "password" || secureTextEntry;

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <View style={[styles.container, otherStyles]}>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
        ]}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#8D99AE"
          onChangeText={handleChangeText}
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          blurOnSubmit={false}
          caretHidden={false}
        />

        {isPassword && (
          <TouchableOpacity
            onPress={handlePasswordToggle}
            style={styles.iconButton}
            activeOpacity={0.7}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
            <View style={styles.iconContainer}>
              <Image
                source={!showPassword ? icons.eye : icons.eyeHide}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputContainer: {
    width: "100%",
    height: 50,
    paddingHorizontal: 16,
    backgroundColor: "#0E1821",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },
  inputContainerFocused: {
    borderColor: "#3b82f6",
    shadowColor: "#3b82f6",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontFamily: "Outfit-Regular",
    fontSize: 16,
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  iconContainer: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default FormField;
