import React, { useContext } from "react";
import LottieView from "lottie-react-native";
import { StyleProp, ViewStyle } from "react-native";
import { DimensionsContext } from "~/context/DimensionsContext";

const Success = ({ style }: { style?: StyleProp<ViewStyle> }) => {
  const { rpWidth } = useContext(DimensionsContext);

  return (
    <LottieView
      source={require("~/assets/lottie/check.json")}
      autoPlay
      loop={false}
      style={{
        width: rpWidth(139),
        height: rpWidth(139),
        ...(style as object),
      }}
    />
  );
};

export default Success;
