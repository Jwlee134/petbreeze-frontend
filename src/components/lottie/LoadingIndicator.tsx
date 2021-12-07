import React from "react";
import LottieView from "lottie-react-native";

const LoadingIndicator = ({
  size,
  white,
}: {
  size: number;
  white?: boolean;
}) => (
  <LottieView
    source={
      white
        ? require("~/assets/lottie/loading-white.json")
        : require("~/assets/lottie/loading.json")
    }
    autoPlay
    loop
    style={{ width: size, height: size }}
  />
);

export default LoadingIndicator;
