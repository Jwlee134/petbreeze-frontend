import React, { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import styled from "styled-components/native";
import palette from "~/styles/palette";

interface IProps {
  children: ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const Container = styled.TouchableOpacity``;

const Button = styled.View`
  width: 180px;
  height: 36px;
  background-color: ${palette.blue};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

const Label = styled.Text`
  font-size: 18px;
  color: white;
`;

const ConfirmButton = ({ children, onPress, style }: IProps) => (
  <Container style={style} activeOpacity={0.8} onPress={onPress}>
    <Button>
      <Label>{children}</Label>
    </Button>
  </Container>
);

export default ConfirmButton;
