import { useRoute } from "@react-navigation/core";
import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { WitnessedDetailScreenRouteProp } from "~/types/navigator";

const Container = styled.ScrollView``;

const WitnessedDetail = () => {
  const route = useRoute<WitnessedDetailScreenRouteProp>();
  console.log(route.params.id);
  return (
    <Container>
      <Text>WitnessedDetail</Text>
    </Container>
  );
};

export default WitnessedDetail;
