import React from "react";
import LottieView from "lottie-react-native";

const Confetti = () => (
  <LottieView
    source={require("~/assets/lottie/confetti.json")}
    autoPlay
    loop={false}
    style={{ zIndex: -100 }}
  />
);

export default Confetti;
