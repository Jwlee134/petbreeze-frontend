import React, { useEffect, useRef } from "react";
import { Animated, StyleProp, View, ViewStyle } from "react-native";
import Picker from "react-native-wheel-scrollview-picker";
import MyText from "./MyText";
import styled from "styled-components/native";
import palette from "~/styles/palette";
import { rpWidth } from "~/styles";

interface IProps {
  width: string | number;
  height: number;
  style?: StyleProp<ViewStyle>;
  data: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
}

const Container = styled.View`
  background-color: white;
  overflow: hidden;
  border-width: 1px;
  border-color: ${palette.blue_7b};
  border-radius: ${rpWidth(28)}px;
`;

const ScrollPicker = ({
  width,
  height,
  style,
  data,
  selectedIndex,
  onChange,
}: IProps) => {
  return (
    <Container
      style={{
        width,
        height,
        ...(style as object),
      }}>
      <Picker
        dataSource={data}
        selectedIndex={selectedIndex}
        renderItem={(item, index) => {
          const selected = item === data[selectedIndex];
          const value = useRef(new Animated.Value(0)).current;

          const color = value.interpolate({
            inputRange: [0, 1],
            outputRange: ["rgba(0, 0, 0, 0.3)", palette.blue_7b],
          });

          useEffect(() => {
            Animated.timing(value, {
              toValue: selected ? 1 : 0,
              useNativeDriver: false,
              duration: 200,
            }).start();
          }, [selected]);

          return (
            <View onStartShouldSetResponder={() => true}>
              <MyText style={{ color }} fontWeight="medium" key={index}>
                {item}
              </MyText>
            </View>
          );
        }}
        onValueChange={(data, selectedIndex) => onChange(selectedIndex)}
        wrapperHeight={height}
        wrapperWidth={width}
        wrapperBackground="red"
        itemHeight={height}
        wrapperColor="white"
        highlightColor="transparent"
      />
    </Container>
  );
};

export default ScrollPicker;
