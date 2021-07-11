import React from "react";
import styled from "styled-components/native";
import palette from "~/styles/palette";
import { isAndroid } from "~/utils";

const Container = styled.View`
  padding-left: ${isAndroid ? "5px" : "15px"};
`;

const HeaderBackButton = () => (
  <Container>
    {/*  <Feather name="chevron-left" size={32} style={{ color: palette.blue_6e }} /> */}
  </Container>
);

export default HeaderBackButton;
