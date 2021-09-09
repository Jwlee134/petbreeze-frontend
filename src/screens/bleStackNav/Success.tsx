import { useNavigation } from "@react-navigation/core";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import MyText from "~/components/common/MyText";
import SuccessLottie from "~/components/lottie/Success";
import { BleStatus } from "~/store/common";
import { storageActions } from "~/store/storage";
import { BleProgressScreenNavigationProp } from "~/types/navigator";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Success = ({ status }: { status: BleStatus }) => {
  const navigation = useNavigation<BleProgressScreenNavigationProp>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "allSuccess") {
      setTimeout(() => {
        dispatch(storageActions.setDeviceRegistrationStep("device"));
        navigation.replace("PreSafetyZone");
      }, 2000);
    }
  }, [status]);

  return (
    <Container>
      <MyText fontSize={24} fontWeight="medium">
        {status === "scanningSuccess" && "연결에 성공했어요."}
        {status === "otaUpdateSuccess" && "펌웨어 업데이트가\n완료되었습니다."}
        {status === "allSuccess" && <SuccessLottie />}
        {status === "allSuccess" && "디바이스 등록이\n완료되었습니다."}
      </MyText>
    </Container>
  );
};

export default Success;
