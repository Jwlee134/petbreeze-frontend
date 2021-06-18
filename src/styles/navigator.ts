import { StackNavigationOptions } from "@react-navigation/stack";
import { StyleProp, TextStyle } from "react-native";

export const stackNavScreenOptions: StackNavigationOptions = {
  headerBackTitleVisible: false,
  headerPressColorAndroid: "transparent",
  headerTitleAlign: "center",
};

export const headerTitleStyle: StyleProp<TextStyle> = {
  fontSize: 20,
  fontWeight: "400",
};
