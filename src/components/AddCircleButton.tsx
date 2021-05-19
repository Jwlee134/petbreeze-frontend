import React from "react";
import styled from "styled-components/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import palette from "~/styles/palette";

const Button = styled.TouchableOpacity`
  background-color: white;
  position: absolute;
  bottom: 20px;
  right: 20px;
  border-radius: 100px;
`;

const AddCircleButton = ({ onPress }: { onPress: () => void }) => (
  <Button activeOpacity={0.9} onPress={onPress}>
    <AntDesign name="pluscircle" size={50} color={palette.blue} />
  </Button>
);

export default AddCircleButton;
