import React from "react";
import { Platform } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import styled from "styled-components/native";
import palette from "~/styles/palette";

const Container = styled.View`
  padding-left: ${Platform.OS === "android" ? "5px" : "15px"};
`;

const HeaderBackButton = () => (
  <Container>
    <Feather name="chevron-left" size={32} style={{ color: palette.blue_6e }} />
  </Container>
);

export default HeaderBackButton;
