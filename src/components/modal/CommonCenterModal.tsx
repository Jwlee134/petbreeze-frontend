import React, { useContext } from "react";
import { View } from "react-native";
import styled, { css } from "styled-components/native";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import palette from "~/styles/palette";
import Divider from "../common/Divider";
import MyText from "../common/MyText";

interface IProps {
  title: string;
  description?: string;
  onRightButtonPress: () => void;
  rightButtonText: string;
  close: () => void;
}

const Container = styled.View<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    width: ${rpWidth(270)}px;
    border-radius: ${rpWidth(20)}px;
  `}
  background-color: white;
  overflow: hidden;
  align-items: center;
`;

const Button = styled.TouchableOpacity<{ rpWidth: RpWidth }>`
  width: 50%;
  align-items: center;
  height: ${({ rpWidth }) => rpWidth(44)}px;
  justify-content: center;
`;

const CommonCenterModal = ({
  title,
  description,
  onRightButtonPress,
  rightButtonText,
  close,
}: IProps) => {
  const { rpWidth } = useContext(DimensionsContext);

  return (
    <Container rpWidth={rpWidth}>
      <MyText style={{ marginVertical: rpWidth(27) }} fontWeight="medium">
        {title}
      </MyText>
      {description ? (
        <MyText
          style={{ textAlign: "center", marginBottom: rpWidth(27) }}
          fontSize={12}>
          {description}
        </MyText>
      ) : null}
      <Divider />
      <View style={{ flexDirection: "row" }}>
        <Button rpWidth={rpWidth} onPress={close}>
          <MyText color="rgba(0, 0, 0, 0.3)">취소</MyText>
        </Button>
        <Divider isVertical />
        <Button rpWidth={rpWidth} onPress={onRightButtonPress}>
          <MyText fontWeight="medium" color={palette.blue_7b}>
            {rightButtonText}
          </MyText>
        </Button>
      </View>
    </Container>
  );
};

export default CommonCenterModal;
