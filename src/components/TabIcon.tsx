import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

interface IProps {
  name: string;
  focused: boolean;
  size: number;
  color: string;
}

const TabIcon = ({ name, focused, size, color }: IProps) => (
  <Ionicons
    name={focused ? name : `${name}-outline`}
    size={size}
    color={color}
  />
);

export default TabIcon;
