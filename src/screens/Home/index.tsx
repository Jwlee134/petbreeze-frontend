import React from "react";
import styled from "styled-components/native";
import HomePlusButton from "~/components/HomePlusButton";
import HomeTopTapNavigator from "~/navigator/HomeTopTabNav";
import { HomeScreenNavigationProp } from "~/types/navigator";

const TitleContainer = styled.View`
  margin: 40px 0px 10px 0px;
`;

const Title = styled.Text`
  font-size: 36px;
  text-align: center;
`;

const Home = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
  return (
    <>
      <TitleContainer>
        <Title>어디개</Title>
      </TitleContainer>
      <HomeTopTapNavigator />
      <HomePlusButton onPress={() => navigation.navigate("PostAnimalInfo")} />
    </>
  );
};

export default Home;
