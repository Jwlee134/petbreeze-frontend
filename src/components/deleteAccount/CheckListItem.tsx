import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";
import { rpWidth } from "~/styles";
import Check from "~/assets/svg/check/check-white.svg";
import MyText from "../common/MyText";
import palette from "~/styles/palette";

const CheckCircle = styled(Animated.View)`
  width: ${rpWidth(25)}px;
  height: ${rpWidth(25)}px;
  border-radius: ${rpWidth(12.5)}px;
  justify-content: center;
  align-items: center;
`;

const Selector = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${rpWidth(24)}px;
`;

const CheckListItem = ({
  reason,
  selected,
  setSelected,
}: {
  reason: string;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const value = useRef(new Animated.Value(0)).current;

  const backgroundColor = value.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0, 0, 0, 0.1)", palette.blue_7b_90],
  });

  useEffect(() => {
    Animated.timing(value, {
      toValue: selected.includes(reason) ? 1 : 0,
      useNativeDriver: false,
      duration: 200,
    }).start();
  }, [selected]);

  return (
    <>
      <Selector
        onPress={() => {
          if (selected.includes(reason)) {
            setSelected(selected.filter(item => item !== reason));
          } else {
            setSelected([...selected, reason]);
          }
        }}>
        <MyText>{reason}</MyText>
        <CheckCircle style={{ backgroundColor }}>
          <Check />
        </CheckCircle>
      </Selector>
    </>
  );
};

export default CheckListItem;
