import React, { useContext, useEffect, useRef } from "react";
import { Animated } from "react-native";
import { DimensionsContext } from "~/context/DimensionsContext";
import { useAppSelector } from "~/store";
import MapButton from "../common/MapButton";

const MyLocationButton = ({
  handleMyLocation,
}: {
  handleMyLocation: () => void;
}) => {
  const { rpWidth } = useContext(DimensionsContext);
  const address = useAppSelector(state => state.common.home.address);
  const value = useRef(new Animated.Value(0)).current;

  const translateY = value.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -rpWidth(41)],
  });

  useEffect(() => {
    Animated.timing(value, {
      toValue: address ? 1 : 0,
      useNativeDriver: true,
      duration: 200,
    }).start();
  }, [address]);

  return (
    <Animated.View style={{ transform: [{ translateY }] }}>
      <MapButton
        onPress={handleMyLocation}
        icon="myLocation"
        style={{
          marginBottom: rpWidth(157),
          alignSelf: "flex-end",
          marginRight: rpWidth(16),
        }}
      />
    </Animated.View>
  );
};

export default MyLocationButton;
