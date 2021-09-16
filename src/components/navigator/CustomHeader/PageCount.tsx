import React from "react";
import styled from "styled-components/native";
import { rpWidth } from "~/styles";
import palette from "~/styles/palette";
import MyText from "../../common/MyText";

const Container = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: ${rpWidth(13.5)}px;
  flex-direction: row;
`;

const PageCount = ({
  currentPage,
  totalPage,
}: {
  currentPage: number;
  totalPage: number;
}) => {
  return (
    <Container>
      <MyText fontSize={14} fontWeight="medium" color={palette.blue_7b}>
        {currentPage}{" "}
      </MyText>
      <MyText fontSize={14} fontWeight="medium" color="rgba(0, 0, 0, 0.3)">
        / {totalPage}
      </MyText>
    </Container>
  );
};

export default PageCount;
