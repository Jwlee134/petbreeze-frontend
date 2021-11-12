import React, { useContext } from "react";
import styled, { css } from "styled-components/native";
import MyText from "~/components/common/MyText";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import { useAppSelector } from "~/store";
import palette from "~/styles/palette";

const Container = styled.View<{ rpWidth: RpWidth }>`
  flex-direction: row;
  flex-wrap: wrap;
  flex-shrink: 1;
  flex-grow: 1;
  ${({ rpWidth }) => css`
    margin-left: ${rpWidth(16)}px;
    margin-top: ${rpWidth(17)}px;
  `}
`;

const Block = styled.View<{ rpWidth: RpWidth }>`
  width: auto;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${palette.blue_7b};
  ${({ rpWidth }) => css`
    height: ${rpWidth(39)}px;
    border-radius: ${rpWidth(28)}px;
    padding: 0px ${rpWidth(12)}px;
    margin-bottom: ${rpWidth(10)}px;
    margin-right: ${rpWidth(7)}px;
  `}
`;

const PreviousValueBlock = () => {
  const name = useAppSelector(state => state.form.name);
  const birthYear = useAppSelector(state => state.form.birthYear);
  const { rpWidth } = useContext(DimensionsContext);

  return (
    <Container rpWidth={rpWidth}>
      <Block rpWidth={rpWidth}>
        <MyText fontSize={14}>{name}</MyText>
      </Block>
      <Block rpWidth={rpWidth}>
        <MyText fontSize={14}>
          {new Date().getFullYear() - Number(birthYear) + 1}살
        </MyText>
      </Block>
    </Container>
  );
};

export default PreviousValueBlock;
