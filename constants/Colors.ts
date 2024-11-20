/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import second from "@/app/modal/second";

const tintColorLight = "#F04444";
const tintColorDark = "#F04444";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#E9EBEC",
    containerBackground: "#D3D7D9",
    tint: tintColorLight,
    icon: "#687076",
    brandColoricon: "#F04444",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    muted: "#d1d0c5",
    primaryButton: "#F04444",
    secondaryButton: "#687076",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    containerBackground: "#1A1A1A",
    tint: tintColorDark,
    icon: "#9BA1A6",
    brandColoricon: "#F04444",
    tabIconDefault: "#F04444",
    tabIconSelected: tintColorDark,
    muted: "#777777",
    primaryButton: "#F04444",
    secondaryButton: "#1A1A1A",
  },
};
