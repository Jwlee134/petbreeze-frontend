import React, { useContext, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import MyText from "~/components/common/MyText";
import SuccessLottie from "~/components/lottie/Success";
import { DimensionsContext } from "~/context/DimensionsContext";
import { useAppSelector } from "~/store";
import { navigatorActions } from "~/store/navigator";
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
  const { rpWidth } = useContext(DimensionsContext);
  const { top } = useSafeAreaInsets();
  const { status, isOtaUpdate } = useAppSelector(state => state.ble);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "connected") {
      setTimeout(() => {
        dispatch(navigatorActions.setLoadingText("Loading"));
        navigation.replace("BleLoading");
      }, 1700);
    }
    if (status === "otaUpdateSuccess") {
      if (isOtaUpdate) {
        /*  */
      } else {
        setTimeout(() => {
          dispatch(
            navigatorActions.setInitialRoute({
              initialBleWithHeaderStackNavRouteName: "PreWiFiForm",
            }),
          );
          navigation.replace("BleWithHeaderStackNav");
        }, 1700);
      }
    }
    if (status === "wifiSuccess") {
      setTimeout(() => {
        dispatch(
          navigatorActions.setInitialRoute({
            initialBleWithHeaderStackNavRouteName: "PreSafetyZone",
          }),
        );
        navigation.replace("BleWithHeaderStackNav");
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
              marginTop: top + rpWidth(99),
            }}>
            연결에 성공했어요.
          </MyText>
          <SuccessLottie style={{ marginBottom: -rpWidth(43) }} />
        </TopContainer>
        <BottomContainer />
      </>
    );
  }

  return (
    <>
      <TopContainer style={{ justifyContent: "flex-end" }}>
        <SuccessLottie style={{ marginBottom: rpWidth(37) }} />
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
