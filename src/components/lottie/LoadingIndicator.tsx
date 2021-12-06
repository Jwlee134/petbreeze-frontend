import React from "react";
import LottieView from "lottie-react-native";

const LoadingIndicator = ({ size }: { size: number }) => (
  <LottieView
    source={require("~/assets/lottie/loading.json")}
    autoPlay
    loop
    style={{ width: size, height: size }}
  />
);

export default LoadingIndicator;
