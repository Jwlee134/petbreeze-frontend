import React from "react";
import styled from "styled-components/native";

import HomeBottomSheet from "~/components/home/HomeBottomSheet";

import HomeDeviceList from "~/components/home/HomeDeviceList";
import HomeMap from "~/components/home/HomeMap";

const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const Home = () => {
  return (
    <Container>
      <HomeMap />
      <HomeDeviceList />
      <HomeBottomSheet />
    </Container>
  );
};

export default Home;
