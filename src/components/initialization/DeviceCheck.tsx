import React from "react";
import { useDispatch } from "react-redux";
import { BigText, BottomContainer, Container, TopContainer } from "./Styles";

import Device from "~/assets/svg/initialization/device.svg";
import Button from "../common/Button";
import { storageActions } from "~/store/storage";
import { commonActions } from "~/store/common";

const DeviceCheck = () => {
  const dispatch = useDispatch();

  return (
    <Container>
      <TopContainer>
        <Device />
        <BigText>디바이스가{"\n"}있으신가요?</BigText>
      </TopContainer>
      <BottomContainer flexEnd>
        <Button
          style={{
            marginBottom: 12,
          }}
          background="transparent"
          text="건너뛰기"
          onPress={() =>
            dispatch(storageActions.setInitialization("initialization"))
          }
        />
        <Button
          onPress={() => dispatch(commonActions.setPage("next"))}
          text="등록"
        />
      </BottomContainer>
    </Container>
  );
};

export default DeviceCheck;