import React from "react";
import LottieView from "lottie-react-native";

const Check = () => (
  <LottieView
    source={require("~/assets/lottie/check.json")}
    autoPlay
    loop={false}
    style={{ width: 80, height: 80, position: "absolute" }}
  />
);

export default Check;
