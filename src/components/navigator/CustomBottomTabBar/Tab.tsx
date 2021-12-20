import React from "react";
import styled from "styled-components/native";

import Home from "~/assets/svg/tab/home.svg";
import HomeOutline from "~/assets/svg/tab/home-outline.svg";
import Footprint from "~/assets/svg/tab/footprint.svg";
import FootprintOutline from "~/assets/svg/tab/footprint-outline.svg";
import Bell from "~/assets/svg/tab/bell.svg";
import BellOutline from "~/assets/svg/tab/bell-outline.svg";
import User from "~/assets/svg/tab/user.svg";
import UserOutline from "~/assets/svg/tab/user-outline.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import palette from "~/styles/palette";

const Container = styled.View``;

const Point = styled.View`
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: ${palette.blue_7b};
  right: -4px;
  top: -4px;
`;

const Tab = ({
  isFocused,
  name,
  newNotifExists,
}: {
  isFocused: boolean;
  name: string;
  newNotifExists: boolean;
}) => {
  const { bottom } = useSafeAreaInsets();

  const Icon = () => {
    switch (name) {
      case "HomeTab":
        return isFocused ? <Home /> : <HomeOutline />;
      case "WalkTab":
        return isFocused ? <Footprint /> : <FootprintOutline />;
      case "NotificationTab":
        return isFocused ? <Bell /> : <BellOutline />;
      case "MyPageTab":
        return isFocused ? <User /> : <UserOutline />;
      default:
        return <></>;
    }
  };

  return (
    <Container style={{ marginBottom: bottom }}>
      {newNotifExists && name === "NotificationTab" && !isFocused ? (
        <Point />
      ) : null}
      {Icon()}
    </Container>
  );
};

export default Tab;
