import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, useWindowDimensions, View } from "react-native";
import styled from "styled-components/native";
import { MyPageScreenNavigationProp } from "~/types/navigator";
import MyText from "../common/MyText";
import { Device } from "~/api/device";
import { noAvatar, noName } from "~/constants";

const Button = styled.TouchableOpacity`
  align-items: center;
  padding-bottom: 20px;
`;

const Image = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  margin-top: 20px;
  margin-bottom: 15px;
`;

const DeviceList = ({ deviceList }: { deviceList: Device[] | undefined }) => {
  const navigation = useNavigation<MyPageScreenNavigationProp>();
  const { width } = useWindowDimensions();

  return (
    <View>
      {deviceList?.length ? (
        <ScrollView
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
            <Button
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
              <MyText>{device.name || noName}</MyText>
            </Button>
          ))}
        </ScrollView>
      ) : (
        <Button
          onPress={() => {
            navigation.navigate("BleRootStackNav");
          }}
          style={{ alignItems: "center" }}>
          <Image source={noAvatar} />
          <MyText fontWeight="light" color="rgba(0, 0, 0, 0.3)">
            디바이스를 등록해주세요.
          </MyText>
        </Button>
      )}
    </View>
  );
};

export default DeviceList;
