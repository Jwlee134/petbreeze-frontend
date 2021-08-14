import React from "react";
import { TouchableOpacityProps } from "react-native";
import styled, { css } from "styled-components/native";
import { IDevice } from "~/store/device";
import { rpHeight, rpWidth } from "~/styles";
import palette from "~/styles/palette";
import ShadowContainer from "../common/container/ShadowContainer";
import DeviceAvatarCircle from "../common/DeviceAvatarCircle";
import MyText from "../common/MyText";

interface IProps extends TouchableOpacityProps {
  data: IDevice;
  selected: boolean;
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
  ${({ selected }) =>
    selected &&
    css`
      border-width: ${rpWidth(1)}px;
      border-color: ${palette.blue_7b};
      padding: 0px ${rpWidth(17)}px;
    `}
`;

const TextContainer = styled.View`
  margin-left: ${rpWidth(26)}px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Device = ({ data, selected, ...props }: IProps) => (
  <ShadowContainer shadowOpacity={0.1} shadowRadius={10}>
    <Container selected={selected} {...props}>
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
        <MyText
          style={{ marginBottom: rpHeight(8) }}
          fontSize={12}
          color="rgba(0, 0, 0, 0.3)">
          {data.breed} | {data.age}세
        </MyText>
        <MyText fontSize={12} color="rgba(0, 0, 0, 0.7)">
          마지막 산책
        </MyText>
      </TextContainer>
    </Container>
  </ShadowContainer>
);

export default Device;
