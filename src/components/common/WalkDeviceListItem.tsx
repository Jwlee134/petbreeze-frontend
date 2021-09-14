import React, { useEffect, useRef } from "react";
import { Animated, TouchableOpacityProps } from "react-native";
import styled, { css } from "styled-components/native";
import { IDevice } from "~/store/device";
import { rpWidth } from "~/styles";
import palette from "~/styles/palette";
import DeviceAvatarCircle from "./DeviceAvatarCircle";
import MyText from "./MyText";

import Check from "~/assets/svg/check/check-white.svg";
import RightArrow from "~/assets/svg/arrow/arrow-right-blue.svg";
import HairlineDivider from "./HairlineDivider";

interface IProps extends TouchableOpacityProps {
  data: IDevice;
  selected?: boolean;
  isIconArrow?: boolean;
  isLast?: boolean;
}

const Container = styled.TouchableOpacity`
  width: 100%;
  height: ${rpWidth(102)}px;
  background-color: white;
  border-radius: 12px;
  padding: 0px ${rpWidth(16)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CheckCircle = styled(Animated.View)`
  width: ${rpWidth(25)}px;
  height: ${rpWidth(25)}px;
  border-radius: ${rpWidth(12.5)}px;
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled.View`
  margin-left: ${rpWidth(26)}px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const WalkDeviceListItem = ({
  data,
  selected = false,
  isIconArrow = false,
  isLast = false,
  ...props
}: IProps) => {
  const value = useRef(new Animated.Value(0)).current;

  const backgroundColor = value.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0, 0, 0, 0.1)", palette.blue_7b_90],
  });

  useEffect(() => {
    Animated.timing(value, {
      toValue: selected ? 1 : 0,
      useNativeDriver: false,
      duration: 200,
    }).start();
  }, [selected]);

  return (
    <>
      <Container {...props}>
        <RowContainer>
          <DeviceAvatarCircle isWalkListItem battery={data.battery} />
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
              style={{ marginTop: rpWidth(5) }}
              fontSize={12}
              color="rgba(0, 0, 0, 0.5)">
              마지막 산책
            </MyText>
          </TextContainer>
        </RowContainer>
        {!isIconArrow ? (
          <CheckCircle style={{ backgroundColor }}>
            <Check width={rpWidth(13)} height={rpWidth(11)} />
          </CheckCircle>
        ) : (
          <RightArrow width={rpWidth(7)} height={rpWidth(12)} />
        )}
      </Container>
      {isLast ? null : <HairlineDivider />}
    </>
  );
};

export default WalkDeviceListItem;
