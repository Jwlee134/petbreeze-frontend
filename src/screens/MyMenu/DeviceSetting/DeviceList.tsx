import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import AddCircleButton from "~/components/common/button/AddCircleButton";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";
import Device from "~/components/Device";
import { DeviceListScreenNavigationProp } from "~/types/navigator";

const DeviceListContainer = styled.View`
  margin: 26px 0px;
`;

const ButtonContainer = styled.View`
  align-items: center;
`;

const DeviceList = ({
  navigation,
}: {
  navigation: DeviceListScreenNavigationProp;
}) => {
  const data = [
    {
      name: "막둥이",
      avatarUrl: require("~/assets/image/test.jpg"),
      battery: 80,
      remainingTime: 5,
      selected: true,
    },
    {
      name: "막둥이",
      avatarUrl: require("~/assets/image/test.jpg"),
      battery: 60,
      remainingTime: 5,
      selected: false,
    },
  ];

  return (
    <ScrollView>
      <SidePaddingContainer>
        <DeviceListContainer>
          {data.map((item, index) => (
            <Device
              key={index}
              data={item}
              isLast={index === data.length - 1}
            />
          ))}
        </DeviceListContainer>
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
