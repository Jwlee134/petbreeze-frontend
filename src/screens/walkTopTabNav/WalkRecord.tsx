import React from "react";
import { FlatList } from "react-native";
import ListItem from "~/components/common/ListItem";
import { WalkRecordScreenNavigationProp } from "~/types/navigator";
import WalkDeviceListItem from "~/components/walk/WalkDeviceListItem";
import useDevice from "~/hooks/useDevice";

const WalkRecord = ({
  navigation,
}: {
  navigation: WalkRecordScreenNavigationProp;
}) => {
  const deviceList = useDevice();
  return (
    <FlatList
      contentContainerStyle={{
        paddingVertical: 20,
        flexGrow: 1,
      }}
      data={deviceList}
      keyExtractor={item => `${item.id}`}
      renderItem={({ item }) => (
        <ListItem
          key={item.id}
          onPress={() =>
            navigation.navigate("WalkDetailMonth", {
              deviceID: item.id,
              avatarUrl: item.profile_image,
              name: item.name,
            })
          }>
          <WalkDeviceListItem device={item} />
        </ListItem>
      )}
    />
  );
};

export default WalkRecord;
