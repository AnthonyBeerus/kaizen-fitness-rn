import { useThemeColor } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import type { Href } from "expo-router";

interface ThemedButtonProps {
  title: string;
  onPress: () => void;
  href?: Href;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  lightColor?: string;
  darkColor?: string;
  variant?: "primary" | "secondary";
}

const ThemedButton: React.FC<ThemedButtonProps> = ({
  title,
  onPress,
  href,
  disabled = false,
  style,
  textStyle,
  lightColor,
  darkColor,
  variant = "primary",
}) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    variant === "primary" ? "primaryButton" : "secondaryButton"
  );

  const textColor = useThemeColor(
    { light: "#FFFFFF", dark: "#FFFFFF" }, // Default text colors for both modes
    "text"
  );

  const buttonStyles = [
    styles.base,
    { backgroundColor },
    disabled && styles.disabled,
    style, // Allow custom overrides
  ];

  const textStyles = [styles.text, { color: textColor }, textStyle];
  const router = useRouter();

  const handlePress = () => {
    if (href) {
      router.push(href); // Navigate to the specified route
    } else if (onPress) {
      onPress();
    }
  };


  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      style={buttonStyles}>
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.6, // Reduce opacity for disabled state
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ThemedButton;
