import React, { useEffect } from "react";
import Button from "~/components/common/Button";
import MyText from "~/components/common/MyText";
import SuccessLottieWithText from "~/components/common/SuccessLottieWithText";
import { useAppSelector } from "~/store";
import { SuccessScreenNavigationProp } from "~/types/navigator";

const Success = ({
  navigation,
}: {
  navigation: SuccessScreenNavigationProp;
}) => {
  const { status } = useAppSelector(state => state.ble);

  useEffect(() => {
    if (status === "connected") {
      setTimeout(() => {
        navigation.replace("BleLoading", {
          loadingText: "로딩중",
        });
      }, 1700);
    }
    if (status === "wifiSuccess") {
      setTimeout(() => {
        navigation.replace("BleWithHeaderStackNav", {
          initialRouteName: "RegisterProfileFirst",
        });
      }, 1700);
    }
  }, [status]);

  const handleNext = () =>
    navigation.replace("BleWithHeaderStackNav", {
      initialRouteName: "PreArea",
    });

  return (
    <SuccessLottieWithText
      isOtaUpdateSuccess
      text={
        status === "connected"
          ? "연결에 성공했어요!"
          : status === "otaUpdateSuccess"
          ? "펌웨어 설치에 성공했어요!"
          : "WiFi 연결이 완료되었어요!"
      }
      Buttons={
        status === "otaUpdateSuccess" ? (
          <>
            <MyText
              style={{ marginTop: 51, textAlign: "center" }}
              color="rgba(0, 0, 0, 0.7)"
              fontSize={14}
              fontWeight="light">
              버튼을 짧게 눌러 디바이스를 재부팅해주세요.
            </MyText>
            <Button useCommonMarginBottom useBottomInset onPress={handleNext}>
              다음
            </Button>
          </>
        ) : undefined
      }
    />
  );
};

export default Success;
