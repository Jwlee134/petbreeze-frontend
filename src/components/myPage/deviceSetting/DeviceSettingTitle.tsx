import React, { useContext, useEffect, useRef } from "react";
import styled, { css } from "styled-components/native";
import MyText from "../../common/MyText";
import Shield from "~/assets/svg/myPage/shield.svg";
import WiFiIcon from "~/assets/svg/wifi/wifi-black.svg";
import Plus from "~/assets/svg/plus/plus-blue.svg";
import Dissolve from "../../common/Dissolve";
import People from "~/assets/svg/myPage/people.svg";
import Arrow from "~/assets/svg/arrow/arrow-down-gray.svg";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import { Animated, StyleSheet } from "react-native";

interface IProps {
  type: "safetyZone" | "wifi" | "family";
  isEdit: boolean;
  showList?: boolean;
  onPlusButtonClick?: () => void;
  onArrowButtonClick?: () => void;
  disablePlusButton: boolean;
  disableArrowButton?: boolean;
}

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SvgContainer = styled.View<{ rpWidth: RpWidth }>`
  width: ${({ rpWidth }) => rpWidth(48)}px;
  align-items: center;
`;

const Container = styled(RowContainer)<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    height: ${rpWidth(79)}px;
    padding: 0 ${rpWidth(16)}px;
  `}
  justify-content: space-between;
  background-color: white;
`;

const PlusContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const RightSvgContainer = styled(SvgContainer)`
  height: 100%;
`;

const DeviceSettingTitle = ({
  type,
  isEdit,
  showList,
  onPlusButtonClick,
  onArrowButtonClick,
  disablePlusButton,
  disableArrowButton = false,
}: IProps) => {
  const { rpWidth } = useContext(DimensionsContext);
  const value = useRef(new Animated.Value(showList ? 1 : 0)).current;

  const rotateZ = value.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  useEffect(() => {
    Animated.timing(value, {
      toValue: showList ? 1 : 0,
      useNativeDriver: true,
      duration: 200,
    }).start();
  }, [showList]);

  return (
    <Container rpWidth={rpWidth}>
      <RowContainer>
        <SvgContainer rpWidth={rpWidth}>
          {type === "safetyZone" ? (
            <Shield width={rpWidth(19)} height={rpWidth(20)} />
          ) : type === "wifi" ? (
            <WiFiIcon width={rpWidth(22)} height={rpWidth(17)} />
          ) : (
            <People width={rpWidth(20)} height={rpWidth(19)} />
          )}
        </SvgContainer>
        <MyText>
          {type === "safetyZone"
            ? "안심존"
            : type === "family"
            ? "가족관리"
            : "WiFi"}
        </MyText>
      </RowContainer>
      <RightSvgContainer rpWidth={rpWidth}>
        {!disablePlusButton ? (
          <Dissolve style={StyleSheet.absoluteFill} isVisible={isEdit}>
            <PlusContainer onPress={onPlusButtonClick}>
              <Plus width={rpWidth(14)} height={rpWidth(14)} />
            </PlusContainer>
          </Dissolve>
        ) : null}
        {!disableArrowButton ? (
          <Dissolve
            style={{
              ...(StyleSheet.absoluteFill as object),
              transform: [{ rotateZ }],
            }}
            isVisible={!isEdit}>
            <PlusContainer onPress={onArrowButtonClick}>
              <Arrow width={rpWidth(12)} height={rpWidth(8)} />
            </PlusContainer>
          </Dissolve>
        ) : null}
      </RightSvgContainer>
    </Container>
  );
};

export default DeviceSettingTitle;
