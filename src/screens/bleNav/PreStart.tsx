import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";

import Device from "~/assets/svg/init/device/device.svg";
import Button from "~/components/common/Button";
import { storageActions } from "~/store/storage";
import MyText from "~/components/common/MyText";
import SafeAreaContainer from "~/components/common/container/SafeAreaContainer";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";
import { rpHeight, rpWidth } from "~/styles";
import { PreStartScreenNavigationProp } from "~/types/navigator";

const TopContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

const BottomContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const PreStart = ({
  navigation,
}: {
  navigation: PreStartScreenNavigationProp;
}) => {
  const dispatch = useDispatch();

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
              navigation.navigate("BluetoothCheck");
            }}>
            네, 있습니다.
          </Button>
          <Button
            backgroundColor="transparent"
            fontColor="rgba(0, 0, 0, 0.5)"
            useCommonMarginBottom
            onPress={() => {
              dispatch(storageActions.setInit("init"));
              navigation.replace("LoggedInNav");
            }}>
            건너뛰기
          </Button>
        </BottomContainer>
      </SidePaddingContainer>
    </SafeAreaContainer>
  );
};

export default PreStart;
