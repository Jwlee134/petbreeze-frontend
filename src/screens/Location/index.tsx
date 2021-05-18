import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { useAppSelector } from "~/store";
import { LocationScreenNavigationProp } from "~/types/navigator";
import AuthSelector from "../Shared/AuthSelector";

const Container = styled.View``;

const Location = ({
  navigation,
}: {
  navigation: LocationScreenNavigationProp;
}) => {
  const { isLoggedIn } = useAppSelector(state => state.user);

  if (!isLoggedIn) return <AuthSelector />;

  return (
    <Container>
      <Text>Location</Text>
    </Container>
  );
};

export default Location;
