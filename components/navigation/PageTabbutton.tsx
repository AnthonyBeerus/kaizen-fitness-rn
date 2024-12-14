import { View, Text, Pressable, LayoutChangeEvent } from 'react-native'
import React, { useState } from 'react'
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export type PageTabButtonType = {
    title: string;
};

type PageTabButtonProps = {
    pageTabbuttons: PageTabButtonType[];
    selectedPageTab: number;
    setSelectedPageTab: (index: number) => void;
};

const PageTabbutton = ({
    pageTabbuttons ,
    selectedPageTab,
    setSelectedPageTab,
}: PageTabButtonProps) => {
    const [dimensions, setDimensions] = useState({ width: 100, height: 20 });

    const pageTabbuttonWidth = dimensions.width / pageTabbuttons.length;

    const pageTabPositionX = useSharedValue(0);

    const onPageTabbarLayout = (event: LayoutChangeEvent) => {
        setDimensions({
            width: event.nativeEvent.layout.width,
            height: event.nativeEvent.layout.height,
        });
    }

    const handlePress = (index: number) => {
        setSelectedPageTab(index);
    }

    const onPageTabPress = (index: number) => {
        pageTabPositionX.value = withTiming(index * pageTabbuttonWidth, {}, () => {
            runOnJS(handlePress)(index);
        });
    }

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: pageTabPositionX.value }],
        };
    });
    return (
      <ThemedView
        style={{
          borderRadius: 10,
          justifyContent: "center",
          paddingVertical: 10,
        }}
        variant={"inContainer"}>
        <Animated.View
          style={[animatedStyle,{
            position: "absolute",
            backgroundColor: "#F04444",
            borderRadius: 10,
            marginHorizontal: 5,
            paddingVertical: 20,
            height: dimensions.height - 10,
            width: pageTabbuttonWidth - 10,
          }]}
        />
        <View
          onLayout={onPageTabbarLayout}
          style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {pageTabbuttons.map((pageTabbuttons, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => onPageTabPress(index)}
                style={{
                  flex: 1,
                  width: pageTabbuttonWidth,
                  paddingVertical: 10,
                }}>
                <ThemedText
                  style={{
                    alignSelf: "center",
                    fontWeight: "600",
                  }}>
                  {pageTabbuttons.title}
                </ThemedText>
              </Pressable>
            );
          })}
        </View>
      </ThemedView>
    );
};

export default PageTabbutton