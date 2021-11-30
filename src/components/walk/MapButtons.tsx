import React, { useContext, useState } from "react";
import { FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WalkContext } from "~/context/WalkContext";
import { store, useAppSelector } from "~/store";
import { customHeaderHeight, mapButtonSize } from "~/styles/constants";
import AnimatedCircularProgress from "../common/AnimatedCircularProgress";
import Dissolve from "../common/Dissolve";
import MapButton from "../common/MapButton";

const MapButtons = () => {
  const { top } = useSafeAreaInsets();
  const isStopped = useAppSelector(state => state.storage.walk.isStopped);
  const [showDevice, setShowDevice] = useState(false);
  const { mapRef, deviceList } = useContext(WalkContext);

  const animateToMyLocation = () => {
    const { coords } = store.getState().storage.walk;
    if (!coords.length) return;
    mapRef.current?.animateToCoordinate({
      latitude: coords[coords.length - 1][1],
      longitude: coords[coords.length - 1][0],
    });
  };

  return (
    <>
      <Dissolve
        style={{
          position: "absolute",
          top: top + customHeaderHeight + 26,
          right: 16,
        }}
        isVisible={!isStopped}>
        <MapButton
          icon="footprint"
          onPress={() => setShowDevice(prev => !prev)}
        />
      </Dissolve>
      <Dissolve
        isVisible={showDevice}
        style={{
          position: "absolute",
          top: top + customHeaderHeight,
          right: mapButtonSize + 32,
        }}>
        <FlatList
          data={deviceList}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => (
            <AnimatedCircularProgress
              avatar={item.profile_image}
              circleWidth={70}
              lineWidth={5}
              battery={item.battery}
              style={{ marginLeft: 11 }}
            />
          )}
          inverted
          showsHorizontalScrollIndicator={false}
          horizontal
          bounces={false}
          style={{ height: 102 }}
          contentContainerStyle={{ alignItems: "center" }}
        />
      </Dissolve>
      <Dissolve
        isVisible={!isStopped}
        style={{
          position: "absolute",
          top: top + customHeaderHeight + 86,
          right: 16,
        }}>
        <MapButton icon="myLocation" onPress={animateToMyLocation} />
      </Dissolve>
    </>
  );
};

export default MapButtons;
