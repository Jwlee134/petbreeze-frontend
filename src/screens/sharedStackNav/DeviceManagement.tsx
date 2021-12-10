import React, { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native";
import CustomHeader from "~/components/navigator/CustomHeader";
import { DeviceManagementScreenNavigationProp } from "~/types/navigator";
import Swipeable from "~/components/common/Swipeable";
import DeviceListItem from "~/components/myPage/DeviceListItem";
import SwipeableButton from "~/components/common/SwipeableButton";
import deviceApi from "~/api/device";
import useDevice from "~/hooks/useDevice";
import { useDispatch } from "react-redux";
import { commonActions } from "~/store/common";
import useModal from "~/hooks/useModal";
import CommonCenterModal from "~/components/modal/CommonCenterModal";
import Plus from "~/assets/svg/plus/plus-blue.svg";
import Minus from "~/assets/svg/minus/minus-white.svg";

const DeviceManagement = ({
  navigation,
}: {
  navigation: DeviceManagementScreenNavigationProp;
}) => {
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

  const onRightbuttonPress = () => {
    navigation.navigate("BleRootStackNav");
  };

  const onByeClick = (id: number) => {
    setId(id);
    open();
  };

  return (
    <>
      <CustomHeader
        RightButtonText={<Plus />}
        onRightButtonPress={onRightbuttonPress}
        navigation={navigation}
        title="기기관리"
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {deviceList?.map((device, i) => (
          <Swipeable
            animate={i === 0}
            key={device.id}
            RenderRightActions={() => (
              <SwipeableButton
                backgroundColor="red"
                onPress={() => onByeClick(device.id)}>
                <Minus />
              </SwipeableButton>
            )}
            enableRightActions>
            <DeviceListItem navigation={navigation} device={device} />
          </Swipeable>
        ))}
      </ScrollView>
      <CommonCenterModal
        modalProps={modalProps}
        close={close}
        title="삭제하시나요?"
        rightButtonText="삭제"
        onRightButtonPress={() => {
          deleteDevice(id);
          close();
        }}
      />
    </>
  );
};

export default DeviceManagement;
