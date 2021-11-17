import React, { useContext } from "react";
import { ScrollView } from "react-native";
import ListItem from "~/components/common/ListItem";
import { WalkRecordScreenNavigationProp } from "~/types/navigator";
import { DimensionsContext } from "~/context/DimensionsContext";
import { Device } from "~/api/device";
import WalkDeviceListItem from "~/components/walk/WalkDeviceListItem";

const WalkRecord = ({
  navigation,
  deviceList,
}: {
  navigation: WalkRecordScreenNavigationProp;
  deviceList: Device[];
}) => {
  const { rpHeight } = useContext(DimensionsContext);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: rpHeight(31),
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={false}>
      {deviceList.map(device => (
        <ListItem
          key={device.id}
          onPress={() =>
            navigation.navigate("WalkDetailMonth", {
              deviceID: device.id,
              avatarUrl: device.profile_image,
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
