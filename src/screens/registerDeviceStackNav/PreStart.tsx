import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";

import Device from "~/assets/svg/device.svg";
import Button from "~/components/common/Button";
import { storageActions } from "~/store/storage";
import MyText from "~/components/common/MyText";
import SafeAreaContainer from "~/components/common/container/SafeAreaContainer";
import { rpHeight, rpWidth } from "~/styles";
import { PreStartScreenNavigationProp } from "~/types/navigator";
import { useAppSelector } from "~/store";
import CustomHeader from "~/components/navigator/CustomHeader";
import { commonActions } from "~/store/common";

const TopContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

const BottomContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const PreStart = ({ navigation }: PreStartScreenNavigationProp) => {
  const isInitialized = useAppSelector(
    state => state.storage.init.isInitialized,
  );
  const dispatch = useDispatch();

  return (
    <SafeAreaContainer>
      <CustomHeader disableBackButton currentPage={1} totalPage={5} />
      <TopContainer>
        <Device width={rpWidth(100)} height={rpWidth(156)} fill="black" />
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
            marginBottom: 12,
          }}
          onPress={() => {
            navigation.replace("BleProgress");
            dispatch(commonActions.setBleStatus("scanning"));
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
            navigation.replace("LoggedInNav");
          }}>
          건너뛰기
        </Button>
      </BottomContainer>
    </SafeAreaContainer>
  );
};

export default PreStart;
