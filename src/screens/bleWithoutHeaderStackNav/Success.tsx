import React, { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import MyText from "~/components/common/MyText";
import SuccessLottie from "~/components/lottie/Success";
import { useAppSelector } from "~/store";
import { SuccessScreenNavigationProp } from "~/types/navigator";

const TopContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

const BottomContainer = styled.View`
  flex: 1;
`;

const Success = ({
  navigation,
}: {
  navigation: SuccessScreenNavigationProp;
}) => {
  const { top } = useSafeAreaInsets();
  const { status, isOtaUpdate } = useAppSelector(state => state.ble);

  useEffect(() => {
    if (status === "connected") {
      setTimeout(() => {
        navigation.replace("BleLoading", {
          loadingText: "Loading",
        });
      }, 1700);
    }
    if (status === "otaUpdateSuccess") {
      if (isOtaUpdate) {
        /*  */
      } else {
        setTimeout(() => {
          navigation.replace("BleWithHeaderStackNav", {
            initialRouteName: "PreWiFiForm",
          });
        }, 1700);
      }
    }
    if (status === "wifiSuccess") {
      setTimeout(() => {
        navigation.replace("BleWithHeaderStackNav", {
          initialRouteName: "PreSafetyZone",
        });
      }, 1700);
    }
  }, [status]);

  if (status === "connected") {
    return (
      <>
        <TopContainer>
          <MyText
            fontWeight="medium"
            fontSize={24}
            style={{
              marginTop: top + 99,
            }}>
            연결에 성공했어요.
          </MyText>
          <SuccessLottie style={{ marginBottom: -43 }} />
        </TopContainer>
        <BottomContainer />
      </>
    );
  }

  return (
    <>
      <TopContainer style={{ justifyContent: "flex-end" }}>
        <SuccessLottie style={{ marginBottom: 37 }} />
      </TopContainer>
      <BottomContainer>
        <MyText style={{ textAlign: "center" }} fontSize={24}>
          {status === "wifiSuccess"
            ? "WiFi 연결이\n완료되었습니다."
            : "펌웨어 업데이트가\n완료되었습니다."}
        </MyText>
      </BottomContainer>
    </>
  );
};

export default Success;
