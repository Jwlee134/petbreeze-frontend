import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import ConfirmButton from "~/components/common/button/ConfirmButton";
import SafeAreaContainer from "~/components/common/container/SafeAreaContainer";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";
import Fail from "~/components/lottie/Fail";
import Loading from "~/components/lottie/Loading";
import Success from "~/components/lottie/Success";
import { useAppSelector } from "~/store";
import SubmitDeviceInfo from "./SubmitDeviceInfo";

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

const AddDevice = () => {
  const { currentTabName } = useAppSelector(state => state.common);

  const [isBefore, setIsBefore] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [showTagScreen, setShowTagScreen] = useState(false);

  const handleStart = () => {
    setIsBefore(false);
    setIsSearching(true);
  };

  useEffect(() => {
    if (isSearching) {
      setTimeout(() => {
        setIsSearching(false);
        setIsConnected(true);
      }, 2000);
    }
  }, [isSearching]);

  useEffect(() => {
    if (isConnected) {
      setTimeout(() => {
        setIsConnected(false);
        setIsFailed(true);
      }, 2000);
    }
  }, [isConnected]);

  useEffect(() => {
    if (isFailed) {
      setTimeout(() => {
        setIsFailed(false);
        setShowTagScreen(true);
      }, 2000);
    }
  }, [isFailed]);

  useEffect(() => {
    if (currentTabName === "StartWalking") {
      handleStart();
    }
  }, []);

  return (
    <SafeAreaContainer hasCustomHeader={false}>
      {showTagScreen ? (
        <SubmitDeviceInfo />
      ) : (
        <SidePaddingContainer
          style={{
            flex: 1,
            alignItems: "center",
            ...(isBefore && { justifyContent: "space-between" }),
          }}>
          <Text>
            {isBefore && "기기등록을 시작하시겠습니까?"}
            {isSearching && "기기를 찾고 있습니다."}
            {isConnected && "연결이 완료되었습니다."}
            {isFailed && "연결에 실패하였습니다."}
          </Text>
          {isFailed && (
            <SmallText>블루투스가 켜져있는지 확인해주세요.</SmallText>
          )}
          {isSearching && (
            <LottieContainer>
              <Loading />
              <Reference>Source: @Hânnely Ribeiro / LottieFiles</Reference>
            </LottieContainer>
          )}
          {isConnected && (
            <LottieContainer>
              <Success />
              <Reference>Source: @Travis Gregory / LottieFiles</Reference>
            </LottieContainer>
          )}
          {isFailed && (
            <LottieContainer style={{ marginTop: 27 }}>
              <Fail />
              <Reference>Source: @Behrouz Poursoltani / LottieFiles</Reference>
            </LottieContainer>
          )}
          {isBefore && (
            <ButtonContainer>
              <ConfirmButton onPress={handleStart}>시작</ConfirmButton>
            </ButtonContainer>
          )}
        </SidePaddingContainer>
      )}
    </SafeAreaContainer>
  );
};

export default AddDevice;
