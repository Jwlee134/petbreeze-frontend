import React, { ReactNode, useEffect, useRef } from "react";
import {
  Animated,
  StyleProp,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import styled from "styled-components/native";
import palette from "~/styles/palette";
import MyText from "./MyText";

interface Props extends TouchableOpacityProps {
  selected: boolean;
  children: ReactNode;
  containerStyle?: Animated.AnimatedProps<StyleProp<ViewStyle>>;
  fontColor?: string;
}

const Button = styled.TouchableOpacity`
  height: 39px;
  margin-bottom: 20px;
  flex-grow: 1;
`;

const Container = styled(Animated.View)`
  background-color: white;
  height: 100%;
  border-radius: 28px;
  border-width: 1px;
  justify-content: center;
  align-items: center;
`;

const SelectableButton = ({
  selected,
  children,
  containerStyle,
  fontColor,
  ...props
}: Props) => {
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
    <Button {...props}>
      <Container
        style={{
          borderColor: color,
          ...(containerStyle as object),
        }}>
        <MyText style={{ color: fontColor || color }}>{children}</MyText>
      </Container>
    </Button>
  );
};

export default SelectableButton;
