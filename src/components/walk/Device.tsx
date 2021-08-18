import React from "react";
import { TouchableOpacityProps } from "react-native";
import styled, { css } from "styled-components/native";
import { IDevice } from "~/store/device";
import { rpWidth } from "~/styles";
import palette from "~/styles/palette";
import ShadowContainer from "../common/container/ShadowContainer";
import DeviceAvatarCircle from "../common/DeviceAvatarCircle";
import MyText from "../common/MyText";

import CheckFill from "~/assets/svg/walk/check-circle-fill.svg";
import Check from "~/assets/svg/walk/check-circle.svg";
import RightArrow from "~/assets/svg/walk/arrow-right.svg";

interface IProps extends TouchableOpacityProps {
  data: IDevice;
  selected?: boolean;
  isStartWalking?: boolean;
}

interface IContainerProps {
  selected: boolean;
}

const Container = styled.TouchableOpacity<IContainerProps>`
  width: 100%;
  height: ${rpWidth(90)}px;
  background-color: white;
  margin-bottom: ${rpWidth(12)}px;
  border-radius: 12px;
  padding: 0px ${rpWidth(18)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${({ selected }) =>
    selected &&
    css`
      border-width: ${rpWidth(1)}px;
      border-color: ${palette.blue_7b};
      padding: 0px ${rpWidth(17)}px;
    `}
`;

const LeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TextContainer = styled.View`
  margin-left: ${rpWidth(26)}px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${rpWidth(5)}px;
`;

const Device = ({
  data,
  selected = false,
  isStartWalking = true,
  ...props
}: IProps) => (
  <ShadowContainer shadowOpacity={0.1} shadowRadius={10}>
    <Container selected={selected} {...props}>
      <LeftContainer>
        <DeviceAvatarCircle isWalk battery={data.battery} />
        <TextContainer>
          <RowContainer>
            <MyText fontWeight="medium">{data.name}</MyText>
            <MyText
              fontSize={12}
              color={palette.blue_7b}
              style={{ marginLeft: rpWidth(12) }}>
              {data.battery}%
            </MyText>
          </RowContainer>
          <MyText fontSize={12} color="rgba(0, 0, 0, 0.5)">
            마지막 산책
          </MyText>
        </TextContainer>
      </LeftContainer>
      {isStartWalking ? (
        selected ? (
          <CheckFill width={rpWidth(25)} height={rpWidth(25)} />
        ) : (
          <Check width={rpWidth(25)} height={rpWidth(25)} />
        )
      ) : (
        <RightArrow width={rpWidth(9)} height={rpWidth(15)} />
      )}
    </Container>
  </ShadowContainer>
);

export default Device;
