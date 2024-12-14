import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";

export const icon = {
  index: (props: any) => (
    <Ionicons name="barbell-outline" size={24} {...props} />
  ),
  explore: (props: any) => (
    <FontAwesome6 name="bowl-food" size={24} {...props} />
  ),
  stats: (props: any) => <FontAwesome6 name="spa" size={24} {...props} />,
  profile: (props: any) => <Ionicons name="person" size={24} {...props} />,
};
