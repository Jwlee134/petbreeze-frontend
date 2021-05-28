import { StackNavigationOptions } from "@react-navigation/stack";
import { StyleProp, TextStyle } from "react-native";

export const stackNavScreenOptions: StackNavigationOptions = {
  headerBackTitleVisible: false,
  headerPressColorAndroid: "transparent",
};

export const headerTitleStyle: StyleProp<TextStyle> = {
  fontSize: 22,
  fontWeight: "400",
};
