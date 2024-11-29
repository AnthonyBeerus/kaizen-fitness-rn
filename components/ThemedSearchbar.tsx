import { useThemeColor } from "@/hooks/useThemeColor";
import { useNavigation } from "expo-router";
import { ThemedView } from "./ThemedView";
import { Appbar, IconButton, Searchbar } from "react-native-paper";
import { ThemedText } from "./ThemedText";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface ThemedSeacrhbarProps {
  lightColor?: string;
  darkColor?: string;
}


const ThemedSearchbar: React.FC<ThemedSeacrhbarProps> = ({
  lightColor,
  darkColor,
}) => {
  const navigation = useNavigation();

  const iconColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "icon"
  );
  const indicatorColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "brandColor"
  );
  const searchbarColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "containerBackground"
  );

  return (
    <Searchbar
      iconColor={iconColor}
      value=""
      placeholder="Search"
      theme={{ colors: { primary: indicatorColor } }}
      style={[{ backgroundColor: searchbarColor, borderRadius: 10 }]}
    />
  );
};

const styles = StyleSheet.create({
  
});

export default ThemedSearchbar;

