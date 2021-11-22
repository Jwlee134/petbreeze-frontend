import React, { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import styled from "styled-components/native";
import palette from "~/styles/palette";
import Divider from "../common/Divider";
import MyText from "../common/MyText";

interface Props {
  title?: string;
  description?: string;
  onRightButtonPress: () => void;
  rightButtonText: string;
  close: () => void;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Container = styled.View`
  width: 270px;
  border-radius: 20px;
  background-color: white;
  overflow: hidden;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  width: 50%;
  align-items: center;
  height: 44px;
  justify-content: center;
`;

const CommonCenterModal = ({
  title,
  description,
  onRightButtonPress,
  rightButtonText,
  close,
  children,
  style,
}: Props) => (
  <Container style={style}>
    {title ? (
      <MyText
        preventRpWidth
        style={{ marginVertical: 27, textAlign: "center" }}
        fontWeight="medium">
        {title}
      </MyText>
    ) : null}
    {description ? (
      <MyText
        preventRpWidth
        style={{ textAlign: "center", marginBottom: 27 }}
        fontSize={12}>
        {description}
      </MyText>
    ) : null}
    {children || null}
    <Divider />
    <View style={{ flexDirection: "row" }}>
      <Button onPress={close}>
        <MyText color="rgba(0, 0, 0, 0.3)">취소</MyText>
      </Button>
      <Divider isVertical />
      <Button onPress={onRightButtonPress}>
        <MyText fontWeight="medium" color={palette.blue_7b}>
          {rightButtonText}
        </MyText>
      </Button>
    </View>
  </Container>
);

export default CommonCenterModal;
