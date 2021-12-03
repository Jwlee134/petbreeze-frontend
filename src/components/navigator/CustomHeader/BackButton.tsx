import React from "react";
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
}

const BackButton = ({ onBackButtonPress, navigation }: Props) => {
  const onPress = () => {
    if (onBackButtonPress) onBackButtonPress();
    if (navigation) navigation.goBack();
  };

  return (
    <Button onPress={onPress}>
      <Arrow />
    </Button>
  );
};

export default BackButton;
