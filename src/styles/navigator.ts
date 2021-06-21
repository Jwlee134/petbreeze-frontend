import { StackNavigationOptions } from "@react-navigation/stack";
import palette from "./palette";

export const mainTabHeaderStyle: StackNavigationOptions = {
  headerBackTitleVisible: false,
  headerPressColorAndroid: "transparent",
  headerTitleAlign: "left",
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 24,
    color: palette.blue_6e,
  },
};

export const headerStyle: StackNavigationOptions = {
  headerBackTitleVisible: false,
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontSize: 20,
    fontWeight: "400",
  },
};
