import React from "react";
import styled from "styled-components/native";
import Pencil from "~/assets/svg/myPage/pencil.svg";
import Divider from "../common/Divider";
import { TouchableOpacity } from "react-native";
import MyText from "../common/MyText";
import { useNavigation } from "@react-navigation/native";
import deviceApi from "~/api/device";
import { DeviceSettingScreenNavigationProp } from "~/types/navigator";
import { useDispatch } from "react-redux";
import { noAvatar, noName } from "~/constants";
import { formActions } from "~/store/form";

const Container = styled.View`
  align-items: center;
  padding-top: 10px;
  padding-bottom: 26px;
`;

const Image = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;

const ProfileSection = ({
  deviceID,
  avatar,
  name,
}: {
  deviceID: number;
  avatar: string;
  name: string;
}) => {
  const navigation = useNavigation<DeviceSettingScreenNavigationProp>();
  const { data } = deviceApi.useGetDeviceProfileQuery(deviceID, {
    refetchOnMountOrArgChange: true,
  });
  const dispatch = useDispatch();

  const onPress = () => {
    if (!data) return;
    dispatch(
      formActions.setState({
        photos: [data.profile_image],
        name: data.name,
        species: data.species,
        ...(data.birthdate && {
          birthYear: parseInt(data.birthdate.split("-")[0], 10),
          birthMonth: parseInt(data.birthdate?.split("-")[1], 10),
          birthDay: parseInt(data.birthdate?.split("-")[2], 10),
        }),
        weight: data.weight?.toString() || "",
      }),
    );
    navigation.navigate("UpdateProfile", { deviceID });
  };

  return (
    <Container>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={
            data?.profile_image
              ? { uri: data?.profile_image }
              : avatar
              ? { uri: avatar }
              : noAvatar
          }
        />
        <Pencil
          width={28}
          height={28}
          style={{
            position: "absolute",
            bottom: 0,
            right: -10,
          }}
        />
      </TouchableOpacity>
      <MyText style={{ marginTop: 7 }} fontWeight="medium">
        {data?.name || name || noName}
      </MyText>
      <MyText fontSize={12} color="rgba(0, 0, 0, 0.3)">
        {data?.species || "품종 없음"}
        {"  "}
        <Divider isVertical height={8} />
        {"  "}
        {data?.birthdate
          ? `${
              new Date().getFullYear() -
              new Date(data?.birthdate).getFullYear() +
              1
            }세`
          : "나이 미상"}
        {"  "}
        <Divider isVertical height={8} />
        {"  "}
        {data?.sex ? "남" : "여"}
      </MyText>
    </Container>
  );
};

export default ProfileSection;
