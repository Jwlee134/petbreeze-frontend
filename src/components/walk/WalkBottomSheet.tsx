import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import Timer from "./Timer";
import Distance from "./Distance";
import Toggle from "./Toggle";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";
import { store, useAppSelector } from "~/store";
import useMyLocation from "~/hooks/useMyLocation";
import Button from "../common/Button";
import BackgroundService from "react-native-background-actions";
import { Alert, View } from "react-native";
import useBottomSheet from "~/hooks/useBottomSheet";
import { WalkMapScreenNavigationProp } from "~/types/navigator";
import { format } from "date-fns";
import MyText from "../common/MyText";
import { rpHeight, rpWidth } from "~/styles";
import SidePaddingContainer from "../common/container/SidePaddingContainer";
import DeviceAvatarCircle from "../common/DeviceAvatarCircle";
import { useNavigation } from "@react-navigation/native";

interface IProps {
  handleFinish: () => Promise<void>;
  handleChange: (index: number) => void;
  snapPoints: number[];
}

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
`;

const options = {
  taskName: "Example",
  taskTitle: "어디개",
  taskDesc: "산책 중입니다...",
  taskIcon: {
    name: "ic_launcher",
    type: "mipmap",
  },
  color: "#ff00ff",
  linkingURI: "petbreeze://walk/map",
};

const WalkBottomSheet = ({
  handleFinish,
  handleChange,
  snapPoints,
}: IProps) => {
  const isStopped = useAppSelector(state => state.storage.walk.isStopped);
  const isWalking = useAppSelector(state => state.storage.walk.isWalking);
  const dispatch = useDispatch();
  const devices = useAppSelector(state => state.device);
  const navigation = useNavigation<WalkMapScreenNavigationProp>();

  const timer = useRef<NodeJS.Timeout>();

  const { BottomSheetComponent, sheetRef } = useBottomSheet();
  const { clearTracking, setCoords } = useMyLocation({ isWalking: true });

  const start = async () => {
    await BackgroundService.start(backgroundTask, options);
  };

  const stop = async () => {
    await BackgroundService.stop();
    clearTracking();
    if (timer.current) {
      clearTimeout(timer.current);
    }
  };

  const handleStop = async () => {
    const startTime = store.getState().storage.walk.startTime;
    dispatch(storageActions.setIsWalking(false));
    if (!startTime || Date.now() - new Date(startTime).getTime() < 1000) {
      Alert.alert(
        "경고",
        "1분 미만의 산책은 기록되지 않습니다. 중단하시겠습니까?",
        [
          {
            text: "네",
            onPress: () => {
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

  const stopwatch = async () => {
    for (
      let i = store.getState().storage.walk.duration;
      BackgroundService.isRunning();
      i++
    ) {
      dispatch(storageActions.setDuration(i));
      await new Promise<void>(resolve => {
        timer.current = setTimeout(() => {
          resolve();
        }, 1000);
      });
    }
  };

  const backgroundTask = async () => {
    await new Promise<void>(() => {
      setCoords()
        .then(trackingId => {
          dispatch(storageActions.setTrackingId(trackingId));
          stopwatch();
        })
        .catch(() => {
          dispatch(storageActions.setIsWalking(false));
          BackgroundService.stop();
        });
    });
  };

  useEffect(() => {
    // 다시 시작
    if (isWalking && !BackgroundService.isRunning()) start();
    // 일시 정지
    if (!isWalking && BackgroundService.isRunning()) stop();
  }, [isWalking]);

  useEffect(() => {
    // 최초 접속 시 자동 시작
    if (
      !BackgroundService.isRunning() &&
      store.getState().storage.walk.didMountInitially
    ) {
      start().then(() => {
        dispatch(storageActions.setDidMountInitially(false));
        dispatch(storageActions.setIsWalking(true));
      });
    }
  }, []);

  return (
    <BottomSheetComponent
      onChange={handleChange}
      index={1}
      snapPoints={snapPoints}>
      <SidePaddingContainer>
        {isStopped && (
          <MyText
            fontSize={18}
            fontWeight="medium"
            style={{ textAlign: "center" }}>
            {format(
              new Date(store.getState().storage.walk.startTime),
              "yyyy년 M월 d일의 산책",
            )}
          </MyText>
        )}
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
