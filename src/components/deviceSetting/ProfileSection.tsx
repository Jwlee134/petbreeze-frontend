import React from "react";
import styled from "styled-components/native";
import Pencil from "~/assets/svg/myPage/pencil-white.svg";
import Divider from "../common/Divider";
import { TouchableOpacity } from "react-native";
import MyText from "../common/MyText";
import { useNavigation } from "@react-navigation/native";
import { DeviceProfile } from "~/api/device";
import { DeviceSettingScreenNavigationProp } from "~/types/navigator";
import { useDispatch } from "react-redux";
import { noAvatar, noName } from "~/constants";
import { formActions } from "~/store/form";
import palette from "~/styles/palette";

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

const PencilContainer = styled.View`
  background-color: ${palette.blue_7b};
  width: 28px;
  height: 28px;
  border-radius: 14px;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: -12px;
`;

interface Props {
  data: DeviceProfile | undefined;
  deviceID: number;
  avatar: string;
  name: string;
}

const ProfileSection = ({ data, deviceID, avatar, name }: Props) => {
  const navigation = useNavigation<DeviceSettingScreenNavigationProp>();

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
        sex: data.sex,
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
        <PencilContainer>
          <Pencil />
        </PencilContainer>
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
