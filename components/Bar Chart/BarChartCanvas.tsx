import React, { useState } from "react";
import { Canvas, Group } from "@shopify/react-native-skia";
import BarPath from "@/components/Bar Chart/BarPath";
import XAxisText from "@/components/Bar Chart/XAxisText";
import { GestureResponderEvent, StyleSheet } from "react-native";
import { withTiming } from "react-native-reanimated";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { Button, Card, IconButton, PaperProvider } from "react-native-paper";
import { useThemeColor } from "@/hooks/useThemeColor";
import AnimatedText from "./AnimatedText";
import { Folder, Weight } from "iconsax-react-native";
import { ThemedMainContainer } from "../containers/ThemedMainContainerx";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

type BarChartCanvasProps = {
  data: { label: string; value: number; day?: string }[];
  progress: any;
  x: (label: string) => number | undefined;
  y: (value: number) => number;
  barWidth: number;
  graphHeight: number;
  canvasWidth: number;
  canvasHeight: number;
  selectedBar: any;
  selectedValue: any;
  totalValue: number;
  setSelectedDay: (day: string) => void;
  lightColor: string,
    darkColor: string,
};

const BarChartCanvas: React.FC<BarChartCanvasProps> = ({
  data,
  progress,
  x,
  y,
  barWidth,
  graphHeight,
  canvasWidth,
  canvasHeight,
  selectedBar,
  selectedValue,
  totalValue,
  setSelectedDay,
    lightColor,
    darkColor,
}) => {

    const cardColor = useThemeColor({ light: lightColor, dark: darkColor }, "containerBackground");
    const inCardColor = useThemeColor({ light: lightColor, dark: darkColor }, "inContainerBackground");
    const iconColor = useThemeColor({ light: lightColor, dark: darkColor }, "icon");
    const inverseButtonColor = useThemeColor(
        {
            light: Colors.dark.background,
            dark: Colors.light.background,
        },
        "text"
        );
    const touchHandler = (e: GestureResponderEvent) => {
    const touchX = e.nativeEvent.locationX;
    const touchY = e.nativeEvent.locationY;

    // Calculate the step size based on the number of data points and canvas width
    const stepSize = canvasWidth / data.length;

    // Calculate the index of the touched bar
    const index = Math.floor((touchX - barWidth / 2) / stepSize);

    // Ensure the index is within bounds
    if (index >= 0 && index < data.length) {
      const { label, value } = data[index];

      // Check if the touch is within the bounds of the touched bar
      if (
        touchX > x(label)! - barWidth / 2 &&
        touchX < x(label)! + barWidth / 2 &&
        touchY > graphHeight - y(value) &&
        touchY < graphHeight
      ) {
        selectedBar.value = label;
        selectedValue.value = withTiming(value); // Update with animation
      } else {
        selectedBar.value = null;
        selectedValue.value = withTiming(0); // Reset value
      }
    }
  };
  const [selsctedDay, setSelsctedDay] = useState<string>("Total");


  return (
    <PaperProvider
      settings={{
        icon: (props) => <Folder {...props} />,
      }}>
      <Card style={[styles.canvas, { backgroundColor: cardColor }]}>
        <Card.Title
          title={<ThemedText type="subtitle">{selsctedDay} Volume</ThemedText>}
          left={(props) => (
            <IconButton
              mode="contained"
              icon={(props) => <Weight {...props} />}
              theme={{ colors: { primary: iconColor } }}
              style={{
                backgroundColor: inCardColor,
                borderRadius: 10,
                marginBottom: 20,
              }}
            />
          )}
        />
        <Card.Content>
          <Canvas
            onTouchStart={touchHandler}
            style={{
              width: canvasWidth,
              height: canvasHeight,
            }}>
            {data.map((dataPoint, index) => (
              <Group key={index}>
                <BarPath
                  progress={progress}
                  x={x(dataPoint.label)!}
                  y={y(dataPoint.value)}
                  barWidth={barWidth}
                  graphHeight={graphHeight}
                  label={dataPoint.label}
                  selectedBar={selectedBar}
                  lightColor={""}
                  darkColor={""}
                />
                <XAxisText
                  x={x(dataPoint.label)!}
                  y={canvasHeight}
                  text={dataPoint.label}
                  selectedBar={selectedBar}
                />
              </Group>
            ))}
          </Canvas>
        </Card.Content>
      </Card>
    </PaperProvider>
  );
};

export default BarChartCanvas;

const styles = StyleSheet.create({
    textSteps: {
        fontSize: 38,
        margin: 25,
    },
    canvas: {
        width: "100%",
        height: 340,
        marginRight: 10,
        elevation: 5,
        borderRadius: 10,
    },
});