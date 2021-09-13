import React from "react";
import styled from "styled-components/native";
import MyText from "~/components/common/MyText";
import { useAppSelector } from "~/store";
import { rpWidth } from "~/styles";
import palette from "~/styles/palette";

const Container = styled.View`
  flex-direction: row;
  margin-left: ${rpWidth(16)}px;
  flex-wrap: wrap;
  flex-shrink: 1;
  margin-top: ${rpWidth(17)}px;
  flex-grow: 1;
`;

const Block = styled.View`
  width: auto;
  justify-content: center;
  align-items: center;
  height: ${rpWidth(39)}px;
  border-radius: ${rpWidth(28)}px;
  border-width: 1px;
  border-color: ${palette.blue_7b};
  padding: 0px ${rpWidth(12)}px;
  margin-bottom: ${rpWidth(10)}px;
  margin-right: ${rpWidth(7)}px;
`;

const PreviousValueBlock = () => {
  const name = useAppSelector(state => state.form.name);
  const birthYear = useAppSelector(state => state.form.birthYear);
  const gender = useAppSelector(state => state.form.gender);

  return (
    <Container>
      <Block>
        <MyText fontSize={14}>{name}</MyText>
      </Block>
      <Block>
        <MyText fontSize={14}>
          {new Date().getFullYear() - Number(birthYear) + 1}살
        </MyText>
      </Block>
      <Block>
        <MyText fontSize={14}>{gender}</MyText>
      </Block>
    </Container>
  );
};

export default PreviousValueBlock;
