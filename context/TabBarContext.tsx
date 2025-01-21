import React, { createContext, useContext, useRef, useState } from 'react';
import { Animated } from 'react-native';

type TabBarContextType = {
  translateY: Animated.Value;
  handleScroll: (event: any) => void;
};

const TabBarContext = createContext<TabBarContextType | undefined>(undefined);

export function TabBarProvider({ children }: { children: React.ReactNode }) {
  const translateY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);

  const handleScroll = (event: any) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    const diff = currentScrollY - lastScrollY.current;
    
    if (diff > 0) { // Scrolling down
      Animated.spring(translateY, {
        toValue: 100,
        useNativeDriver: true,
      }).start();
    } else { // Scrolling up
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
    
    lastScrollY.current = currentScrollY;
  };

  return (
    <TabBarContext.Provider value={{ translateY, handleScroll }}>
      {children}
    </TabBarContext.Provider>
  );
}

export const useTabBar = () => {
  const context = useContext(TabBarContext);
  if (!context) {
    throw new Error('useTabBar must be used within a TabBarProvider');
  }
  return context;
};
