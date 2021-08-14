import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import { storageActions } from "~/store/storage";
import palette from "~/styles/palette";

import { useAppSelector } from "~/store";
import { rpHeight } from "~/styles";

import Camera from "~/assets/svg/walk/camera.svg";
import Play from "~/assets/svg/walk/play.svg";
import Pause from "~/assets/svg/walk/pause.svg";
import Stop from "~/assets/svg/walk/stop.svg";
import StopFill from "~/assets/svg/walk/stop-fill.svg";
import ShadowContainer from "../common/container/ShadowContainer";

const RowContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-evenly;
  margin-top: ${rpHeight(30)}px;
`;

const SmallButton = styled.TouchableOpacity`
  width: ${rpHeight(71)}px;
  height: ${rpHeight(71)}px;
  border-radius: ${rpHeight(35.5)}px;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const Button = styled.TouchableOpacity`
  width: ${rpHeight(89)}px;
  height: ${rpHeight(89)}px;
  border-radius: ${rpHeight(44.5)}px;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-width: 2px;
  border-color: ${palette.blue_7b};
`;

const Toggle = ({ handleStop }: { handleStop: () => void }) => {
  const isWalking = useAppSelector(state => state.storage.walk.isWalking);
  const dispatch = useDispatch();

  return (
    <RowContainer>
      <ShadowContainer shadowOpacity={0.1} shadowRadius={10}>
        <SmallButton
          onPress={() => {
            isWalking
              ? dispatch(storageActions.setIsWalking(false))
              : handleStop();
          }}>
          {isWalking ? (
            <Pause width={rpHeight(17)} height={rpHeight(21)} />
          ) : (
            <Stop width={rpHeight(24)} height={rpHeight(24)} />
          )}
        </SmallButton>
      </ShadowContainer>
      <ShadowContainer shadowOpacity={0.1} shadowRadius={10}>
        <Button
          onPress={() => {
            isWalking
              ? handleStop()
              : dispatch(storageActions.setIsWalking(true));
          }}>
          {!isWalking ? (
            <Play
              width={rpHeight(32)}
              height={rpHeight(40)}
              style={{ marginLeft: rpHeight(4) }}
            />
          ) : (
            <StopFill width={rpHeight(35)} height={rpHeight(35)} />
          )}
        </Button>
      </ShadowContainer>
      <ShadowContainer shadowOpacity={0.1} shadowRadius={10}>
        <SmallButton>
          <Camera width={rpHeight(30)} height={rpHeight(30)} />
        </SmallButton>
      </ShadowContainer>
    </RowContainer>
  );
};

export default Toggle;
