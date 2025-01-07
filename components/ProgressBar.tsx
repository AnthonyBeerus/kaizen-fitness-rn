import * as React from "react";
import { ProgressBar, MD3Colors } from "react-native-paper";

const ThemedProgressBar = () => (
  <ProgressBar progress={0.5} color={MD3Colors.error50} />
);

export default ThemedProgressBar;
