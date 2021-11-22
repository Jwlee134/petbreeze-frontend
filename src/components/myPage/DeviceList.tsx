import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, useWindowDimensions, View } from "react-native";
import styled from "styled-components/native";
import { MyPageScreenNavigationProp } from "~/types/navigator";
import MyText from "../common/MyText";
import Footprint from "~/assets/svg/tab/footprint-outline.svg";
import { Device } from "~/api/device";
import { noAvatar, noName } from "~/constants";

const DeviceContainer = styled.ScrollView`
  padding-top: 25px;
  padding-bottom: 21px;
`;

const AvatarButton = styled.TouchableOpacity`
  align-items: center;
`;

const Svg = styled.View`
  background-color: rgba(0, 0, 0, 0.03);
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  border-radius: 35px;
  margin-top: 25px;
  margin-bottom: 15px;
`;

const Image = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;

const DeviceList = ({ deviceList }: { deviceList: Device[] | undefined }) => {
  const navigation = useNavigation<MyPageScreenNavigationProp>();
  const { width } = useWindowDimensions();

  return (
    <View>
      {deviceList?.length ? (
        <DeviceContainer
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
                source={
                  device.profile_image
                    ? { uri: device.profile_image }
                    : noAvatar
                }
              />
              <MyText style={{ marginTop: 15 }}>{device.name || noName}</MyText>
            </AvatarButton>
          ))}
        </DeviceContainer>
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("BleRootStackNav");
          }}
          style={{ alignItems: "center" }}>
          <Svg>
            <Footprint width={44} height={42} opacity={0.3} />
          </Svg>
          <MyText
            style={{ marginBottom: 21 }}
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
