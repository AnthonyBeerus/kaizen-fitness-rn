// ScrollContext.tsx
import React, { createContext, useContext, useState } from "react";
import { Animated } from "react-native";

type ScrollContextType = {
  scrollY: Animated.Value;
};

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const scrollY = new Animated.Value(0);

  return (
    <ScrollContext.Provider value={{ scrollY }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
};
