import React from "react";
import LottieView from "lottie-react-native";

const Fail = () => (
  <LottieView
    source={require("~/assets/lottie/fail.json")}
    autoPlay
    loop={false}
    style={{ width: 80, height: 80 }}
  />
);

export default Fail;
