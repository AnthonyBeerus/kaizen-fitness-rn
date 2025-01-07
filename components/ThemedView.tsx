import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  variant: "default" | "inContainer" | "transparent";
};

export function ThemedView({ style, lightColor, darkColor, variant, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const inContainerColor = useThemeColor({
    light: lightColor,
    dark: darkColor,
    },"containerBackground"
  );
  const transparent = useThemeColor({ light: lightColor, dark: darkColor }, 'transparent');

  return (
    <View
      style={[
        variant === "default"
          ? { backgroundColor: backgroundColor }
          : variant === "inContainer"
          ? { backgroundColor: inContainerColor }
          : { backgroundColor: transparent },

        style,
      ]}
      {...otherProps}
    />
  );
}
