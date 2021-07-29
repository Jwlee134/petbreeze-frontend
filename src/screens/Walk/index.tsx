import React from "react";
import WalkTopTabNav from "~/navigator/WalkTopTabNav";
import { store } from "~/store";
import SafeAreaContainer from "~/components/common/container/SafeAreaContainer";
import { WalkScreenNavigationProp } from "~/types/navigator";
import { useEffect } from "react";

const Walk = ({ navigation }: { navigation: WalkScreenNavigationProp }) => {
  useEffect(() => {
    const { coords, selectedDeviceId } = store.getState().storage.walk;
    if (coords.length !== 0) {
      navigation.replace("WalkMap", {
        deviceId: selectedDeviceId,
      });
    }
  }, []);

  return (
    <SafeAreaContainer>
      <WalkTopTabNav />
    </SafeAreaContainer>
  );
};

export default Walk;
