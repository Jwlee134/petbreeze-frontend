import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { isAndroid } from "~/utils";

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
        height: "100%",
        position: "absolute",
        top: isAndroid ? "-15%" : "-10%",
      }}
      ref={ref}
      source={require("~/assets/lottie/confetti.json")}
      autoPlay
    />
  );
};

export default Confetti;
