import React, { useEffect, useRef, useState } from "react";
import CustomHeader from "~/components/navigator/CustomHeader";
import { DeviceManagementScreenNavigationProp } from "~/types/navigator";
import DeviceListItem from "~/components/myPage/DeviceListItem";
import deviceApi from "~/api/device";
import useDevice from "~/hooks/useDevice";
import { useDispatch } from "react-redux";
import { commonActions } from "~/store/common";
import useModal from "~/hooks/useModal";
import CommonCenterModal from "~/components/modal/CommonCenterModal";
import Plus from "~/assets/svg/plus/plus-blue.svg";
import { SwipeListView } from "react-native-swipe-list-view";
import HiddenButton from "~/components/common/HiddenButton";
import { hiddenButtonWidth } from "~/styles/constants";

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
    navigation.navigate("AddDevice");
  };

  return (
    <>
      <CustomHeader
        RightButtonText={<Plus />}
        onRightButtonPress={onRightbuttonPress}
        navigation={navigation}
        title="기기관리"
      />
      {deviceList?.length && (
        <SwipeListView
          disableRightSwipe
          rightOpenValue={-hiddenButtonWidth}
          keyExtractor={({ id }) => String(id)}
          previewRowKey={String(deviceList[0].id)}
          previewOpenValue={-hiddenButtonWidth}
          data={deviceList}
          renderItem={({ item }) => (
            <DeviceListItem navigation={navigation} device={item} />
          )}
          renderHiddenItem={({ item }, rowMap) => (
            <HiddenButton
              onPress={() => {
                setId(id);
                rowMap[item.id].closeRow();
                open();
              }}
            />
          )}
        />
      )}
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
