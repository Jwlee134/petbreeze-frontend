import React, { ReactNode } from "react";
import { PressableProps, StyleProp, ViewStyle } from "react-native";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";
import palette from "~/styles/palette";
import MyText from "./MyText";

interface Props extends PressableProps {
  selected: boolean;
  children: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
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
  const value = useDerivedValue(() =>
    selected
      ? withTiming(1, { duration: 200, easing: Easing.linear })
      : withTiming(0, { duration: 200, easing: Easing.linear }),
  );

  const color = useAnimatedStyle(() => ({
    color: interpolateColor(
      value.value,
      [0, 1],
      ["rgba(0, 0, 0, 0.1)", palette.blue_7b],
    ),
  }));
  const borderColor = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      value.value,
      [0, 1],
      ["rgba(0, 0, 0, 0.1)", palette.blue_7b],
    ),
  }));

  return (
    <Button {...props}>
      <Container style={[{ ...(containerStyle as object) }, borderColor]}>
        <MyText
          style={fontColor ? { color: fontColor } : undefined}
          animatedStyle={!fontColor ? color : undefined}>
          {children}
        </MyText>
      </Container>
    </Button>
  );
};

export default SelectableButton;
