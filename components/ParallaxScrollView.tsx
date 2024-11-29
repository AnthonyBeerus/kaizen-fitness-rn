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
import { ThemedMainContainer } from "./containers/ThemedMainContainerx";
import ThemedButton from "./ThemedButton";
import { Button, IconButton, Title } from "react-native-paper";

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 120;
const SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

type Props = PropsWithChildren<{
  headerImage?: ReactElement | null;
  headerBackgroundColor: { dark: string; light: string };
  variant?: "default" | "ThemedHeader" | "headerImage" | "staticHeader"; // Optional variants
  lightColor?: string;
  darkColor?: string;
  title?: string;
  subtitle?: string;
}>;

export default function ParallaxScrollView({
  children,
  headerImage = null,
  headerBackgroundColor,
  variant = "default",
  lightColor,
  darkColor,
  title,
  subtitle,
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
          <ThemedText style={styles.headerTitle}>{title}</ThemedText>
          <ThemedText style={styles.headerSubtitle}>{subtitle}</ThemedText>
        </RNAnimated.View>
      )}

      {/* Static Header Image for "headerImage" */}
      {variant === "headerImage" && headerImage && (
        <Animated.View
          style={[
            styles.headerImage,
            { backgroundColor: headerBackgroundColor[colorScheme] },
          ]}>
          {headerImage}
        </Animated.View>
      )}

      {/* Static Header for "staticHeader" */}
      {variant === "staticHeader" && (
        <ThemedView
          variant="default"
          style={[styles.staticHeader, { backgroundColor: outputRangeColor2 }]}>
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              <ThemedText style={styles.headerTitle}>{title}</ThemedText>
              <ThemedText style={styles.headerSubtitle}>{subtitle}</ThemedText>
            </View>
            <ThemedView
              style={styles.headerRight}
              variant={"inContainer"}></ThemedView>
          </View>
        </ThemedView>
      )}

      {/* ScrollView with padding for the header */}
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={5}
        contentContainerStyle={{
          paddingTop:
            variant === "ThemedHeader"
              ? HEADER_MAX_HEIGHT
              : variant === "staticHeader"
              ? HEADER_MIN_HEIGHT
              : 0, // Offset the content
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
  headerImage: {
    height: HEADER_MAX_HEIGHT,
    overflow: "hidden",
  },
  staticHeader: {
    justifyContent: "space-between",
    paddingVertical: 40,
    paddingHorizontal: 20,
    left: 0,
    right: 0,
    position: "absolute",
    top: 0,
    zIndex: 1,
    height: HEADER_MIN_HEIGHT, // Set height for static header
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
  headerSubtitle: {
    fontSize: 16,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  headerLeft: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "green",
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  avatarText: {
    fontSize: 16,
  },
});
