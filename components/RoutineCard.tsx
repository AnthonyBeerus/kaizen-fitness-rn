import React from "react";
import { View, Image } from "react-native";
import { Card, Button, IconButton } from "react-native-paper";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Bookmark, Star, Timer1 } from "iconsax-react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Routine } from "@/db/FitnessData/fitnessSchema";

interface RoutineCardProps {
  routine: Routine;
  localImage: any; // Use appropriate type for your image
}

export const RoutineCard: React.FC<RoutineCardProps> = ({
  routine,
  localImage,
}) => {
  // Theme color hooks
  const cardBackground = useThemeColor(
    {
      light: Colors.light.card,
      dark: Colors.dark.card,
    },
    "containerBackground"
  );

  const buttonBackground = useThemeColor(
    {
      light: Colors.light.card,
      dark: Colors.dark.card,
    },
    "background"
  );

  const iconColor = useThemeColor(
    {
      light: Colors.light.card,
      dark: Colors.dark.card,
    },
    "icon"
  );

  return (
    <ThemedView variant={"default"}>
      <Card
        style={{
          backgroundColor: cardBackground,
          justifyContent: "space-between",
        }}>
        <Card.Content
          style={{
            flexDirection: "row",
            gap: 10,
            justifyContent: "space-evenly",
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}>
            <Image
              source={localImage}
              style={{
                width: 80,
                height: 80,
                borderRadius: 20,
                flex: 1,
                paddingRight: 40,
              }}
            />
          </View>
          <ThemedView
            variant={"inContainer"}
            style={{ justifyContent: "center", gap: 20 }}>
            <ThemedText type="subtitle">{routine.name}</ThemedText>
            <ThemedView
              variant={"inContainer"}
              style={{ flexDirection: "row", gap: 10, flexWrap: "wrap", flex: 1 }}>
              <Button
                icon={(props) => <Star {...props} />}
                theme={{ colors: { primary: "#F04444" } }}
                style={{
                  backgroundColor: buttonBackground,
                  borderRadius: 10,
                }}
                onPress={() =>
                  console.log("Open library of Advanced Workouts")
                }>
                <ThemedText>{routine.difficulty_level}</ThemedText>
              </Button>
              <Button
                icon={(props) => <Timer1 {...props} />}
                theme={{ colors: { primary: "#F04444" } }}
                style={{
                  backgroundColor: buttonBackground,
                  borderRadius: 10,
                }}
                onPress={() => console.log("Open Similarly timed workouts")}>
                <ThemedText>{routine.estimated_weeks} weeks</ThemedText>
              </Button>
            </ThemedView>
          </ThemedView>
          <IconButton
            icon={(props) => <Bookmark {...props} />}
            iconColor={iconColor}
            size={30}
            onPress={() => console.log("Start Suggested Workout")}
          />
        </Card.Content>
      </Card>
    </ThemedView>
  );
};
