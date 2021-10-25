import React, { useContext, useEffect } from "react";
import { ScrollView } from "react-native";
import ListItem from "~/components/common/ListItem";
import { WalkRecordScreenNavigationProp } from "~/types/navigator";
import { DimensionsContext } from "~/context/DimensionsContext";
import { Device } from "~/api/device";
import WalkDeviceListItem from "~/components/walk/WalkDeviceListItem";
import { useAppSelector } from "~/store";

const WalkRecord = ({
  navigation,
  deviceList,
}: {
  navigation: WalkRecordScreenNavigationProp;
  deviceList: Device[];
}) => {
  const { rpHeight } = useContext(DimensionsContext);
  const { deviceID: initialID } = useAppSelector(
    state => state.navigator.initialWalkRecordParams,
  );

  useEffect(() => {
    if (initialID && deviceList.length) {
      const device =
        deviceList[deviceList.findIndex(device => device.id === initialID)];
      navigation.navigate("WalkDetailMonth", {
        deviceID: device.id,
        avatar: device.profile_image,
        name: device.name,
      });
    }
  }, [initialID, deviceList]);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: rpHeight(31),
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={false}>
      {deviceList.map(device => (
        <ListItem
          key={device.id}
          onPress={() =>
            navigation.navigate("WalkDetailMonth", {
              deviceID: device.id,
              avatar: device.profile_image,
              name: device.name,
            })
          }>
          <WalkDeviceListItem device={device} />
        </ListItem>
      ))}
    </ScrollView>
  );
};

export default WalkRecord;
