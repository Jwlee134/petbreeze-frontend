import React from "react";
import { StyleProp, useWindowDimensions, ViewStyle } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";
import palette from "~/styles/palette";

const PageBarBackground = styled.View`
  width: 100%;
  height: 4px;
`;

const PageBar = styled(Animated.View)`
  height: 100%;
  background-color: ${palette.blue_86};
`;

const PageIndicator = ({
  currentPage,
  totalPage,
  style,
}: {
  currentPage: number;
  totalPage: number;
  style?: StyleProp<ViewStyle>;
}) => {
  const { width } = useWindowDimensions();
  const value = useSharedValue(currentPage);

  const widthStyle = useAnimatedStyle(() => {
    value.value = withTiming(width * (currentPage / totalPage), {
      duration: 200,
      easing: Easing.linear,
    });
    return { width: value.value };
  }, [currentPage, totalPage]);

  return (
    <PageBarBackground
      style={{ ...(style as object), backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
      <PageBar style={[widthStyle]} />
    </PageBarBackground>
  );
};

export default PageIndicator;
