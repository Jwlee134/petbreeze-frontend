import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components/native";
import { storageActions } from "~/store/storage";
import palette from "~/styles/palette";

import { useAppSelector } from "~/store";

import Camera from "~/assets/svg/walk/camera.svg";
import Play from "~/assets/svg/walk/play.svg";
import Pause from "~/assets/svg/walk/pause.svg";
import Stop from "~/assets/svg/walk/stop.svg";
import StopFill from "~/assets/svg/walk/stop-fill.svg";
import ShadowContainer from "../common/container/ShadowContainer";
import ImageCropPicker from "react-native-image-crop-picker";
import CameraRoll from "@react-native-community/cameraroll";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import useModal from "~/hooks/useModal";
import Modal from "react-native-modal";
import CommonCenterModal from "../modal/CommonCenterModal";
import { useNavigation } from "@react-navigation/native";
import { WalkMapScreenNavigationProp } from "~/types/navigator";

const RowContainer = styled.View<{ rpWidth: RpWidth }>`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-evenly;
  margin-top: ${({ rpWidth }) => rpWidth(30)}px;
`;

const SmallButton = styled.TouchableOpacity<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    width: ${rpWidth(71)}px;
    height: ${rpWidth(71)}px;
    border-radius: ${rpWidth(35.5)}px;
  `};
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const Button = styled.TouchableOpacity<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    width: ${rpWidth(89)}px;
    height: ${rpWidth(89)}px;
    border-radius: ${rpWidth(44.5)}px;
  `};
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
  const duration = useAppSelector(state => state.storage.walk.duration);
  const isWalking = useAppSelector(state => state.storage.walk.isWalking);
  const dispatch = useDispatch();
  const { rpWidth } = useContext(DimensionsContext);
  const { open, close, modalProps } = useModal();

  const pause = () => {
    dispatch(
      storageActions.setWalk({
        isWalking: false,
        currentPauseTime: new Date().toISOString(),
      }),
    );
  };

  const resume = () => {
    dispatch(
      storageActions.setWalk({
        isWalking: true,
      }),
    );
    dispatch(
      storageActions.setTotalPauseDuration(
        Math.floor((Date.now() - new Date(currentPauseTime).getTime()) / 1000),
      ),
    );
  };

  return (
    <>
      <RowContainer rpWidth={rpWidth}>
        <ShadowContainer shadowOpacity={0.1} shadowRadius={10}>
          <SmallButton
            rpWidth={rpWidth}
            onPress={() => {
              if (isWalking) {
                pause();
              } else {
                open();
              }
            }}>
            {isWalking ? (
              <Pause width={rpWidth(17)} height={rpWidth(21)} />
            ) : (
              <Stop width={rpWidth(24)} height={rpWidth(24)} />
            )}
          </SmallButton>
        </ShadowContainer>
        <ShadowContainer shadowOpacity={0.1} shadowRadius={10}>
          <Button
            rpWidth={rpWidth}
            onPress={() => {
              if (isWalking) {
                pause();
                open();
              } else {
                resume();
              }
            }}>
            {isWalking ? (
              <StopFill width={rpWidth(35)} height={rpWidth(35)} />
            ) : (
              <Play
                width={rpWidth(32)}
                height={rpWidth(40)}
                style={{ marginLeft: rpWidth(4) }}
              />
            )}
          </Button>
        </ShadowContainer>
        <ShadowContainer shadowOpacity={0.1} shadowRadius={10}>
          <SmallButton
            rpWidth={rpWidth}
            onPress={() => {
              ImageCropPicker.openCamera({}).then(image => {
                CameraRoll.save(image.path, { album: "펫브리즈" }).then(() => {
                  ImageCropPicker.cleanSingle(image.path);
                });
              });
            }}>
            <Camera width={rpWidth(30)} height={rpWidth(30)} />
          </SmallButton>
        </ShadowContainer>
      </RowContainer>
      <Modal {...modalProps({ type: "center" })}>
        <CommonCenterModal
          close={() => {
            close();
            resume();
          }}
          rightButtonText="종료"
          title={(() => {
            if (duration < 60) {
              return `1분 미만의 산책은 기록되지 않습니다.\n산책을 종료할까요?`;
            }
            return "산책을 종료할까요?";
          })()}
          onRightButtonPress={() => {
            if (duration < 60) {
              close();
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
                }),
              );
            }

            close();
          }}
        />
      </Modal>
    </>
  );
};

export default Toggle;
