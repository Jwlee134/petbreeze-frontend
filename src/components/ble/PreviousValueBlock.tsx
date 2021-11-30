import React from "react";
import styled from "styled-components/native";
import MyText from "~/components/common/MyText";
import { useAppSelector } from "~/store";
import palette from "~/styles/palette";

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  flex-shrink: 1;
  flex-grow: 1;
  margin-left: 16px;
  margin-top: 17px;
`;

const Block = styled.View`
  width: auto;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${palette.blue_7b};
  height: 39px;
  border-radius: 28px;
  padding: 0px 12px;
  margin-bottom: 10px;
  margin-right: 7px;
`;

const PreviousValueBlock = () => {
  const name = useAppSelector(state => state.form.name);
  const birthYear = useAppSelector(state => state.form.birthYear);

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
    </Container>
  );
};

export default PreviousValueBlock;
