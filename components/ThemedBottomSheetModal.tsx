import { View, Text } from 'react-native'
import React, { forwardRef, useCallback, useMemo, useRef, useEffect } from 'react'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

interface Props {
    title: string;
    lightColor?: string;
    darkColor?: string;
}

type Ref = BottomSheetModal;

const ThemedBottomSheetModal = forwardRef<Ref, Props>((props, ref) => {
  const cardBackground = useThemeColor(
    {
      light: props.lightColor,
      dark: props.darkColor,
    },
    "containerBackground" 
  );

  const buttonBackground = useThemeColor(
    {
      light: props.lightColor,
      dark: props.darkColor,
    },
    "background"
  );

  const backgroundColor = useThemeColor(
    {
      light: props.lightColor,
      dark: props.darkColor,
    },
    "background"
  );

  const iconColor = useThemeColor(
    {
      light: props.lightColor,
      dark: props.darkColor,
    },
    "icon"
  );

  // Bottom Sheet Logic
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  useEffect(() => {
    console.log('Modal mounted');
    return () => console.log('Modal unmounted');
  }, []);

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={{ backgroundColor: backgroundColor }}
      handleIndicatorStyle={{ backgroundColor: iconColor }}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      onChange={(index) => console.log('Modal index changed:', index)}
    >
      <ThemedView variant="default" style={{ padding: 16 }}>
        <ThemedText style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
          {props.title}
        </ThemedText>
      </ThemedView>
    </BottomSheetModal>
  );
});

ThemedBottomSheetModal.displayName = 'ThemedBottomSheetModal';

export default ThemedBottomSheetModal;