import React, { memo, useEffect, useState } from "react";
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
import { consonantResponder, delay } from "~/utils";
import Toast from "react-native-toast-message";
import { ToastType } from "~/styles/toast";
import styled from "styled-components/native";
import Switch from "./Switch";

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

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
  const [draft, setDraft] = useState<Device[]>([]);
  const [isSelected, setIsSelected] = useState(false);
  const [update, { isLoading: isUpdatingSetting }] =
    deviceApi.useUpdateCollectionPeriodMutation();

  const isLoading = isUpdatingSetting || isStoppingWalk;

  useEffect(() => {
    if (deviceList.length) setDraft(deviceList);
  }, [deviceList]);

  const resetAndClose = async () => {
    close();
    await delay(centerModalOutTiming);
    if (resume) resume();
    setIsSelected(false);
  };

  const sendRequest = async (list: { id: number; value: number }[]) => {
    const results = await allSettled(
      list.map(item => update({ deviceID: item.id, period: item.value })),
    );
    if (
      results.some(
        result => result.status === "rejected" && result.reason.status === 400,
      )
    ) {
      const rejectedNames = list
        .filter((item, i) => results[i].status === "rejected")
        .map(
          item =>
            deviceList[deviceList.findIndex(device => device.id === item.id)]
              .name,
        )
        .join(", ");
      Toast.show({
        type: ToastType.Error,
        text1: "최근에 다른 멤버가 설정을 변경했나요?",
        text2: `${rejectedNames}${consonantResponder(
          rejectedNames,
        )}의 모드를 변경할 수 없습니다.`,
      });
    } else {
      Toast.show({
        type: ToastType.Notification,
        text1: "성공적으로 변경되었습니다.",
      });
      if (list.some(item => item.value === 1) && quitWalk) {
        quitWalk(close);
      } else {
        resetAndClose();
      }
    }
  };

  const onRightButtonPress = async () => {
    if (isLoading) return;
    const listToChange = draft
      .filter(
        (device, i) =>
          device.collection_period !== deviceList[i].collection_period,
      )
      .map(device => ({ id: device.id, value: device.collection_period }));
    if (isSelected) {
      sendRequest(listToChange);
      return;
    }
    if (!listToChange.length) {
      resetAndClose();
      return;
    }
    if (listToChange.some(item => item.value === 1)) {
      setIsSelected(true);
    } else {
      sendRequest(listToChange);
    }
  };

  const onListItemPress = (currentID: number) => {
    setDraft(prev =>
      prev.map(device => {
        if (device.id === currentID) {
          const originalPeriod =
            deviceList[deviceList.findIndex(device => device.id === currentID)]
              .collection_period;
          const period = () => {
            if (originalPeriod === 1) {
              // 처음부터 활성화 상태였다면 비활성화할 때 300으로 설정
              return device.collection_period === 1 ? 300 : 1;
            }
            // 처음부터 비활성화 상태였다면 활성화 후 비활성화할 때 기존의 주기로 설정
            return device.collection_period === 1 ? originalPeriod : 1;
          };
          return { ...device, collection_period: period() };
        }
        return device;
      }),
    );
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
          onBackButtonPress: () => {
            setDraft(deviceList);
            resetAndClose();
          },
          onBackdropPress: () => {
            setDraft(deviceList);
            resetAndClose();
          },
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
              Live 모드 변경
            </MyText>
            <ScrollView style={{ width: "100%", maxHeight: 236 }}>
              {draft.map(device => (
                <ListItem
                  key={device.id}
                  style={{ height: 67, backgroundColor: "transparent" }}
                  showIcon={false}>
                  <RowContainer
                    style={{ justifyContent: "space-between", width: "100%" }}>
                    <RowContainer>
                      <AnimatedCircularProgress
                        avatar={device.profile_image}
                        circleWidth={54}
                        lineWidth={2}
                        battery={device.battery}
                      />
                      <MyText
                        style={{ marginHorizontal: 13.5, maxWidth: 50 }}
                        numberOfLines={1}
                        fontWeight="medium">
                        {device.name}
                      </MyText>
                      <MyText color={palette.blue_7b} fontSize={12}>
                        {device.battery || 0}%
                      </MyText>
                    </RowContainer>
                    <Switch
                      isOn={device.collection_period === 1}
                      onToggle={() => onListItemPress(device.id)}
                      isLiveToggle
                    />
                  </RowContainer>
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
