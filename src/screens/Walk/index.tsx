import React from "react";
import WalkTopTabNav from "~/navigator/WalkTopTabNav";
import { useAppSelector } from "~/store";
import SafeAreaContainer from "~/components/common/container/SafeAreaContainer";
import { WalkScreenNavigationProp } from "~/types/navigator";
import { useEffect } from "react";

const Walk = ({ navigation }: { navigation: WalkScreenNavigationProp }) => {
  const coords = useAppSelector(state => state.storage.walk.coords);
  const selectedDeviceId = useAppSelector(
    state => state.storage.walk.selectedDeviceId,
  );

  useEffect(() => {
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
