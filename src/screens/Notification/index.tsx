import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { useAppSelector } from "~/store";
import { NotificationScreenNavigationProp } from "~/types/navigator";
import AuthSelector from "../Shared/AuthSelector";

const Container = styled.View``;

const Notification = ({
  navigation,
}: {
  navigation: NotificationScreenNavigationProp;
}) => {
  const { isLoggedIn } = useAppSelector(state => state.user);

  if (!isLoggedIn) return <AuthSelector />;

  return (
    <Container>
      <Text>Notification</Text>
    </Container>
  );
};

export default Notification;
