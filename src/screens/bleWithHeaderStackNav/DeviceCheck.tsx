import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";

import Device from "~/assets/svg/device/device.svg";
import Button from "~/components/common/Button";
import { storageActions } from "~/store/storage";
import MyText from "~/components/common/MyText";
import SafeAreaContainer from "~/components/common/container/SafeAreaContainer";
import { useAppSelector } from "~/store";
import { DeviceCheckScreenNavigationProp } from "~/types/navigator";
import { navigatorActions } from "~/store/navigator";
import { DimensionsContext } from "~/context/DimensionsContext";

const TopContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

const BottomContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const DeviceCheck = ({
  navigation,
}: {
  navigation: DeviceCheckScreenNavigationProp;
}) => {
  const isInitialized = useAppSelector(
    state => state.storage.init.isInitialized,
  );
  const dispatch = useDispatch();
  const { rpHeight, rpWidth } = useContext(DimensionsContext);

  return (
    <SafeAreaContainer>
      <TopContainer>
        <Device width={rpWidth(100)} height={rpWidth(156)} />
        <MyText
          fontSize={24}
          style={{
            marginTop: rpHeight(56),
            textAlign: "center",
          }}>
          디바이스가{"\n"}
          {isInitialized ? "가까이 있나요?" : "있으신가요?"}
        </MyText>
      </TopContainer>
      <BottomContainer>
        <Button
          style={{
            marginBottom: rpWidth(12),
          }}
          onPress={() => {
            navigation.replace("ChargingCheck");
          }}
          delay={400}>
          네, 있습니다.
        </Button>
        <Button
          backgroundColor="transparent"
          fontColor="rgba(0, 0, 0, 0.5)"
          useCommonMarginBottom
          onPress={() => {
            dispatch(storageActions.setInit("init"));
            dispatch(
              navigatorActions.setInitialRoute({
                initialLoggedInNavRouteName: "BottomTabNav",
              }),
            );
            navigation.replace("LoggedInNav");
          }}>
          건너뛰기
        </Button>
      </BottomContainer>
    </SafeAreaContainer>
  );
};

export default DeviceCheck;
