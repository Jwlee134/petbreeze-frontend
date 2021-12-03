import React, { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native";
import MyText from "~/components/common/MyText";
import CustomHeader from "~/components/navigator/CustomHeader";
import palette from "~/styles/palette";
import { DeviceManagementScreenNavigationProp } from "~/types/navigator";
import Swipeable from "~/components/common/Swipeable";
import Bye from "~/assets/svg/myPage/bye.svg";
import ListItem from "~/components/common/ListItem";
import DeviceManagementItem from "~/components/myPage/DeviceManagementItem";
import SwipeableButton from "~/components/common/SwipeableButton";
import deviceApi from "~/api/device";
import useDevice from "~/hooks/useDevice";
import { useDispatch } from "react-redux";
import { commonActions } from "~/store/common";
import useModal from "~/hooks/useModal";
import Modal from "react-native-modal";
import CommonCenterModal from "~/components/modal/CommonCenterModal";
import Plus from "~/assets/svg/plus/plus-blue.svg";

const DeviceManagement = ({
  navigation,
}: {
  navigation: DeviceManagementScreenNavigationProp;
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [deleteDevice] = deviceApi.useDeleteDeviceMutation();
  const deviceList = useDevice();
  const dispatch = useDispatch();
  const timeout = useRef<NodeJS.Timeout>();
  const [id, setId] = useState(0);
  const { open, close, modalProps } = useModal();

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
      dispatch(commonActions.setAnimateSwipeable(false));
    };
  }, []);

  const onEditButtonPress = () => {
    setIsEdit(prev => !prev);
    dispatch(commonActions.setAnimateSwipeable(true));
    timeout.current = setTimeout(() => {
      dispatch(commonActions.setAnimateSwipeable(false));
    }, 1800);
  };

  const onByeClick = (id: number) => {
    setId(id);
    open();
  };

  return (
    <>
      <CustomHeader
        RightButtonText={
          <MyText color={palette.blue_7b}>{!isEdit ? "편집" : "완료"}</MyText>
        }
        onRightButtonPress={onEditButtonPress}
        navigation={navigation}
        title="기기관리"
      />
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
                onPress={() => onByeClick(device.id)}>
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
              <DeviceManagementItem device={device} />
            </ListItem>
          </Swipeable>
        ))}
        <ListItem
          onPress={() => navigation.navigate("BleRootStackNav")}
          style={{ justifyContent: "center" }}
          showIcon={false}>
          <Plus width={14} height={14} />
        </ListItem>
      </ScrollView>
      <Modal {...modalProps({ type: "center" })}>
        <CommonCenterModal
          close={close}
          title="삭제하시나요?"
          rightButtonText="삭제"
          onRightButtonPress={() => {
            deleteDevice(id);
            close();
          }}
        />
      </Modal>
    </>
  );
};

export default DeviceManagement;
