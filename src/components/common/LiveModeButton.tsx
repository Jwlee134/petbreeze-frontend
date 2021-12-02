import React, { memo, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import deviceApi, { Device } from "~/api/device";
import useDevice from "~/hooks/useDevice";
import useModal from "~/hooks/useModal";
import { centerModalOutTiming } from "~/styles/constants";
import palette from "~/styles/palette";
import AnimatedCircularProgress from "./AnimatedCircularProgress";
import ListItem from "./ListItem";
import MapButton from "./MapButton";
import MyText from "./MyText";
import CommonCenterModal from "../modal/CommonCenterModal";
import allSettled from "promise.allsettled";
import { isEndWithConsonant } from "~/utils";
import Toast from "react-native-toast-message";

const LiveModeButton = () => {
  const { top } = useSafeAreaInsets();
  const { open, close, modalProps } = useModal();
  const [selectedIDs, setSelectedIDs] = useState<number[]>([]);
  const [isSelected, setIsSelected] = useState(false);
  const deviceList = useDevice();
  const [update, { isLoading }] = deviceApi.useUpdateDeviceSettingMutation();

  const onRightButtonPress = async () => {
    if (!isSelected) {
      setIsSelected(true);
    } else {
      if (!deviceList) return;
      const results = await allSettled(
        selectedIDs.map(id => update({ deviceID: id, body: { Period: 1 } })),
      );
      if (
        results.some(
          result =>
            result.status === "rejected" && result.reason.status === 400,
        )
      ) {
        const rejectedNames = selectedIDs
          .filter((id, i) => results[i].status === "rejected")
          .map(
            id =>
              deviceList[deviceList.findIndex(device => device.id === id)].name,
          )
          .join(", ");
        Toast.show({
          type: "error",
          text1: "최근에 다른 멤버가 설정을 변경했나요?",
          text2: `${rejectedNames}${
            isEndWithConsonant(rejectedNames) ? "을" : "를"
          } 라이브 모드로 변경할 수 없습니다.`,
        });
      }
      close();
    }
  };

  const onListItemPress = (device: Device) => {
    setSelectedIDs(prev => {
      const copy = [...prev];
      if (copy.includes(device.id)) {
        copy.splice(
          copy.findIndex(id => id === device.id),
          1,
        );
      } else {
        copy.push(device.id);
      }
      return copy;
    });
  };

  const resetAndClose = () => {
    close();
    setTimeout(() => {
      setSelectedIDs([]);
      setIsSelected(false);
    }, centerModalOutTiming);
  };

  return (
    <>
      <MapButton
        onPress={open}
        style={{ position: "absolute", right: 16, top: top + 74 }}
        icon="live"
      />
      <Modal
        {...modalProps({
          type: "center",
          onBackdropPress: resetAndClose,
          onBackButtonPress: resetAndClose,
        })}>
        <CommonCenterModal
          title={isSelected ? "잠깐!" : undefined}
          titleFontWeight={isSelected ? "medium" : undefined}
          description={
            isSelected
              ? `실시간 모드에서는\n배터리가 빠르게 소모될 수 있습니다.`
              : undefined
          }
          rightButtonText={isLoading ? <ActivityIndicator /> : "확인"}
          onRightButtonPress={onRightButtonPress}
          close={resetAndClose}>
          {!isSelected ? (
            <>
              <MyText
                fontWeight="medium"
                style={{ marginTop: 25, marginBottom: 18 }}>
                디바이스를 선택해주세요.
              </MyText>
              <ScrollView style={{ width: "100%", maxHeight: 236 }}>
                {deviceList?.map(device => (
                  <ListItem
                    key={device.id}
                    onPress={() => onListItemPress(device)}
                    style={{ width: "100%", height: 67 }}
                    isIconArrow={false}
                    selected={selectedIDs.includes(device.id)}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}>
                      <AnimatedCircularProgress
                        avatar={device.profile_image}
                        circleWidth={54}
                        lineWidth={2}
                        battery={device.battery}
                      />
                      <MyText
                        style={{ marginHorizontal: 13.5 }}
                        fontWeight="medium">
                        {device.name}
                      </MyText>
                      <MyText color={palette.blue_7b} fontSize={12}>
                        {device.battery || 0}%
                      </MyText>
                    </View>
                  </ListItem>
                ))}
              </ScrollView>
              <View style={{ height: 18 }} />
            </>
          ) : null}
        </CommonCenterModal>
      </Modal>
    </>
  );
};

export default memo(LiveModeButton);
