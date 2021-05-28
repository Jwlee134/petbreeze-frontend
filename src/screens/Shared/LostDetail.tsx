import { useRoute } from "@react-navigation/core";
import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { LostDetailScreenRouteProp } from "~/types/navigator";

const Container = styled.ScrollView``;

const LostDetail = () => {
  const route = useRoute<LostDetailScreenRouteProp>();
  console.log(route.params.id);
  return (
    <Container>
      <Text>LostDetail</Text>
    </Container>
  );
};

export default LostDetail;
