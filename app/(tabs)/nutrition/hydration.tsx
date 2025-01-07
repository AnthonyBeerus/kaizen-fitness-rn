import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import PageTabbutton, { PageTabButtonType } from '@/components/navigation/PageTabbutton';
import { useState } from 'react';
import React from 'react';

export enum PageTabs {
  Meals,
  Hydration,
  Recipes,
}

export default function Hydration() {

  const [selectedPageTab, setSelectedPageTab] = useState<PageTabs>(
      PageTabs.Meals
    );
    
      const pageTabbuttons: PageTabButtonType[] = [{title: "Meals"},{title:"Hydration"}, {title: "Recipes"}];
    
    
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      variant="headerImage">
      <ThemedView variant={"default"}>
          <ThemedText>Hydration</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
