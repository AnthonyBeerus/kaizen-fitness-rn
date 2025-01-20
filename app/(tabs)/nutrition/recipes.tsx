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
import { SearchBar } from 'react-native-screens';
import ThemedSearchbar from '@/components/ThemedSearchbar';

export enum PageTabs {
  Meals,
  Hydration,
  Recipes,
}

export default function Recipes() {

  const [selectedPageTab, setSelectedPageTab] = useState<PageTabs>(
      PageTabs.Meals
    );
    
      const pageTabbuttons: PageTabButtonType[] = [{title: "Meals"},{title:"Hydration"}, {title: "Recipes"}];
    
    
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      variant="headerImage">
      <ThemedView variant={"default"}>
          <ThemedSearchbar/>
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
