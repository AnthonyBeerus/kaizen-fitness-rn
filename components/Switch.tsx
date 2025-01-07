import * as React from "react";
import { Switch } from "react-native-paper";

const ThemedSwitch = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return <Switch style={{backgroundColor: "green", padding: 0, flex: 1}} value={isSwitchOn} onValueChange={onToggleSwitch} />;
};

export default ThemedSwitch;
