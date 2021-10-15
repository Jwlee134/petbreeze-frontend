import React from "react";
import styled from "styled-components/native";

import DeviceList from "~/components/home/DeviceList";
import HomeMap from "~/components/home/HomeMap";

const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const Home = () => {
  return (
    <Container>
      <HomeMap />
      <DeviceList />
    </Container>
  );
};

export default Home;
