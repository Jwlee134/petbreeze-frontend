import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import styled, { css } from "styled-components/native";
import { MyPageScreenNavigationProp } from "~/types/navigator";
import MyText from "../common/MyText";
import Footprint from "~/assets/svg/tab/footprint-outline.svg";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import { Device } from "~/api/device";
import { noAvatar, noName } from "~/constants";

const DeviceContainer = styled.ScrollView<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    padding-top: ${rpWidth(25)}px;
    padding-bottom: ${rpWidth(21)}px;
  `}
`;

const AvatarButton = styled.TouchableOpacity`
  align-items: center;
`;

const Svg = styled.View<{ rpWidth: RpWidth }>`
  background-color: rgba(0, 0, 0, 0.03);
  justify-content: center;
  align-items: center;
  ${({ rpWidth }) => css`
    width: ${rpWidth(70)}px;
    height: ${rpWidth(70)}px;
    border-radius: ${rpWidth(35)}px;
    margin-top: ${rpWidth(25)}px;
    margin-bottom: ${rpWidth(15)}px;
  `}
`;

const Image = styled.Image<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    width: ${rpWidth(70, true)}px;
    height: ${rpWidth(70, true)}px;
    border-radius: ${rpWidth(35, true)}px;
  `}
`;

const DeviceList = ({ deviceList }: { deviceList: Device[] | undefined }) => {
  const navigation = useNavigation<MyPageScreenNavigationProp>();
  const { rpWidth, width } = useContext(DimensionsContext);

  return (
    <View>
      {deviceList?.length ? (
        <DeviceContainer
          rpWidth={rpWidth}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            ...(deviceList?.length < 4
              ? {
                  flexGrow: 1,
                  justifyContent: "center",
                }
              : {
                  paddingHorizontal: width * 0.25,
                }),
          }}>
          {deviceList?.map((device, i) => (
            <AvatarButton
              style={{
                marginHorizontal: width * 0.07,
                ...(i === 0 && { marginLeft: 0 }),
                ...(i === deviceList?.length - 1 && { marginRight: 0 }),
              }}
              onPress={() => {
                navigation.navigate("DeviceSetting", {
                  deviceID: device.id,
                  avatar: device.profile_image,
                  name: device.name,
                });
              }}
              key={device.id}>
              <Image
                rpWidth={rpWidth}
                source={
                  device.profile_image
                    ? { uri: device.profile_image }
                    : noAvatar
                }
              />
              <MyText style={{ marginTop: rpWidth(15) }}>
                {device.name || noName}
              </MyText>
            </AvatarButton>
          ))}
        </DeviceContainer>
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("BleRootStackNav");
          }}
          style={{ alignItems: "center" }}>
          <Svg rpWidth={rpWidth}>
            <Footprint width={rpWidth(44)} height={rpWidth(42)} opacity={0.3} />
          </Svg>
          <MyText
            style={{ marginBottom: rpWidth(21) }}
            fontWeight="light"
            color="rgba(0, 0, 0, 0.3)">
            디바이스를 등록해주세요.
          </MyText>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DeviceList;
