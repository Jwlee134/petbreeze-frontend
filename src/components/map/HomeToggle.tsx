import React, { useEffect, useState } from "react";
import styled from "styled-components/native";

import Star from "~/assets/svg/star-outline.svg";
import DoubleCircle from "~/assets/svg/circle-double.svg";
import OrangeStar from "~/assets/svg/star-outline-orange.svg";
import OrangeDoubleCircle from "~/assets/svg/circle-double-orange.svg";
import palette from "~/styles/palette";

interface IProps {
  startTracking: () => void;
  clearTracking: () => void;
}

const ButtonContainer = styled.TouchableOpacity`
  width: 65px;
  position: absolute;
  align-items: center;
  right: 10px;
`;

const Circle = styled.View`
  width: 45px;
  height: 45px;
  border-radius: 22.5px;
  background-color: ${palette.blue_6e};
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  color: ${palette.blue_6e};
`;

const HomeToggle = ({ startTracking, clearTracking }: IProps) => {
  const [clickedButton, setClickedButton] =
    useState<"myLocation" | "path" | "">("");

  useEffect(() => {
    if (clickedButton === "myLocation") {
      startTracking();
    }
  }, [clickedButton]);

  return (
    <>
      <ButtonContainer
        onPress={() => {}}
        style={{ top: 20 }}
        activeOpacity={0.7}>
        <Circle>{clickedButton === "path" ? <OrangeStar /> : <Star />}</Circle>
        <ButtonText>이동경로</ButtonText>
      </ButtonContainer>
      <ButtonContainer
        onPress={() => {
          if (clickedButton === "myLocation") {
            clearTracking();
            setClickedButton("");
          } else {
            setClickedButton("myLocation");
          }
        }}
        style={{ top: 100 }}
        activeOpacity={0.8}>
        <Circle>
          {clickedButton === "myLocation" ? (
            <OrangeDoubleCircle />
          ) : (
            <DoubleCircle />
          )}
        </Circle>
        <ButtonText>내 위치</ButtonText>
      </ButtonContainer>
    </>
  );
};

export default HomeToggle;
