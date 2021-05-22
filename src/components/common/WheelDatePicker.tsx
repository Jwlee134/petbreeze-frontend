import React from "react";
import DatePicker, { DatePickerProps } from "react-native-date-picker";
import palette from "~/styles/palette";

interface IProps extends DatePickerProps {}

const WheelDatePicker = ({ ...props }: IProps) => (
  <DatePicker
    androidVariant="iosClone"
    mode="datetime"
    locale="ko"
    maximumDate={new Date()}
    fadeToColor={palette.light_grey}
    {...props}
  />
);

export default WheelDatePicker;
