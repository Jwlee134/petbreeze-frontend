import React, { useContext } from "react";
import styled, { css } from "styled-components/native";
import Pencil from "~/assets/svg/myPage/pencil.svg";
import Divider from "../../common/Divider";
import { TouchableOpacity } from "react-native";
import MyText from "../../common/MyText";
import { useNavigation } from "@react-navigation/native";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import deviceApi from "~/api/device";
import { DeviceSettingScreenNavigationProp } from "~/types/navigator";
import { noAvatar, noName } from "~/constants";
import { useDispatch } from "react-redux";
import { deviceSettingActions } from "~/store/deviceSetting";

const Container = styled.View<{ rpWidth: RpWidth }>`
  align-items: center;
  ${({ rpWidth }) => css`
    padding-top: ${rpWidth(25)}px;
    padding-bottom: ${rpWidth(14)}px;
  `}
`;

const Image = styled.Image<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    width: ${rpWidth(70)}px;
    height: ${rpWidth(70)}px;
    border-radius: ${rpWidth(35)}px;
  `}
`;

const ProfileSection = ({ deviceID }: { deviceID: number }) => {
  const navigation = useNavigation<DeviceSettingScreenNavigationProp>();
  const { rpWidth } = useContext(DimensionsContext);
  const { data } = deviceApi.useGetDeviceProfileQuery(deviceID, {
    refetchOnMountOrArgChange: true,
  });
  const dispatch = useDispatch();

  return (
    <Container rpWidth={rpWidth}>
      <TouchableOpacity
        onPress={() => {
          if (!data) return;
          dispatch(
            deviceSettingActions.setProfile({
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
          navigation.navigate("UpdateProfile", {
            deviceID,
          });
        }}>
        <Image
          rpWidth={rpWidth}
          source={data?.profile_image ? { uri: data?.profile_image } : noAvatar}
        />
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
        {data?.name || noName}
      </MyText>
      <MyText fontSize={12} color="rgba(0, 0, 0, 0.3)">
        {data?.species || "품종 없음"}
        {"  "}
        <Divider isVertical height={rpWidth(8)} />
        {"  "}
        {data?.birthdate
          ? `${
              new Date().getFullYear() -
              new Date(data?.birthdate).getFullYear() +
              1
            }세`
          : "나이 미상"}
        {"  "}
        <Divider isVertical height={rpWidth(8)} />
        {"  "}
        {data?.sex ? "남" : "여"}
      </MyText>
    </Container>
  );
};

export default ProfileSection;
