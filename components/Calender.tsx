import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import moment, { Moment } from "moment";
import Date from "./Date";
import { ThemedView } from "./ThemedView";

// Define prop types for the Calendar component
interface CalendarProps {
  onSelectDate: (date: string) => void; // Function to handle date selection
  selected: string; // Selected date as a string
}

const Calendar: React.FC<CalendarProps> = ({ onSelectDate, selected }) => {
  const [dates, setDates] = useState<Moment[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentMonth, setCurrentMonth] = useState<string | undefined>();

  // Get the dates from today to 30 days from now
  const getDates = () => {
    const _dates: Moment[] = [];
    for (let i = 0; i < 30; i++) {
      const date = moment().add(i, "days");
      _dates.push(date);
    }
    setDates(_dates);
  };

  useEffect(() => {
    getDates();
  }, []);

  return (
    <>
      <ThemedView style={styles.dateSection} variant={"default"}>
        <View style={styles.scroll}>
          <ScrollView 
          horizontal showsHorizontalScrollIndicator={false}>
            {dates.map((date, index) => (
              <Date
                key={index}
                date={date.format("YYYY-MM-DD")}
                onSelectDate={onSelectDate}
                selected={selected}
              />
            ))}
          </ScrollView>
        </View>
      </ThemedView>
    </>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  dateSection: {
    width: "100%",
    paddingTop: 10,
  },
  scroll: {
    height: 120,
  },
});
