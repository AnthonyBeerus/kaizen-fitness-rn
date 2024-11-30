import {
  View,
  Text,
  Pressable,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import React, { useEffect } from "react";
import { icon } from "@/constants/icon"; // Ensure this is the correct path
import { ThemedText } from "../ThemedText";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useThemeColor } from "@/hooks/useThemeColor";

// Define a type for the icon object to help TypeScript understand the structure
type IconType = {
  index?: (props: { color: string }) => React.ReactNode;
  explore?: (props: { color: string }) => React.ReactNode;
  Stats?: (props: { color: string }) => React.ReactNode;
  Profile?: (props: { color: string }) => React.ReactNode;
  [key: string]: ((props: { color: string }) => React.ReactNode) | undefined;
};

const ThemedTabBarButton = ({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  color,
  label,
  lightColor,
  darkColor,
}: {
  onPress: (event: GestureResponderEvent) => void;
  onLongPress: (event: GestureResponderEvent) => void;
  isFocused: boolean;
  routeName: string;
  color: string;
  label: string;
  lightColor: string;
  darkColor: string
}) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      {
        duration: 10,
        dampingRatio: 1,
        stiffness: 100,
        overshootClamping: false,
        restDisplacementThreshold: 150,
        restSpeedThreshold: 150,
      }
    );
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.5]);
    const top = interpolate(scale.value, [0, 1], [0, 9]);
    return {
      transform: [{ scale: scaleValue }],
      
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    return {
      opacity,
    };
  });

  const unselectedIconColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "secondaryBrandColorIcon"
  );
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabBarItem}>
      <Animated.View style={animatedIconStyle}>
        {/* Type-safe icon rendering */}
        {(icon as IconType)[routeName] ? (
          (icon as IconType)[routeName]!({
            color: isFocused ? "#e8e5e3" : unselectedIconColor,
          })
        ) : (
          <Text>weee</Text>
        )}
      </Animated.View>
      {/* <Animated.Text
        style={[
          { color: isFocused ? "white" : color, fontSize: 12 },
          animatedTextStyle,
        ]}>
        {label}
      </Animated.Text> */}
    </Pressable>
  );
};

export default ThemedTabBarButton;

const styles = StyleSheet.create({
  tabBarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    borderRadius: 5,
    gap:8
  },
});
