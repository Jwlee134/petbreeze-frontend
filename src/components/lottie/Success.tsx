import React from "react";
import LottieView from "lottie-react-native";
import { rpWidth } from "~/styles";
import { StyleProp, ViewStyle } from "react-native";

const Success = ({ style }: { style?: StyleProp<ViewStyle> }) => (
  <LottieView
    source={require("~/assets/lottie/check.json")}
    autoPlay
    loop={false}
    style={{ width: rpWidth(139), height: rpWidth(139), ...(style as object) }}
  />
);

export default Success;
