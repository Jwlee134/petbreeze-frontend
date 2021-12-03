import React from "react";
import styled from "styled-components/native";
import palette from "~/styles/palette";
import MyText from "../../common/MyText";

const Container = styled.View`
  width: 76px;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

interface Props {
  currentPage: number;
  totalPage: number;
}

const PageCount = ({ currentPage, totalPage }: Props) => (
  <Container>
    <MyText fontSize={14} fontWeight="medium" color={palette.blue_7b}>
      {currentPage}{" "}
    </MyText>
    <MyText fontSize={14} fontWeight="medium" color="rgba(0, 0, 0, 0.3)">
      / {totalPage}
    </MyText>
  </Container>
);

export default PageCount;
