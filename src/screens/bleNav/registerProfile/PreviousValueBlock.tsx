import React from "react";
import styled from "styled-components/native";
import MyText from "~/components/common/MyText";
import { useAppSelector } from "~/store";
import { rpWidth } from "~/styles";
import palette from "~/styles/palette";

interface IProps {
  isSecond?: boolean;
  isThird?: boolean;
}

const Container = styled.View<{ isSecond: boolean }>`
  flex-direction: row;
  margin-left: ${rpWidth(16)}px;
  flex-wrap: wrap;
  flex-shrink: 1;
  margin-top: ${rpWidth(17)}px;
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

const PreviousValueBlock = ({ isSecond = false }: IProps) => {
  const name = useAppSelector(state => state.form.name);
  const birthYear = useAppSelector(state => state.form.birthYear);
  const gender = useAppSelector(state => state.form.gender);
  const breed = useAppSelector(state => state.form.breed);
  const weight = useAppSelector(state => state.form.weight);

  return (
    <Container isSecond={isSecond}>
      {name ? (
        <Block>
          <MyText fontSize={14}>{name}</MyText>
        </Block>
      ) : null}
      {birthYear ? (
        <Block>
          <MyText fontSize={14}>
            {new Date().getFullYear() - Number(birthYear) + 1}살
          </MyText>
        </Block>
      ) : null}
      {!isSecond ? (
        <>
          {gender ? (
            <Block>
              <MyText fontSize={14}>{gender}</MyText>
            </Block>
          ) : null}
          {breed ? (
            <Block>
              <MyText fontSize={14}>
                {breed.length > 3 ? `${breed.substr(0, 3)}...` : breed}
              </MyText>
            </Block>
          ) : null}
          {weight ? (
            <Block>
              <MyText fontSize={14}>{weight}kg</MyText>
            </Block>
          ) : null}
        </>
      ) : null}
    </Container>
  );
};

export default PreviousValueBlock;
