import React, { useContext, useState } from "react";
import { FlatList, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DimensionsContext } from "~/context/DimensionsContext";
import { WalkContext } from "~/context/WalkContext";
import { store, useAppSelector } from "~/store";
import { customHeaderHeight, mapButtonSize } from "~/styles/constants";
import AnimatedCircularProgress from "../common/AnimatedCircularProgress";
import Dissolve from "../common/Dissolve";
import MapButton from "../common/MapButton";

const MapButtons = () => {
  const { rpWidth } = useContext(DimensionsContext);
  const { top } = useSafeAreaInsets();
  const isStopped = useAppSelector(state => state.storage.walk.isStopped);
  const [showDevice, setShowDevice] = useState(false);
  const { mapRef, devices } = useContext(WalkContext);

  const animateToMyLocation = () => {
    const coords = store.getState().storage.walk.coords;
    if (!coords.length) return;
    mapRef.current?.animateToCoordinate({
      latitude: coords[coords.length - 1][0],
      longitude: coords[coords.length - 1][1],
    });
  };

  return (
    <>
      <Dissolve
        style={{
          position: "absolute",
          top: top + rpWidth(customHeaderHeight) + rpWidth(26),
          right: rpWidth(16),
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
          top: top + rpWidth(customHeaderHeight),
          right: rpWidth(mapButtonSize + 32),
        }}>
        <FlatList
          data={devices}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <AnimatedCircularProgress
              circleWidth={70}
              lineWidth={5}
              battery={item.battery}
              style={{
                marginLeft: rpWidth(11),
              }}
            />
          )}
          inverted
          showsHorizontalScrollIndicator={false}
          horizontal
          bounces={false}
          style={{
            height: rpWidth(102),
          }}
          contentContainerStyle={{
            alignItems: "center",
          }}
        />
      </Dissolve>
      <Dissolve
        isVisible={!isStopped}
        style={{
          position: "absolute",
          top: top + rpWidth(customHeaderHeight) + rpWidth(86),
          right: rpWidth(16),
        }}>
        <MapButton icon="myLocation" onPress={animateToMyLocation} />
      </Dissolve>
    </>
  );
};

export default MapButtons;
