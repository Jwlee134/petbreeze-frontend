import React, { useContext, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import MyText from "~/components/common/MyText";
import CustomHeader from "~/components/navigator/CustomHeader";
import { useAppSelector } from "~/store";
import palette from "~/styles/palette";
import { DeviceSettingListScreenNavigationProp } from "~/types/navigator";
import Swipeable from "~/components/common/Swipeable";
import Trashcan from "~/assets/svg/trashcan.svg";
import ListItem from "~/components/common/ListItem";
import DeviceSettingListItem from "~/components/deviceSetting/DeviceSettingListItem";
import { DimensionsContext } from "~/context/DimensionsContext";

const DeviceSettingList = ({
  navigation,
}: {
  navigation: DeviceSettingListScreenNavigationProp;
}) => {
  const devices = useAppSelector(state => state.device);
  const [isEdit, setIsEdit] = useState(false);
  const { rpWidth } = useContext(DimensionsContext);

  return (
    <>
      <CustomHeader
        RightButton={() => (
          <TouchableOpacity onPress={() => setIsEdit(prev => !prev)}>
            <MyText color={palette.blue_7b}>{!isEdit ? "편집" : "완료"}</MyText>
          </TouchableOpacity>
        )}
        navigation={navigation}>
        기기설정
      </CustomHeader>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: rpWidth(25),
          flexGrow: 1,
        }}>
        {devices.map((device, i) => (
          <Swipeable
            animate={i === 0 && isEdit}
            key={device.id}
            onRightButtonPress={() => {}}
            RightButtonIcon={() => <Trashcan />}
            enableRightActions={isEdit}>
            <ListItem
              onPress={() =>
                navigation.navigate("DeviceSetting", {
                  data: device,
                })
              }>
              <DeviceSettingListItem device={device} />
            </ListItem>
          </Swipeable>
        ))}
      </ScrollView>
    </>
  );
};

export default DeviceSettingList;
