import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import styled from "styled-components/native";
import Arrow from "~/assets/svg/arrow/arrow-left.svg";

const Button = styled.TouchableOpacity`
  width: 36px;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

interface Props {
  onBackButtonPress?: () => void;
  navigation?: any;
  style?: StyleProp<ViewStyle>;
}

const BackButton = ({ onBackButtonPress, navigation, style }: Props) => {
  const onPress = () => {
    if (onBackButtonPress) onBackButtonPress();
    if (navigation) navigation.goBack();
  };

  return (
    <Button onPress={onPress} style={style}>
      <Arrow />
    </Button>
  );
};

export default BackButton;
