import React from "react";
import LottieView from "lottie-react-native";

const Success = () => (
  <LottieView
    source={require("~/assets/lottie/success.json")}
    autoPlay
    loop={false}
    style={{ width: 70 }}
  />
);

export default Success;
