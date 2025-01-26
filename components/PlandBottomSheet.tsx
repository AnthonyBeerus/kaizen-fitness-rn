import React, { forwardRef, useCallback, useMemo } from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { View } from "react-native";

interface Props {
  title: string;
  lightColor?: string;
  darkColor?: string;
}

type Ref = BottomSheetModal;

const PlansBottomSheet = forwardRef<Ref, Props>((props, ref) => {
  const backgroundColor = useThemeColor(
    { light: props.lightColor || "#fff", dark: props.darkColor || "#000" },
    "background"
  );

  const iconColor = useThemeColor(
    { light: props.lightColor || "#ccc", dark: props.darkColor || "#444" },
    "icon"
  );

  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const renderBackdrop = useCallback(
    (backdropProps: any) => (
      <BottomSheetBackdrop
        {...backdropProps}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.3}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={{ backgroundColor }}
      handleIndicatorStyle={{ backgroundColor: iconColor }}
      enablePanDownToClose
      backdropComponent={renderBackdrop}>
      <ThemedView variant="default" style={{ padding: 20 }}>
        <ThemedText style={{ fontSize: 18, fontWeight: "bold" }}>
          {props.title}
        </ThemedText>
        <View style={{ marginTop: 20 }}>
          <ThemedText>Here goes your content</ThemedText>
        </View>
      </ThemedView>
    </BottomSheetModal>
  );
});

PlansBottomSheet.displayName = "PlansBottomSheet";

export default PlansBottomSheet;
