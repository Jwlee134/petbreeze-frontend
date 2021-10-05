import React, { useContext, useState } from "react";
import styled, { css } from "styled-components/native";

import Home from "~/assets/svg/tab/home.svg";
import HomeOutline from "~/assets/svg/tab/home-outline.svg";
import Footprint from "~/assets/svg/tab/footprint.svg";
import FootprintOutline from "~/assets/svg/tab/footprint-outline.svg";
import Bell from "~/assets/svg/tab/bell.svg";
import BellOutline from "~/assets/svg/tab/bell-outline.svg";
import User from "~/assets/svg/tab/user.svg";
import UserOutline from "~/assets/svg/tab/user-outline.svg";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import palette from "~/styles/palette";

const Container = styled.View``;

const Point = styled.View<{ rpWidth: RpWidth }>`
  position: absolute;
  ${({ rpWidth }) => css`
    width: ${rpWidth(6)}px;
    height: ${rpWidth(6)}px;
    border-radius: ${rpWidth(3)}px;
    background-color: ${palette.blue_7b};
    right: -${rpWidth(4)}px;
    top: -${rpWidth(4)}px;
  `}
`;

const Tab = ({ isFocused, name }: { isFocused: boolean; name: string }) => {
  const { rpWidth } = useContext(DimensionsContext);
  const { bottom } = useSafeAreaInsets();
  const [showPoint, setShowPoint] = useState(true);

  const Icon = () => {
    switch (name) {
      case "HomeTab":
        return isFocused ? (
          <Home width={rpWidth(24)} height={rpWidth(23)} />
        ) : (
          <HomeOutline width={rpWidth(24)} height={rpWidth(23)} />
        );
      case "WalkTab":
        return isFocused ? (
          <Footprint width={rpWidth(25)} height={rpWidth(24)} />
        ) : (
          <FootprintOutline width={rpWidth(25)} height={rpWidth(24)} />
        );
      case "NotificationTab":
        return isFocused ? (
          <Bell width={rpWidth(21)} height={rpWidth(24)} />
        ) : (
          <BellOutline width={rpWidth(21)} height={rpWidth(24)} />
        );
      case "MyPageTab":
        return isFocused ? (
          <User width={rpWidth(22)} height={rpWidth(23)} />
        ) : (
          <UserOutline width={rpWidth(22)} height={rpWidth(23)} />
        );
      default:
        return <></>;
    }
  };

  return (
    <Container style={{ marginBottom: bottom }}>
      {showPoint && name === "NotificationTab" ? (
        <Point rpWidth={rpWidth} />
      ) : null}
      {Icon()}
    </Container>
  );
};

export default Tab;
