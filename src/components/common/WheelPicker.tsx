import React from "react";
import Picker from "@gregfrench/react-native-wheel-picker";
import { StyleProp, useWindowDimensions, ViewStyle } from "react-native";

interface IProps {
  style?: StyleProp<ViewStyle>;
  data: string[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

const WheelPicker = ({
  style,
  data,
  selectedIndex,
  setSelectedIndex,
}: IProps) => {
  const { width } = useWindowDimensions();

  return (
    <Picker
      style={{
        width,
        height: "100%",
        justifyContent: "center",
        ...(style as object),
      }}
      lineColor="#000000"
      itemStyle={{ color: "black", fontSize: 17 }}
      selectedValue={selectedIndex}
      onValueChange={setSelectedIndex}>
      {data.map((item, index) => (
        <Picker.Item key={index} label={String(item)} value={index} />
      ))}
    </Picker>
  );
};

export default WheelPicker;
