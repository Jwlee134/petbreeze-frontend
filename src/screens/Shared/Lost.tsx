import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import useFocusEvent from "~/hooks/useFocusEvent";

const Container = styled.ScrollView``;

const Lost = () => {
  useFocusEvent({ isHomeTab: true });

  return (
    <Container>
      <Text>Lost</Text>
    </Container>
  );
};

export default Lost;
