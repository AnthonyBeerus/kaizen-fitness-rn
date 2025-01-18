import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import React from "react";

export const icon = {
  gym: (props: any) => <Ionicons name="barbell-outline" size={24} {...props} />,
  nutrition: (props: any) => (
    <FontAwesome6 name="bowl-food" size={24} {...props} />
  ),
  ai: (props: any) => <Ionicons name="sparkles" size={24} {...props} />,
  wellness: (props: any) => <FontAwesome6 name="spa" size={24} {...props} />,
  account: (props: any) => <Ionicons name="person" size={24} {...props} />,
};
