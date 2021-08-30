import React, { useEffect } from "react";
import styled from "styled-components/native";
import Timer from "./Timer";
import Distance from "./Distance";
import Toggle from "./Toggle";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";
import { useAppSelector } from "~/store";
import Button from "../common/Button";

import { Alert, View } from "react-native";
import useBottomSheet from "~/hooks/useBottomSheet";
import { WalkMapScreenNavigationProp } from "~/types/navigator";
import MyText from "../common/MyText";
import { rpWidth } from "~/styles";
import SidePaddingContainer from "../common/container/SidePaddingContainer";
import DeviceAvatarCircle from "../common/DeviceAvatarCircle";
import { useNavigation } from "@react-navigation/native";
import { isAndroid, isIos } from "~/utils";
import iosBackgroundTracking from "~/utils/iosBackgroundTracking";
import androidBackgroundTracking from "~/utils/androidBackgroundTracking";

interface IProps {
  handleFinish: () => Promise<void>;
  handleChange: (index: number) => void;
  snapPoints: number[];
}

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
`;

const WalkBottomSheet = ({
  handleFinish,
  handleChange,
  snapPoints,
}: IProps) => {
  const isWalking = useAppSelector(state => state.storage.walk.isWalking);
  const isStopped = useAppSelector(state => state.storage.walk.isStopped);
  const startTime = useAppSelector(state => state.storage.walk.startTime);
  const dispatch = useDispatch();
  const devices = useAppSelector(state => state.device);
  const navigation = useNavigation<WalkMapScreenNavigationProp>();

  const { BottomSheetComponent, sheetRef } = useBottomSheet();

  const handleStop = async () => {
    dispatch(storageActions.setIsWalking(false));
    if (!startTime || Date.now() - new Date(startTime).getTime() < 1000) {
      Alert.alert(
        "경고",
        "1초 미만의 산책은 기록되지 않습니다. 중단하시겠습니까?",
        [
          {
            text: "네",
            onPress: async () => {
              if (!isAndroid) {
                await iosBackgroundTracking.stop();
              }
              dispatch(storageActions.clearWalk());
              navigation.replace("BottomTabNav", {
                initialTab: "StartWalking",
              });
            },
          },
          {
            text: "아니오",
            onPress: () => dispatch(storageActions.setIsWalking(true)),
          },
        ],
      );
      return;
    }
    dispatch(storageActions.setIsStopped(true));
    sheetRef.current?.snapTo(0);
  };

  useEffect(() => {
    if (!isAndroid) {
      const check = async () => {
        const isRunning = await iosBackgroundTracking.isRunning();
        if (isWalking && !isRunning) {
          iosBackgroundTracking.start();
        }
        if (!isWalking && isRunning) {
          iosBackgroundTracking.stop();
        }
      };
      check();
    } else {
      if (isWalking && !androidBackgroundTracking.isRunning()) {
        androidBackgroundTracking.start();
      }
      if (!isWalking && androidBackgroundTracking.isRunning()) {
        androidBackgroundTracking.stop();
      }
    }
  }, [isWalking]);

  useEffect(() => {
    const init = async () => {
      if (isIos) {
        await iosBackgroundTracking.init();
        await iosBackgroundTracking.start();
      } else {
        if (androidBackgroundTracking.isRunning()) return;
        await androidBackgroundTracking.start();
      }
      if (isIos && startTime) return;
      dispatch(storageActions.setIsWalking(true));
      dispatch(storageActions.setStartTime(new Date().toISOString()));
    };
    init();
  }, []);

  return (
    <BottomSheetComponent
      onChange={handleChange}
      index={1}
      snapPoints={snapPoints}>
      <SidePaddingContainer>
        {isStopped && startTime ? (
          <MyText
            fontSize={18}
            fontWeight="medium"
            style={{ textAlign: "center" }}>
            {/* {format(
              new Date(store.getState().storage.walk.startTime),
              "yyyy년 M월 d일의 산책",
            )} */}
          </MyText>
        ) : null}
        {isStopped && (
          <View style={{ marginVertical: rpWidth(19) }}>
            <DeviceAvatarCircle isWalk battery={devices[0].battery} />
          </View>
        )}
        <RowContainer>
          <Timer />
          <Distance />
        </RowContainer>
        {!isStopped && <Toggle handleStop={handleStop} />}
        {isStopped && (
          <Button style={{ marginTop: rpWidth(19) }} onPress={handleFinish}>
            산책 종료
          </Button>
        )}
      </SidePaddingContainer>
    </BottomSheetComponent>
  );
};

export default WalkBottomSheet;
