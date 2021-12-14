import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import { MyPageScreenNavigationProp } from "~/types/navigator";
import MyText from "../common/MyText";
import { Device } from "~/api/device";
import { noAvatar } from "~/constants";
import { ScrollView } from "react-native";

const AvatarContainer = styled.Pressable`
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 14px;
`;

const Button = styled.Pressable`
  align-items: center;
  padding-top: 10px;
  padding-bottom: 14px;
`;

const Image = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  margin-bottom: 7px;
`;

const MyPageDeviceList = ({ deviceList }: { deviceList: Device[] }) => {
  const navigation = useNavigation<MyPageScreenNavigationProp>();

  const onRegister = () => navigation.navigate("AddDevice");

  return deviceList.length ? (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        ...(deviceList.length < 4
          ? { flexGrow: 1, justifyContent: "center" }
          : { paddingHorizontal: 90 }),
      }}>
      {deviceList.map((device, i) => (
        <AvatarContainer
          key={device.id}
          style={{
            ...(deviceList.length < 4
              ? { width: "30%" }
              : { marginRight: i !== deviceList.length - 1 ? 40 : 0 }),
          }}
          onPress={() => {
            navigation.navigate("DeviceSetting", {
              deviceID: device.id,
              avatar: device.profile_image,
              name: device.name,
            });
          }}>
          <Image
            source={
              device.profile_image ? { uri: device.profile_image } : noAvatar
            }
          />
          <MyText fontWeight="medium">{device.name}</MyText>
        </AvatarContainer>
      ))}
    </ScrollView>
  ) : (
    <Button onPress={onRegister}>
      <Image source={noAvatar} />
      <MyText fontWeight="light" color="rgba(0, 0, 0, 0.3)">
        디바이스를 등록해주세요.
      </MyText>
    </Button>
  );
};

export default MyPageDeviceList;
