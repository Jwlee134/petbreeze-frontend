import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface IProps {
  name: string;
  focused: boolean;
  size: number;
  color: string;
  type: "Ionicons" | "MaterialCommunityIcons";
}

const TabIcon = ({ name, focused, size, color, type }: IProps) => {
  if (type === "Ionicons") {
    return (
      <Ionicons
        name={focused ? name : `${name}-outline`}
        size={22}
        color={color}
      />
    );
  }
  if (type === "MaterialCommunityIcons") {
    return (
      <MaterialCommunityIcons
        name={focused ? name : `${name}-outline`}
        size={22}
        color={color}
      />
    );
  }
  return null;
};

export default TabIcon;
