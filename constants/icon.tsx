import { Feather, Ionicons } from "@expo/vector-icons";

export const icon = {
  index: (props: any) => <Ionicons name="home" size={24} {...props} />,
  explore: (props: any) => <Ionicons name="compass" size={24} {...props} />,
  stats: (props: any) => <Feather name="pie-chart" size={24} {...props} />,
  profile: (props: any) => <Ionicons name="person" size={24} {...props} />,
};
