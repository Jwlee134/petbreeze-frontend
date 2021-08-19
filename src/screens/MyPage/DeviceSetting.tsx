import React from "react";
import styled from "styled-components/native";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { rpHeight, rpWidth } from "~/styles";
import DeviceAvatarCircle from "~/components/common/DeviceAvatarCircle";
import MyText from "~/components/common/MyText";
import Pencil from "~/assets/svg/myPage/pencil.svg";

import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";
import LocationInfoCollectionPeriod from "~/components/myPage/LocationInfoCollectionPeriod";
import SafetyZone from "~/components/myPage/SafetyZone";

const TopContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding: ${rpWidth(11)}px 0px;
`;

const TextDivider = styled.View`
  width: ${StyleSheet.hairlineWidth}px;
  height: ${rpWidth(8)}px;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ThickDivider = styled.View`
  width: 100%;
  height: ${rpWidth(4)}px;
  background-color: rgba(0, 0, 0, 0.03);
`;

const ThinDivider = styled.View`
  width: 100%;
  height: ${StyleSheet.hairlineWidth}px;
  background-color: rgba(0, 0, 0, 0.3);
`;

const DeviceSetting = ({ navigation, route }) => {
  const data = route.params.data;

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}>
      <TopContainer>
        <TouchableOpacity onPress={() => navigation.navigate("UpdateProfile")}>
          <DeviceAvatarCircle />
          <Pencil
            width={rpWidth(28)}
            height={rpWidth(28)}
            style={{
              position: "absolute",
              bottom: 0,
              right: -10,
            }}
          />
        </TouchableOpacity>
        <MyText style={{ marginTop: rpHeight(7) }} fontWeight="medium">
          {data.name}
        </MyText>
        <MyText fontSize={12} color="rgba(0, 0, 0, 0.3)">
          {data.breed}
          {"  "}
          <TextDivider />
          {"  "}
          {data.age}세{"  "}
          <TextDivider />
          {"  "}
          {data.gender}
        </MyText>
      </TopContainer>
      <ThickDivider />
      <SidePaddingContainer>
        <LocationInfoCollectionPeriod />
        <ThinDivider />
        <SafetyZone />
      </SidePaddingContainer>
    </ScrollView>
  );
};

export default DeviceSetting;
