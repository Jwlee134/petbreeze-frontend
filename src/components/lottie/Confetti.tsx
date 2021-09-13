import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";

const Confetti = () => {
  const ref = useRef<LottieView>(null);

  useEffect(() => {
    setTimeout(() => {
      ref.current?.pause();
    }, 930);
  }, []);

  return (
    <LottieView
      style={{
        width: "100%",
        height: "50%",
        position: "absolute",
      }}
      ref={ref}
      source={require("~/assets/lottie/confetti.json")}
      autoPlay
    />
  );
};

export default Confetti;
