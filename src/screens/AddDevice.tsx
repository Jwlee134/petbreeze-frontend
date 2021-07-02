import React from "react";
import { useEffect } from "react";
import { Animated, View } from "react-native";
import styled from "styled-components/native";
import ConfirmButton from "~/components/common/button/ConfirmButton";
import SafeAreaContainer from "~/components/common/container/SafeAreaContainer";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";
import Fail from "~/components/lottie/Fail";
import Loading from "~/components/lottie/Loading";
import Success from "~/components/lottie/Success";
import useOTAUpdate from "~/hooks/useOTAUpdate";
import palette from "~/styles/palette";
import { AddDeviceScreenRouteProp } from "~/types/navigator";
import SubmitDeviceInfo from "~/components/SubmitDeviceInfo";

const Text = styled.Text`
  font-size: 22px;
  margin-top: 100px;
  text-align: center;
`;

const SmallText = styled.Text`
  font-size: 18px;
  margin-top: 10px;
  text-align: center;
`;

const ButtonContainer = styled.View`
  margin-bottom: 66px;
`;

const LottieContainer = styled.View`
  margin-top: 66px;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

const Reference = styled.Text`
  color: gray;
  margin-bottom: 12px;
  font-size: 12px;
`;

const AddDevice = ({ route }: { route: AddDeviceScreenRouteProp }) => {
  const { status, animatedProgress, handleStart, widthInterpolate } =
    useOTAUpdate();

  useEffect(() => {
    if (route?.params?.execute) {
      handleStart();
    }
  }, []);

  return (
    <SafeAreaContainer hasCustomHeader={false}>
      {status === "profile" ? (
        <SubmitDeviceInfo />
      ) : (
        <SidePaddingContainer
          style={{
            flex: 1,
            alignItems: "center",
            ...(status === "before" && { justifyContent: "space-between" }),
          }}>
          <Text>
            {status === "before" && "기기등록을 시작하시겠습니까?"}
            {status === "searching" && "기기를 찾고 있습니다."}
            {status === "connected" && "연결이 완료되었습니다."}
            {status === "failed" && "연결에 실패하였습니다."}
            {status === "downloading" && "펌웨어를 다운받는 중입니다."}
            {status === "updating" && "펌웨어를 업데이트하는 중입니다."}
          </Text>
          {status === "failed" && (
            <SmallText>블루투스가 켜져있는지 확인해주세요.</SmallText>
          )}
          {status === "updating" && (
            <SmallText>잠시만 기다려 주세요.</SmallText>
          )}
          {(status === "searching" || status === "updating") && (
            <LottieContainer>
              <Loading />
              <Reference>Source: @Hânnely Ribeiro / LottieFiles</Reference>
            </LottieContainer>
          )}
          {status === "connected" && (
            <LottieContainer>
              <Success />
              <Reference>Source: @Travis Gregory / LottieFiles</Reference>
            </LottieContainer>
          )}
          {status === "failed" && (
            <LottieContainer style={{ marginTop: 27 }}>
              <Fail />
              <Reference>Source: @Behrouz Poursoltani / LottieFiles</Reference>
            </LottieContainer>
          )}
          {status === "before" && (
            <ButtonContainer>
              <ConfirmButton onPress={handleStart}>시작</ConfirmButton>
            </ButtonContainer>
          )}
          {status === "downloading" && (
            <>
              <View
                style={{
                  backgroundColor: palette.gray_f3,
                  width: "100%",
                  height: 15,
                }}>
                <Animated.View
                  style={{
                    backgroundColor: palette.blue_6e,
                    height: "100%",
                    width: widthInterpolate,
                  }}
                />
              </View>
              <SmallText>{animatedProgress}%</SmallText>
            </>
          )}
        </SidePaddingContainer>
      )}
    </SafeAreaContainer>
  );
};

export default AddDevice;
