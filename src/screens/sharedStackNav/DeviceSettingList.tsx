import React, { useEffect, useRef, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import MyText from "~/components/common/MyText";
import CustomHeader from "~/components/navigator/CustomHeader";
import palette from "~/styles/palette";
import { DeviceSettingListScreenNavigationProp } from "~/types/navigator";
import Swipeable from "~/components/common/Swipeable";
import Bye from "~/assets/svg/myPage/bye.svg";
import ListItem from "~/components/common/ListItem";
import DeviceSettingListItem from "~/components/myPage/deviceSetting/DeviceSettingListItem";
import SwipeableButton from "~/components/common/SwipeableButton";
import deviceApi, { Device } from "~/api/device";
import useDevice from "~/hooks/useDevice";
import { useDispatch } from "react-redux";
import { commonActions } from "~/store/common";

const DeviceSettingList = ({
  navigation,
}: {
  navigation: DeviceSettingListScreenNavigationProp;
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [deleteDevice] = deviceApi.useDeleteDeviceMutation();
  const deviceList = useDevice();
  const dispatch = useDispatch();
  const timeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
      dispatch(commonActions.setAnimateSwipeable(false));
    };
  }, []);

  useEffect(() => {
    if (deviceList && !deviceList.length) {
      navigation.goBack();
    }
  }, [deviceList]);

  const onEditButtonPress = () => {
    setIsEdit(prev => !prev);
    dispatch(commonActions.setAnimateSwipeable(true));
    timeout.current = setTimeout(() => {
      dispatch(commonActions.setAnimateSwipeable(false));
    }, 1800);
  };

  const onDeleteDevice = (device: Device) => {
    deleteDevice(device.id);
  };

  return (
    <>
      <CustomHeader
        RightButton={() => (
          <TouchableOpacity onPress={onEditButtonPress}>
            <MyText color={palette.blue_7b}>{!isEdit ? "편집" : "완료"}</MyText>
          </TouchableOpacity>
        )}
        navigation={navigation}>
        기기설정
      </CustomHeader>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 25,
          flexGrow: 1,
        }}>
        {deviceList?.map((device, i) => (
          <Swipeable
            animate={i === 0}
            key={device.id}
            RenderRightActions={() => (
              <SwipeableButton
                backgroundColor="red"
                onPress={() => onDeleteDevice(device)}>
                <Bye width={44} height={38} />
              </SwipeableButton>
            )}
            enableRightActions={isEdit}>
            <ListItem
              onPress={() => {
                navigation.navigate("DeviceSetting", {
                  deviceID: device.id,
                  avatar: device.profile_image,
                  name: device.name,
                });
              }}>
              <DeviceSettingListItem device={device} />
            </ListItem>
          </Swipeable>
        ))}
      </ScrollView>
    </>
  );
};

export default DeviceSettingList;
