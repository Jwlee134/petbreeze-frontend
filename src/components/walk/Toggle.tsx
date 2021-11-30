import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import { storageActions } from "~/store/storage";
import palette from "~/styles/palette";
import { useAppSelector } from "~/store";
import Camera from "~/assets/svg/walk/camera.svg";
import Play from "~/assets/svg/walk/play.svg";
import Pause from "~/assets/svg/walk/pause.svg";
import Stop from "~/assets/svg/walk/stop.svg";
import StopFill from "~/assets/svg/walk/stop-fill.svg";
import ImageCropPicker from "react-native-image-crop-picker";
import CameraRoll from "@react-native-community/cameraroll";
import useModal from "~/hooks/useModal";
import Modal from "react-native-modal";
import CommonCenterModal from "../modal/CommonCenterModal";
import { useNavigation } from "@react-navigation/native";
import { WalkMapScreenNavigationProp } from "~/types/navigator";
import { Shadow } from "react-native-shadow-2";
import deviceApi from "~/api/device";
import allSettled from "promise.allsettled";
import { ActivityIndicator } from "react-native";
import permissionCheck from "~/utils/permissionCheck";

const RowContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-evenly;
  margin-top: 30px;
`;

const SmallButton = styled.TouchableOpacity`
  width: 71px;
  height: 71px;
  border-radius: 35.5px;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const Button = styled.TouchableOpacity`
  width: 89px;
  height: 89px;
  border-radius: 44.5px;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-width: 2px;
  border-color: ${palette.blue_7b};
`;

const Toggle = () => {
  const navigation = useNavigation<WalkMapScreenNavigationProp>();
  const currentPauseTime = useAppSelector(
    state => state.storage.walk.currentPauseTime,
  );
  const selectedID = useAppSelector(
    state => state.storage.walk.selectedDeviceId,
  );
  const duration = useAppSelector(state => state.storage.walk.duration);
  const isWalking = useAppSelector(state => state.storage.walk.isWalking);
  const dispatch = useDispatch();
  const { open, close, modalProps } = useModal();
  const [stopWalking, { isLoading }] = deviceApi.useStopWalkingMutation();

  const pause = () => {
    dispatch(
      storageActions.setWalk({
        isWalking: false,
        currentPauseTime: new Date().toISOString(),
      }),
    );
  };

  const resume = () => {
    dispatch(storageActions.setWalk({ isWalking: true }));
    dispatch(
      storageActions.setTotalPauseDuration(
        Math.floor((Date.now() - new Date(currentPauseTime).getTime()) / 1000),
      ),
    );
  };

  const onLeftButtonPress = () => {
    if (isWalking) pause();
    else open();
  };

  const onCenterButtonPress = () => {
    if (isWalking) {
      pause();
      open();
    } else resume();
  };

  const onCameraPress = () => {
    permissionCheck.camera().then(() => {
      permissionCheck.library().then(() => {
        ImageCropPicker.openCamera({}).then(image => {
          CameraRoll.save(image.path, { album: "펫브리즈" }).then(() => {
            ImageCropPicker.cleanSingle(image.path);
          });
        });
      });
    });
  };

  const onModalClose = () => {
    close();
    resume();
  };

  const onFinishWalking = async () => {
    if (isLoading) return;
    if (duration < 60) {
      await allSettled(selectedID.map(id => stopWalking(id).unwrap()));
      setTimeout(() => {
        dispatch(storageActions.setWalk(null));
      }, 200);
      navigation.replace("BottomTabNav", {
        initialRouteName: "WalkTab",
      });
    } else {
      dispatch(
        storageActions.setWalk({
          isStopped: true,
          sheetIndex: 0,
        }),
      );
    }
    close();
  };

  return (
    <>
      <RowContainer>
        <Shadow
          distance={12}
          startColor="rgba(0, 0, 0, 0.05)"
          viewStyle={{ borderRadius: 35.5 }}>
          <SmallButton onPress={onLeftButtonPress}>
            {isWalking ? (
              <Pause width={17} height={21} />
            ) : (
              <Stop width={24} height={24} />
            )}
          </SmallButton>
        </Shadow>
        <Shadow
          distance={12}
          startColor="rgba(0, 0, 0, 0.05)"
          viewStyle={{ borderRadius: 44.5 }}>
          <Button onPress={onCenterButtonPress}>
            {isWalking ? (
              <StopFill width={35} height={35} />
            ) : (
              <Play width={32} height={40} style={{ marginLeft: 4 }} />
            )}
          </Button>
        </Shadow>
        <Shadow
          distance={12}
          startColor="rgba(0, 0, 0, 0.05)"
          viewStyle={{ borderRadius: 35.5 }}>
          <SmallButton onPress={onCameraPress}>
            <Camera width={30} height={30} />
          </SmallButton>
        </Shadow>
      </RowContainer>
      <Modal {...modalProps({ type: "center" })}>
        <CommonCenterModal
          close={onModalClose}
          rightButtonText={isLoading ? <ActivityIndicator /> : "종료"}
          title={
            duration < 60
              ? `1분 미만의 산책은\n기록되지 않습니다.\n산책을 종료할까요?`
              : "산책을 종료할까요?"
          }
          onRightButtonPress={onFinishWalking}
        />
      </Modal>
    </>
  );
};

export default Toggle;
