import React, { ReactNode, useContext, useEffect, useRef } from "react";
import {
  Animated,
  StyleProp,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import styled, { css } from "styled-components/native";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import palette from "~/styles/palette";
import MyText from "./MyText";

interface IProps extends TouchableOpacityProps {
  selected: boolean;
  children: ReactNode;
  containerStyle?: Animated.AnimatedProps<StyleProp<ViewStyle>>;
}

const Button = styled.TouchableOpacity<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    height: ${rpWidth(39)}px;
    margin-bottom: ${rpWidth(20)}px;
  `}
  flex-grow: 1;
`;

const Container = styled(Animated.View)<{ rpWidth: RpWidth }>`
  background-color: white;
  height: 100%;
  border-radius: ${({ rpWidth }) => rpWidth(28)}px;
  border-width: 1px;
  justify-content: center;
  align-items: center;
`;

const SelectableButton = ({
  selected,
  children,
  containerStyle,
  ...props
}: IProps) => {
  const { rpWidth } = useContext(DimensionsContext);
  const value = useRef(new Animated.Value(selected ? 1 : 0)).current;

  const color = value.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0, 0, 0, 0.1)", palette.blue_7b],
  });

  useEffect(() => {
    Animated.timing(value, {
      toValue: selected ? 1 : 0,
      useNativeDriver: false,
      duration: 200,
    }).start();
  }, [selected]);

  return (
    <Button rpWidth={rpWidth} {...props}>
      <Container
        rpWidth={rpWidth}
        style={{
          borderColor: color,
          ...(containerStyle as object),
        }}>
        <MyText style={{ color }}>{children}</MyText>
      </Container>
    </Button>
  );
};

export default SelectableButton;
