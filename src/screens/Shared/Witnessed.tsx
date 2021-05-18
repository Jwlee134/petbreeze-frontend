import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import useFocusEvent from "~/hooks/useFocusEvent";

const Container = styled.ScrollView``;

const Witnessed = () => {
  useFocusEvent({ isHomeTab: true });

  return (
    <Container>
      <Text>Witnessed</Text>
    </Container>
  );
};

export default Witnessed;
