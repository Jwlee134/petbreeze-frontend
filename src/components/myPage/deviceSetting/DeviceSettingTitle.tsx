import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import MyText from "../../common/MyText";
import Shield from "~/assets/svg/myPage/shield.svg";
import WiFiIcon from "~/assets/svg/wifi/wifi-black.svg";
import Plus from "~/assets/svg/plus/plus-blue.svg";
import Dissolve from "../../common/Dissolve";
import People from "~/assets/svg/myPage/people.svg";
import Arrow from "~/assets/svg/arrow/arrow-down-gray.svg";
import { Animated, StyleSheet } from "react-native";

interface Props {
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

const SvgContainer = styled.View`
  width: 48px;
  align-items: center;
`;

const Container = styled(RowContainer)`
  height: 79px;
  padding: 0 16px;
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
}: Props) => {
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
    <Container>
      <RowContainer>
        <SvgContainer>
          {type === "safetyZone" ? (
            <Shield width={19} height={20} />
          ) : type === "wifi" ? (
            <WiFiIcon width={22} height={17} />
          ) : (
            <People width={20} height={19} />
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
      <RightSvgContainer>
        {!disablePlusButton ? (
          <Dissolve style={StyleSheet.absoluteFill} isVisible={isEdit}>
            <PlusContainer onPress={onPlusButtonClick}>
              <Plus width={14} height={14} />
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
              <Arrow width={12} height={8} />
            </PlusContainer>
          </Dissolve>
        ) : null}
      </RightSvgContainer>
    </Container>
  );
};

export default DeviceSettingTitle;
