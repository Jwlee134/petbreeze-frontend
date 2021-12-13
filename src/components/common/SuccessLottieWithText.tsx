import React from "react";
import styled from "styled-components/native";
import Lottie from "../lottie/Success";
import MyText from "./MyText";

const TopContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

const BottomContainer = styled.View<{ isOtaUpdateSuccess: boolean }>`
  flex: 1;
  align-items: center;
  justify-content: ${({ isOtaUpdateSuccess }) =>
    isOtaUpdateSuccess ? "space-between" : "flex-end"};
`;

interface Props {
  text: string;
  Buttons?: JSX.Element;
  isOtaUpdateSuccess?: boolean;
}

const SuccessLottieWithText = ({
  text,
  Buttons,
  isOtaUpdateSuccess = false,
}: Props) => {
  return (
    <>
      <TopContainer>
        <Lottie style={{ marginBottom: 54 }} />
        <MyText style={{ textAlign: "center" }} fontSize={24}>
          {text}
        </MyText>
      </TopContainer>
      <BottomContainer isOtaUpdateSuccess={isOtaUpdateSuccess}>
        {Buttons || null}
      </BottomContainer>
    </>
  );
};

export default SuccessLottieWithText;
