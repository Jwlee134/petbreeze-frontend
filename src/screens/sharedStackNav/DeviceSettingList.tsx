import React, { useContext, useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import MyText from "~/components/common/MyText";
import CustomHeader from "~/components/navigator/CustomHeader";
import palette from "~/styles/palette";
import { DeviceSettingListScreenNavigationProp } from "~/types/navigator";
import Swipeable from "~/components/common/Swipeable";
import Bye from "~/assets/svg/myPage/bye.svg";
import ListItem from "~/components/common/ListItem";
import DeviceSettingListItem from "~/components/myPage/deviceSetting/DeviceSettingListItem";
import { DimensionsContext } from "~/context/DimensionsContext";
import SwipeableButton from "~/components/common/SwipeableButton";
import deviceApi from "~/api/device";
import useDevice from "~/hooks/useDevice";

const DeviceSettingList = ({
  navigation,
}: {
  navigation: DeviceSettingListScreenNavigationProp;
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const { rpWidth } = useContext(DimensionsContext);
  const [deleteDevice] = deviceApi.useDeleteDeviceMutation();
  const deviceList = useDevice();

  useEffect(() => {
    if (deviceList && !deviceList.length) {
      navigation.goBack();
    }
  }, [deviceList]);

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
        {deviceList?.map((device, i) => (
          <Swipeable
            animate={i === 0 && isEdit}
            key={device.id}
            RenderRightActions={() => (
              <SwipeableButton
                backgroundColor="red"
                onPress={() => {
                  deleteDevice(device.id);
                }}>
                <Bye width={rpWidth(44)} height={rpWidth(38)} />
              </SwipeableButton>
            )}
            enableRightActions={isEdit}>
            <ListItem
              onPress={() =>
                navigation.navigate("DeviceSetting", {
                  deviceID: device.id,
                  avatar: device.profile_image,
                  name: device.name,
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
