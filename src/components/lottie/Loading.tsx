import React from "react";
import LottieView from "lottie-react-native";

const Loading = () => (
  <LottieView
    source={require("~/assets/lottie/loading.json")}
    autoPlay
    loop
    style={{ width: 70 }}
  />
);

export default Loading;
