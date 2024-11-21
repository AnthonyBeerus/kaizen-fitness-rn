import { useRef, type PropsWithChildren, type ReactElement } from "react";
import { StyleSheet, useColorScheme, Text, View } from "react-native";
import { Animated as RNAnimated } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "./ThemedText";

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 100;
const SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

type Props = PropsWithChildren<{
  headerImage?: ReactElement | null;
  headerBackgroundColor: { dark: string; light: string };
  variant?: "default" | "ThemedHeader" | "headerImage"; // Optional variants
  lightColor?: string;
  darkColor?: string;
}>;

export default function ParallaxScrollView({
  children,
  headerImage = null,
  headerBackgroundColor,
  variant = "default",
  lightColor,
  darkColor
}: Props) {
  const colorScheme = useColorScheme() ?? "light";
  const outputRangeColor1 = useThemeColor(
    { light: lightColor, dark: darkColor },
    "containerBackground"
  );
  const outputRangeColor2 = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useRef(new RNAnimated.Value(0)).current;

  const dynamicHeaderStyle = {
    height: scrollY.interpolate({
      inputRange: [0, SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: "clamp",
    }),
    backgroundColor: scrollY.interpolate({
      inputRange: [0, SCROLL_DISTANCE],
      outputRange: [outputRangeColor1, outputRangeColor2], // Example colors
      extrapolate: "clamp",
    }),
  };

  return (
    <ThemedView variant="default" style={styles.container}>
      {/* Dynamic Header for "ThemedHeader" */}
      {variant === "ThemedHeader" && (
        <RNAnimated.View style={[styles.dynamicHeader, dynamicHeaderStyle]}>
          <ThemedText style={styles.headerTitle}>Header Content</ThemedText>
        </RNAnimated.View>
      )}

      {/* Static Header Image for "headerImage" */}
      {variant === "headerImage" && headerImage && (
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
          ]}>
          {headerImage}
        </Animated.View>
      )}

      {/* ScrollView with padding for the header */}
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={5}
        contentContainerStyle={{
          paddingTop: variant === "ThemedHeader" ? HEADER_MAX_HEIGHT : 0, // Offset the content
        }}
        onScroll={RNAnimated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false } // Required for animated header resizing
        )}>
        <ThemedView variant="default" style={styles.content}>
          {children}
        </ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  header: {
    height: HEADER_MAX_HEIGHT,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    padding: 20,
    gap: 16,
    overflow: "hidden",
  },
  dynamicHeader: {
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    right: 0,
    position: "absolute",
    top: 0,
    zIndex: 1,
    paddingTop: 25,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
