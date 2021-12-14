import React from "react";
import styled from "styled-components/native";

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
    </Container>
  );
};

export default Home;
