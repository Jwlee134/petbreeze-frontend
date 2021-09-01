import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";

import Device from "~/assets/svg/init/device/device.svg";
import Button from "../common/Button";
import { storageActions } from "~/store/storage";
import useDisableButton from "~/hooks/useDisableButton";
import MyText from "../common/MyText";
import SafeAreaContainer from "../common/container/SafeAreaContainer";
import SidePaddingContainer from "../common/container/SidePaddingContainer";
import { rpHeight, rpWidth } from "~/styles";
import { useEffect } from "react";

const TopContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

const BottomContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const PreStart = ({ next }: { next: () => void }) => {
  const dispatch = useDispatch();
  const { disabled, disable } = useDisableButton();

  useEffect(() => {
    console.log("prestart");
  }, []);

  return (
    <SafeAreaContainer>
      <SidePaddingContainer style={{ flex: 1 }}>
        <TopContainer>
          <Device width={rpWidth(100)} height={rpHeight(156)} />
          <MyText
            fontSize={24}
            style={{
              marginTop: rpHeight(56),
              textAlign: "center",
            }}>
            디바이스가{"\n"}있으신가요?
          </MyText>
        </TopContainer>
        <BottomContainer>
          <Button
            style={{
              marginBottom: 12,
            }}
            onPress={() => {
              if (disabled) return;
              next();
              disable();
            }}>
            네, 있습니다.
          </Button>
          <Button
            backgroundColor="transparent"
            fontColor="rgba(0, 0, 0, 0.5)"
            useCommonMarginBottom
            onPress={() => {
              dispatch(storageActions.setInit("init"));
            }}>
            건너뛰기
          </Button>
        </BottomContainer>
      </SidePaddingContainer>
    </SafeAreaContainer>
  );
};

export default React.memo(PreStart);
