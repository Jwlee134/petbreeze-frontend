import React, { useContext } from "react";
import styled, { css } from "styled-components/native";
import DeviceAvatarCircle from "../common/DeviceAvatarCircle";
import Pencil from "~/assets/svg/myPage/pencil.svg";
import Divider from "../common/Divider";
import { TouchableOpacity } from "react-native";
import MyText from "../common/MyText";
import { IDevice } from "~/store/device";
import { useNavigation } from "@react-navigation/core";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";

const Container = styled.View<{ rpWidth: RpWidth }>`
  align-items: center;
  ${({ rpWidth }) => css`
    padding-top: ${rpWidth(25)}px;
    padding-bottom: ${rpWidth(14)}px;
  `}
`;

const ProfileSection = ({ data }: { data: IDevice }) => {
  const navigation = useNavigation();
  const { rpWidth } = useContext(DimensionsContext);

  return (
    <Container rpWidth={rpWidth}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("UpdateProfile", {
            data,
          })
        }>
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
      <MyText style={{ marginTop: rpWidth(7) }} fontWeight="medium">
        {data.name}
      </MyText>
      <MyText fontSize={12} color="rgba(0, 0, 0, 0.3)">
        {data.breed}
        {"  "}
        <Divider isVertical height={rpWidth(8)} />
        {"  "}
        {data.age}세{"  "}
        <Divider isVertical height={rpWidth(8)} />
        {"  "}
        {data.gender}
      </MyText>
    </Container>
  );
};

export default ProfileSection;
