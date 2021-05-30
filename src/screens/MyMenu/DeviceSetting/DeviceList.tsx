import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import AddCircleButton from "~/components/common/button/AddCircleButton";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";
import { DeviceListScreenNavigationProp } from "~/types/navigator";

const ButtonContainer = styled.View`
  align-items: center;
  margin-top: 26px;
`;

const DeviceList = ({
  navigation,
}: {
  navigation: DeviceListScreenNavigationProp;
}) => {
  const data = [
    {
      name: "루루",
      avatarUrl: require("~/assets/image/test.jpg"),
      battery: 80,
      remainingTime: 5,
    },
  ];

  return (
    <ScrollView>
      <SidePaddingContainer>
        <ButtonContainer>
          <AddCircleButton
            size={50}
            onPress={() => navigation.navigate("AddDevice")}
          />
        </ButtonContainer>
      </SidePaddingContainer>
    </ScrollView>
  );
};

export default DeviceList;
