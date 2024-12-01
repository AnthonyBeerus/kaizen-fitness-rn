/* eslint-disable react-native/no-inline-styles */
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

const ThemedFAB = () => {
  const width = useSharedValue(60);
  const height = useSharedValue(60);
  const borderRadius = useSharedValue(50);
  const isOpen = useSharedValue(false);
  const progress = useDerivedValue(() =>
    isOpen.value ? withTiming(1) : withTiming(0)
  );
  const handleOpen = () => {
    if (!isOpen.value) {
      width.value = withTiming(200);
      height.value = withTiming(300);
      borderRadius.value = withTiming(10);
      isOpen.value = true;
    }
  };

  const handleClose = () => {
    if (isOpen.value) {
      width.value = withTiming(60);
      height.value = withTiming(60);
      borderRadius.value = withTiming(50);
      isOpen.value = false;
    }
  };

  const plusIcon = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${progress.value * 45}deg` }],
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: height.value,
      borderRadius:6,
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Pressable
          style={styles.iconContainer}
          onPress={() => {
            handleOpen();
            handleClose();
          }}>
          <Animated.View style={[styles.iconContainer, plusIcon]}>
            <Ionicons name="add" style={styles.icon} size={26} />
          </Animated.View>
        </Pressable>
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="barbell-outline" style={styles.icon} size={26} />
          </View>
          <Text style={styles.text}>New Workout</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="fast-food-outline" style={styles.icon} size={26} />
          </View>
          <Text style={styles.text}>Log Nutrition</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="happy-outline" style={styles.icon} size={26} />
          </View>
          <Text style={styles.text}>Log Mood</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="sparkles-outline" style={styles.icon} size={26} />
          </View>
          <Text style={styles.text}>AI Chat</Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default ThemedFAB;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F04444",
    position: "absolute",
    bottom: 130,
    right: 30,
    overflow: "hidden",
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 26,
    height: 26,
    color: "white",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  text: {
    color: "white",
    fontSize: 18,
  },
});
