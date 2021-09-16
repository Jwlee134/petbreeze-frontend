import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import { storageActions } from "~/store/storage";
import palette from "~/styles/palette";

import { useAppSelector } from "~/store";
import { rpWidth } from "~/styles";

import Camera from "~/assets/svg/walk/camera.svg";
import Play from "~/assets/svg/walk/play.svg";
import Pause from "~/assets/svg/walk/pause.svg";
import Stop from "~/assets/svg/walk/stop.svg";
import StopFill from "~/assets/svg/walk/stop-fill.svg";
import ShadowContainer from "../common/container/ShadowContainer";
import ImageCropPicker from "react-native-image-crop-picker";
import CameraRoll from "@react-native-community/cameraroll";

const RowContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-evenly;
  margin-top: ${rpWidth(30)}px;
`;

const SmallButton = styled.TouchableOpacity`
  width: ${rpWidth(71)}px;
  height: ${rpWidth(71)}px;
  border-radius: ${rpWidth(35.5)}px;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const Button = styled.TouchableOpacity`
  width: ${rpWidth(89)}px;
  height: ${rpWidth(89)}px;
  border-radius: ${rpWidth(44.5)}px;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-width: 2px;
  border-color: ${palette.blue_7b};
`;

const Toggle = ({ handleStop }: { handleStop: () => void }) => {
  const currentPauseTime = useAppSelector(
    state => state.storage.walk.currentPauseTime,
  );
  const isWalking = useAppSelector(state => state.storage.walk.isWalking);
  const dispatch = useDispatch();

  return (
    <RowContainer>
      <ShadowContainer shadowOpacity={0.1} shadowRadius={10}>
        <SmallButton
          onPress={() => {
            if (isWalking) {
              dispatch(
                storageActions.setWalk({
                  isWalking: false,
                  currentPauseTime: new Date().toISOString(),
                }),
              );
            } else {
              handleStop();
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
          onPress={() => {
            if (isWalking) {
              handleStop();
            } else {
              dispatch(
                storageActions.setWalk({
                  isWalking: true,
                }),
              );
              dispatch(
                storageActions.setTotalPauseDuration(
                  Math.floor(
                    (Date.now() - new Date(currentPauseTime).getTime()) / 1000,
                  ),
                ),
              );
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
          onPress={() => {
            ImageCropPicker.openCamera({}).then(image => {
              CameraRoll.save(image.path, { album: "어디개" }).then(() => {
                ImageCropPicker.cleanSingle(image.path);
              });
            });
          }}>
          <Camera width={rpWidth(30)} height={rpWidth(30)} />
        </SmallButton>
      </ShadowContainer>
    </RowContainer>
  );
};

export default Toggle;
