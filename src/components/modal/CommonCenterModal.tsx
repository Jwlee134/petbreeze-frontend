import React, { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import styled from "styled-components/native";
import palette from "~/styles/palette";
import Divider from "../common/Divider";
import MyText, { FontWeight } from "../common/MyText";

interface Props {
  title?: string;
  titleFontWeight?: FontWeight;
  description?: string;
  onRightButtonPress: () => void;
  rightButtonText: string | JSX.Element;
  close: () => void;
  children?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
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
  titleFontWeight,
  description,
  onRightButtonPress,
  rightButtonText,
  close,
  children,
  containerStyle,
}: Props) => (
  <Container style={containerStyle}>
    {title ? (
      <MyText
        style={{
          ...(!description ? { marginVertical: 27 } : { marginTop: 27 }),
          textAlign: "center",
        }}
        fontWeight={titleFontWeight}>
        {title}
      </MyText>
    ) : null}
    {description ? (
      <MyText
        style={{ textAlign: "center", marginTop: 19, marginBottom: 27 }}
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
        {typeof rightButtonText === "string" ? (
          <MyText fontWeight="medium" color={palette.blue_7b}>
            {rightButtonText}
          </MyText>
        ) : (
          rightButtonText
        )}
      </Button>
    </View>
  </Container>
);

export default CommonCenterModal;
