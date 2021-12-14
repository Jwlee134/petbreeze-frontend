import React, { memo, useState } from "react";
import { ScrollView, StyleProp, View, ViewStyle } from "react-native";
import deviceApi, { Device } from "~/api/device";
import useModal from "~/hooks/useModal";
import { centerModalOutTiming } from "~/styles/constants";
import palette from "~/styles/palette";
import AnimatedCircularProgress from "./AnimatedCircularProgress";
import ListItem from "./ListItem";
import MapButton from "./MapButton";
import MyText from "./MyText";
import CommonCenterModal from "../modal/CommonCenterModal";
import allSettled from "promise.allsettled";
import { formatNickname } from "~/utils";
import Toast from "react-native-toast-message";
import { ToastType } from "~/styles/toast";

interface Props {
  style?: StyleProp<ViewStyle>;
  resume?: () => void;
  pause?: () => void;
  deviceList: Device[];
  quitWalk?: (close: () => void) => Promise<void>;
  isStoppingWalk?: boolean;
}

const LiveModeButton = ({
  style,
  resume,
  pause,
  deviceList,
  quitWalk,
  isStoppingWalk,
}: Props) => {
  const { open, close, modalProps } = useModal();
  const [selectedIDs, setSelectedIDs] = useState<number[]>([]);
  const [isSelected, setIsSelected] = useState(false);
  const [update, { isLoading: isUpdatingSetting }] =
    deviceApi.useUpdateCollectionPeriodMutation();

  const isLoading = isUpdatingSetting || isStoppingWalk;

  const resetAndClose = () => {
    close();
    setTimeout(() => {
      if (resume) resume();
      setSelectedIDs([]);
      setIsSelected(false);
    }, centerModalOutTiming);
  };

  const onRightButtonPress = async () => {
    if (!isSelected) {
      if (!selectedIDs.length) return;
      setIsSelected(true);
    } else {
      if (!deviceList || isLoading) return;
      const results = await allSettled(
        selectedIDs.map(id => update({ deviceID: id, period: 1 })),
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
          type: ToastType.Error,
          text1: "최근에 다른 멤버가 설정을 변경했나요?",
          text2: `${formatNickname(
            rejectedNames,
          )}를 라이브 모드로 변경할 수 없습니다.`,
        });
      } else {
        if (quitWalk) {
          quitWalk(close);
        } else {
          resetAndClose();
        }
      }
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

  return (
    <>
      <MapButton
        onPress={() => {
          open();
          if (pause) pause();
        }}
        style={style}
        icon="live"
      />
      <CommonCenterModal
        modalProps={modalProps}
        extraProps={{
          onBackButtonPress: resetAndClose,
          onBackdropPress: resetAndClose,
        }}
        title={isSelected ? "잠깐!" : undefined}
        titleFontWeight={isSelected ? "medium" : undefined}
        description={
          isSelected
            ? `실시간 모드에서는\n배터리가 빠르게 소모될 수 있습니다.`
            : undefined
        }
        rightButtonText="확인"
        isLoading={isLoading}
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
                  style={{
                    width: "100%",
                    height: 67,
                    backgroundColor: "transparent",
                  }}
                  isIconArrow={false}
                  selected={selectedIDs.includes(device.id)}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <AnimatedCircularProgress
                      avatar={device.profile_image}
                      circleWidth={54}
                      lineWidth={2}
                      battery={device.battery}
                    />
                    <MyText
                      style={{ marginHorizontal: 13.5 }}
                      fontWeight="medium">
                      {device.name.length > 4
                        ? `${device.name.slice(0, 3)}...`
                        : device.name}
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
    </>
  );
};

export default memo(LiveModeButton);
