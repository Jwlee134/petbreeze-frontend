import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { StyleProp, ViewStyle } from "react-native";

const Success = ({ style }: { style?: StyleProp<ViewStyle> }) => {
  const ref = useRef<LottieView>(null);

  useEffect(() => {
    setTimeout(() => {
      ref.current?.pause();
    }, 1700);
  }, []);

  return (
    <LottieView
      ref={ref}
      source={require("~/assets/lottie/check.json")}
      autoPlay
      loop={false}
      style={{
        width: 139,
        height: 139,
        ...(style as object),
      }}
    />
  );
};

export default Success;
