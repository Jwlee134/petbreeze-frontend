import React, { useEffect, useState } from "react";
import CustomHeader from "~/components/navigator/CustomHeader";
import { DeviceManagementScreenNavigationProp } from "~/types/navigator";
import MyPageDeviceListItem from "~/components/myPage/MyPageDeviceListItem";
import deviceApi from "~/api/device";
import useDevice from "~/hooks/useDevice";
import useModal from "~/hooks/useModal";
import CommonCenterModal from "~/components/modal/CommonCenterModal";
import Plus from "~/assets/svg/plus/plus-blue.svg";
import { SwipeListView } from "react-native-swipe-list-view";
import HiddenButton from "~/components/common/HiddenButton";
import { HIDDEN_BUTTON_WIDTH } from "~/styles/constants";
import Toast from "react-native-toast-message";
import { TOAST_TYPE } from "~/constants";

const DeviceManagement = ({
  navigation,
}: {
  navigation: DeviceManagementScreenNavigationProp;
}) => {
  const [deleteDevice, { isSuccess }] = deviceApi.useDeleteDeviceMutation();
  const deviceList = useDevice();
  const [id, setId] = useState(0);
  const { open, close, modalProps } = useModal();

  const onRightbuttonPress = () => {
    navigation.navigate("AddDevice");
  };

  useEffect(() => {
    if (isSuccess) {
      Toast.show({
        type: TOAST_TYPE.NOTIFICATION,
        text1: "성공적으로 삭제되었습니다.",
      });
      if (!deviceList.length) {
        navigation.goBack();
      }
    }
  }, [isSuccess, deviceList]);

  return (
    <>
      <CustomHeader
        RightButtonText={<Plus />}
        onRightButtonPress={onRightbuttonPress}
        navigation={navigation}
        title="기기관리"
      />
      {deviceList.length ? (
        <SwipeListView
          disableRightSwipe
          rightOpenValue={-HIDDEN_BUTTON_WIDTH}
          keyExtractor={({ id }) => String(id)}
          previewRowKey={String(deviceList[0].id)}
          data={deviceList}
          renderItem={({ item }) => (
            <MyPageDeviceListItem navigation={navigation} device={item} />
          )}
          renderHiddenItem={({ item }, rowMap) => (
            <HiddenButton
              onPress={() => {
                setId(item.id);
                rowMap[item.id].closeRow();
                open();
              }}
            />
          )}
        />
      ) : null}
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
