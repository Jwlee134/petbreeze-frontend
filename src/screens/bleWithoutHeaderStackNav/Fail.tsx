import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import Button from "~/components/common/Button";
import MyText from "~/components/common/MyText";
import { useAppSelector } from "~/store";
import { FailScreenNavigationProp } from "~/types/navigator";
import Exclamation from "~/assets/svg/exclamation/exclamation-mark-gray.svg";
import { View } from "react-native";
import { bleActions } from "~/store/ble";
import { navigatorActions } from "~/store/navigator";
import { DimensionsContext } from "~/context/DimensionsContext";

const TopContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

const BottomContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

const Fail = ({ navigation }: { navigation: FailScreenNavigationProp }) => {
  const status = useAppSelector(state => state.ble.status);
  const dispatch = useDispatch();
  const { rpWidth } = useContext(DimensionsContext);

  return (
    <>
      <TopContainer>
        <Exclamation
          width={rpWidth(12)}
          height={rpWidth(58)}
          style={{ marginBottom: rpWidth(112) }}
        />
      </TopContainer>
      <BottomContainer>
        <MyText style={{ textAlign: "center" }} fontSize={24}>
          {status.includes("download")
            ? "다운로드에 실패했어요."
            : status.includes("install")
            ? "펌웨어 설치에 실패했어요."
            : status === "notificationFail"
            ? "디바이스를 재부팅하고\n다시 시도해 주세요."
            : status === "wifiFail"
            ? "WiFi 연결에 실패했어요."
            : ""}
        </MyText>
        <View>
          <Button
            onPress={() => {
              if (status === "downloadingFail") {
                navigation.replace("FirmwareProgress");
                dispatch(bleActions.setStatus("downloadingFirmware"));
              }
              if (
                status === "installingFail" ||
                status === "notificationFail"
              ) {
                navigation.replace("Scanning");
                dispatch(bleActions.setStatus("scanning"));
              }
              if (status === "wifiFail") {
                dispatch(
                  navigatorActions.setInitialRoute({
                    initialBleWithHeaderStackNavRouteName: "WiFiForm",
                  }),
                );
                navigation.replace("BleWithHeaderStackNav");
              }
            }}
            style={{
              marginBottom: rpWidth(12),
            }}>
            다시 시도
          </Button>
          <Button
            onPress={() => {
              if (status === "wifiFail") {
                dispatch(
                  navigatorActions.setInitialRoute({
                    initialBleWithHeaderStackNavRouteName: "PreSafetyZone",
                  }),
                );
              }
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.replace("BleWithHeaderStackNav");
              }
            }}
            useCommonMarginBottom
            useBottomInset
            backgroundColor="transparent"
            fontColor="rgba(0, 0, 0, 0.5)">
            {status === "wifiFail" ? "건너뛰기" : "중단"}
          </Button>
        </View>
      </BottomContainer>
    </>
  );
};

export default Fail;
