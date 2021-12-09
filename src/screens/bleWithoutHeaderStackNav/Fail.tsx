import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import Button from "~/components/common/Button";
import GradientContainer from "~/components/common/container/GradientContainer";
import MyText from "~/components/common/MyText";
import { bleActions } from "~/store/ble";
import { FailScreenNavigationProp } from "~/types/navigator";
import Exclamation from "~/assets/svg/exclamation/exclamation-mark-white.svg";
import ParagraphWithCheckCircle from "~/components/common/ParagraphWithCheckCircle";
import { useAppSelector } from "~/store";

const TopContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

const BottomContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const scanningFailText = [
  "디바이스에 파란불이 들어오나요?",
  "디바이스가 가까이에 있나요?",
  "디바이스의 블루투스가 켜져있나요?",
];

const Fail = ({ navigation }: { navigation: FailScreenNavigationProp }) => {
  const status = useAppSelector(state => state.ble.status);
  const { top } = useSafeAreaInsets();
  const dispatch = useDispatch();

  const onRetryPress = () => {
    if (status === "downloadingFail") {
      navigation.replace("FirmwareProgress");
      dispatch(bleActions.setStatus("downloadingFirmware"));
    }
    if (
      status === "installingFail" ||
      status === "notificationFail" ||
      status === "devEUIFail" ||
      status === "scanningFail"
    ) {
      navigation.replace("Scanning");
      dispatch(bleActions.setStatus("scanning"));
    }
    if (status === "wifiFail") {
      navigation.goBack();
    }
  };

  const onAbortPress = () => {
    if (status === "wifiFail") {
      navigation.replace("BleWithHeaderStackNav", {
        initialRouteName: "RegisterProfileFirst",
      });
    } else {
      navigation.goBack();
    }
  };

  return (
    <GradientContainer>
      <TopContainer>
        <Exclamation
          style={{
            ...(status === "scanningFail"
              ? { marginTop: top }
              : { marginBottom: 79 }),
          }}
        />
        {status === "scanningFail" ? (
          <MyText
            fontWeight="medium"
            fontSize={24}
            color="white"
            style={{ textAlign: "center", marginTop: 45, marginBottom: 67 }}>
            연결 실패{"\n"}확인해주세요.
          </MyText>
        ) : (
          <MyText fontWeight="medium" fontSize={24} color="white">
            {status.includes("download")
              ? "다운로드 실패"
              : status.includes("install")
              ? "펌웨어 설치 실패"
              : status.includes("notification")
              ? "디바이스를 재부팅하고\n다시 시도해 주세요."
              : status.includes("wifi")
              ? "WiFi 연결 실패"
              : status === "devEUIFail"
              ? "이미 등록된 디바이스"
              : ""}
          </MyText>
        )}
      </TopContainer>
      <BottomContainer>
        <View>
          {status === "scanningFail"
            ? scanningFailText.map((text, i) => (
                <ParagraphWithCheckCircle key={i} isWhiteBackground={false}>
                  {text}
                </ParagraphWithCheckCircle>
              ))
            : null}
        </View>
        <View>
          <Button
            onPress={onRetryPress}
            backgroundColor="rgba(255, 255, 255, 0.3)"
            style={{ marginBottom: 12 }}>
            다시 시도
          </Button>
          <Button
            onPress={onAbortPress}
            useCommonMarginBottom
            useBottomInset
            backgroundColor="transparent"
            fontColor="rgba(255, 255, 255, 0.5)">
            {status === "wifiFail" ? "건너뛰기" : "중단"}
          </Button>
        </View>
      </BottomContainer>
    </GradientContainer>
  );
};

export default Fail;
