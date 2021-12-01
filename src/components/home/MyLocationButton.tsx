import React, { memo, useEffect, useRef } from "react";
import { Animated } from "react-native";
import { useAppSelector } from "~/store";
import MapButton from "../common/MapButton";

const MyLocationButton = ({
  handleMyLocation,
}: {
  handleMyLocation: () => void;
}) => {
  const address = useAppSelector(state => state.common.home.address);
  const value = useRef(new Animated.Value(0)).current;

  const translateY = value.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -41],
  });

  useEffect(() => {
    Animated.timing(value, {
      toValue: address ? 1 : 0,
      useNativeDriver: true,
      duration: 200,
    }).start();
  }, [address]);

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        marginBottom: 157,
        alignSelf: "flex-end",
        marginRight: 16,
      }}>
      <MapButton onPress={handleMyLocation} icon="myLocation" />
    </Animated.View>
  );
};

export default memo(MyLocationButton);
