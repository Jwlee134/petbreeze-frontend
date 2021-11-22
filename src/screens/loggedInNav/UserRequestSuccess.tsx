import React, { useEffect } from "react";
import { Linking, View } from "react-native";
import Button from "~/components/common/Button";
import SafeAreaContainer from "~/components/common/container/SafeAreaContainer";
import MyText from "~/components/common/MyText";
import SuccessLottie from "~/components/lottie/Success";
import { UserRequestSuccessScreenProps } from "~/types/navigator";

const Success = ({
  navigation,
  route: {
    params: { key, text },
  },
}: UserRequestSuccessScreenProps) => {
  useEffect(() => {
    // 탈퇴
    if (!key) {
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Start" }],
        });
      }, 1700);
    }
  }, [key]);

  return (
    <SafeAreaContainer
      style={{
        alignItems: "center",
        justifyContent: "space-between",
      }}>
      <MyText style={{ marginTop: 89, textAlign: "center" }} fontSize={24}>
        {text}
      </MyText>
      <SuccessLottie style={{ marginBottom: 30 }} />
      <View style={{ marginBottom: key ? 0 : 89 }}>
        {key ? (
          <>
            <Button
              style={{
                marginBottom: 12,
              }}
              onPress={() =>
                Linking.openURL(`https://petbreeze.co/lost?key=${key}`)
              }>
              확인하러 가기
            </Button>
            <Button
              onPress={() => navigation.goBack()}
              useCommonMarginBottom
              backgroundColor="white"
              fontColor="rgba(0, 0, 0, 0.5)">
              완료
            </Button>
          </>
        ) : null}
      </View>
    </SafeAreaContainer>
  );
};

export default Success;
