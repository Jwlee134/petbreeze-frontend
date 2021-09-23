import React, { useContext, useEffect } from "react";
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
import DeviceAvatarCircle from "../common/DeviceAvatarCircle";
import { useNavigation } from "@react-navigation/native";
import backgroundTracking from "~/utils/backgroundTracking";
import { navigatorActions } from "~/store/navigator";
import { DimensionsContext } from "~/context/DimensionsContext";

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
  const { rpWidth } = useContext(DimensionsContext);
  const isWalking = useAppSelector(state => state.storage.walk.isWalking);
  const isStopped = useAppSelector(state => state.storage.walk.isStopped);
  const startTime = useAppSelector(state => state.storage.walk.startTime);
  const dispatch = useDispatch();
  const devices = useAppSelector(state => state.device);
  const navigation = useNavigation<WalkMapScreenNavigationProp>();

  const { BottomSheetComponent, sheetRef } = useBottomSheet();

  const handleStop = async () => {
    dispatch(
      storageActions.setWalk({
        isWalking: false,
      }),
    );
    if (!startTime || Date.now() - new Date(startTime).getTime() < 1000) {
      Alert.alert(
        "경고",
        "1초 미만의 산책은 기록되지 않습니다. 중단하시겠습니까?",
        [
          {
            text: "네",
            onPress: async () => {
              dispatch(storageActions.setWalk(null));
              dispatch(
                navigatorActions.setInitialRoute({
                  initialBottomTabNavRouteName: "HomeTab",
                }),
              );
              navigation.replace("BottomTabNav");
            },
          },
          {
            text: "아니오",
            onPress: () =>
              dispatch(
                storageActions.setWalk({
                  isWalking: true,
                }),
              ),
          },
        ],
      );
      return;
    }
    dispatch(
      storageActions.setWalk({
        isStopped: true,
      }),
    );
    sheetRef.current?.snapTo(0);
  };

  useEffect(() => {
    if (isWalking && !backgroundTracking.isRunning()) {
      backgroundTracking.start();
    }
    if (!isWalking && backgroundTracking.isRunning()) {
      backgroundTracking.stop();
    }
  }, [isWalking]);

  useEffect(() => {
    const init = async () => {
      if (backgroundTracking.isRunning()) return;
      await backgroundTracking.start();
      dispatch(
        storageActions.setWalk({
          isWalking: true,
          startTime: new Date().toISOString(),
        }),
      );
    };
    init();
  }, []);

  return (
    <BottomSheetComponent
      onChange={handleChange}
      index={1}
      snapPoints={snapPoints}>
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
          <DeviceAvatarCircle
            lineWidth={10}
            circleWidth={70}
            battery={devices[0].battery}
          />
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
    </BottomSheetComponent>
  );
};

export default WalkBottomSheet;
