import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import ConfirmButton from "~/components/common/button/ConfirmButton";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";
import Fail from "~/components/lottie/Fail";
import Loading from "~/components/lottie/Loading";
import Success from "~/components/lottie/Success";
import palette from "~/styles/palette";
import SubmitTagInfo from "./SubmitTagInfo";

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
  border-radius: 15px;
  overflow: hidden;
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
  const [isBefore, setIsBefore] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [showTagScreen, setShowTagScreen] = useState(false);

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

  if (showTagScreen) return <SubmitTagInfo />;

  return (
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
      {isFailed && <SmallText>블루투스가 켜져있는지 확인해주세요.</SmallText>}
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
          <ConfirmButton
            onPress={() => {
              setIsBefore(false);
              setIsSearching(true);
            }}>
            시작
          </ConfirmButton>
        </ButtonContainer>
      )}
    </SidePaddingContainer>
  );
};

export default AddDevice;
