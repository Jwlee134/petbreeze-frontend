import React, { Fragment } from "react";
import { PressableProps } from "react-native";
import styled from "styled-components/native";
import palette from "~/styles/palette";

interface IContainerProps extends PressableProps {
  selected: boolean;
  isLast: boolean;
}

const Container = styled.Pressable<IContainerProps>`
  width: 100%;
  flex-direction: row;
  height: 68px;
  justify-content: space-between;
  align-items: center;
  background-color: ${palette.gray_f3};
  border-width: 1px;
  border-color: ${({ selected }) => (!selected ? palette.gray_e5 : "black")};
  border-radius: 9px;
  padding: 0px 17px;
  margin-bottom: ${({ isLast }) => (isLast ? 0 : "11px")};
`;

const LeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Image = styled.Image`
  width: 55px;
  height: 55px;
  border-radius: 27.5px;
  margin-right: 12px;
`;

const Text = styled.Text`
  font-size: 16px;
`;

const BatteryBar = styled.View<{ isLast: boolean }>`
  width: 5px;
  height: 11px;
  background-color: ${palette.green_b6};
  margin-right: ${({ isLast }) => (isLast ? "8px" : "2px")};
`;

const Device = ({ data, isLast }: { data: any; isLast: boolean }) => {
  const numOfBatteryBar = () => {
    const length =
      data.battery > 75
        ? 4
        : data.battery > 50
        ? 3
        : data.battery > 25
        ? 2
        : data.battery > 0
        ? 1
        : 0;
    return Array.from({ length }, (v, i) => i);
  };

  return (
    <Container isLast={isLast} selected={data.selected}>
      <Fragment>
        <LeftContainer>
          <Image source={data.avatarUrl} />
          <Text style={{ marginRight: 8 }}>{data.name}</Text>
          {numOfBatteryBar().map((_, index) => (
            <BatteryBar
              key={index}
              isLast={index === numOfBatteryBar().length - 1}
            />
          ))}
          <Text>{data.battery}%</Text>
        </LeftContainer>
        <Text>{data.remainingTime}분</Text>
      </Fragment>
    </Container>
  );
};

export default Device;
