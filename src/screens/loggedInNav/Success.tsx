import React, { useEffect } from "react";
import { View } from "react-native";
import Button from "~/components/common/Button";
import SuccessLottieWithText from "~/components/common/SuccessLottieWithText";
import { SuccessScreenProps } from "~/types/navigator";

const Success = ({
  navigation,
  route: {
    params: { key, text, name, deviceID, avatar, isModify },
  },
}: SuccessScreenProps) => {
  useEffect(() => {
    // 탈퇴
    if (!key) {
      setTimeout(() => {
        navigation.reset({ index: 0, routes: [{ name: "Start" }] });
      }, 1700);
    }
  }, [key]);

  return (
    <SuccessLottieWithText
      text={text}
      Buttons={
        key && name && deviceID && avatar ? (
          <View>
            <Button
              style={{ marginBottom: 12 }}
              onPress={() =>
                isModify
                  ? navigation.goBack()
                  : navigation.replace("MissingReportInfo", {
                      deviceID,
                      name,
                      avatar,
                    })
              }>
              확인하러 가기
            </Button>
            <Button
              onPress={() => navigation.goBack()}
              useCommonMarginBottom
              useBottomInset
              backgroundColor="white"
              fontColor="rgba(0, 0, 0, 0.5)">
              완료
            </Button>
          </View>
        ) : undefined
      }
    />
  );
};

export default Success;
