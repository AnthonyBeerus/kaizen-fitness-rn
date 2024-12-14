import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import moment from "moment";

import { FC } from "react";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

interface DateProps {
  date: string;
  onSelectDate: (date: string) => void;
  selected: string;
  lightColor?: string;
  darkColor?: string;
}

const Date: FC<DateProps> = ({ date, onSelectDate, selected, lightColor, darkColor }) => {
  /**
   * use moment to compare the date to today
   * if today, show 'Today'
   * if not today, show day of the week e.g 'Mon', 'Tue', 'Wed'
   */
  const day =
    moment(date).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")
      ? "Today"
      : moment(date).format("ddd");
  // get the day number e.g 1, 2, 3, 4, 5, 6, 7
  const dayNumber = moment(date).format("D");

  // get the full date e.g 2021-01-01 - we'll use this to compare the date to the selected date
  const fullDate = moment(date).format("YYYY-MM-DD");

  const selectedDayTextColor = useThemeColor(
    { light: lightColor, dark: lightColor },
    "text"
  );
  const unselectedDayTextColor = useThemeColor(
    { light: darkColor, dark: darkColor },
    "containerBackground"
  );
  
  return (
    <TouchableOpacity
      onPress={() => onSelectDate(fullDate)}
      style={[
        styles.card,
        { backgroundColor: unselectedDayTextColor },
        selected === fullDate && { backgroundColor: "#F04444" },
      ]}>
      <ThemedText
        style={[
          styles.big,
          selected === fullDate && { color: selectedDayTextColor },
        ]}>
        {day}
      </ThemedText>
      <View style={{ height: 10 }} />
      <ThemedText
        type="smallTitle"
        style={[
          
          selected === fullDate && {
            fontWeight: "bold",
            fontSize: 24,
          },
        ]}>
        {dayNumber}
      </ThemedText>
    </TouchableOpacity>
  );
};

export default Date;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignItems: "center",
    height: 90,
    width: 80,
    marginHorizontal: 5,
  },
  big: {
    fontWeight: "bold",
    fontSize: 20,
  },
  medium: {
    fontSize: 16,
  },
});
