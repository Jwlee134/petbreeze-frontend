import React from "react";
import Picker from "@gregfrench/react-native-wheel-picker";
import { WheelPicker as AndroidPicker } from "react-native-wheel-picker-android";
import { Platform, StyleProp, useWindowDimensions } from "react-native";

interface IProps {
  style?: StyleProp<VizewStyle>;
  data: string[];
  selectedIndex: number;
  onValueChange: (index: number) => void;
}

const WheelPicker = ({ style, data, selectedIndex, onValueChange }: IProps) => {
  const { width } = useWindowDimensions();

  if (Platform.OS === "android") {
    return (
      <AndroidPicker
        style={{
          width,
          height: "100%",
          justifyContent: "center",
          ...(style as object),
        }}
        data={data}
        selectedItemTextSize={17}
        itemTextSize={17}
        selectedItem={selectedIndex}
        onItemSelected={onValueChange}
        selectedItemTextFontFamily=""
        itemTextFontFamily=""
      />
    );
  }

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
      onValueChange={onValueChange}>
      {data.map((item, index) => (
        <Picker.Item key={index} label={String(item)} value={index} />
      ))}
    </Picker>
  );
};

export default WheelPicker;
