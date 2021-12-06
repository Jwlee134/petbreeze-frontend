import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import { MyPageScreenNavigationProp } from "~/types/navigator";
import MyText from "../common/MyText";
import { Device } from "~/api/device";
import { noAvatar } from "~/constants";
import DeviceListItem from "./DeviceListItem";

const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const Image = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  margin: 23px 30px;
`;

const DeviceList = ({ deviceList }: { deviceList: Device[] | undefined }) => {
  const navigation = useNavigation<MyPageScreenNavigationProp>();

  const onRegister = () => navigation.navigate("BleRootStackNav");

  return deviceList?.length ? (
    <>
      {deviceList.map(device => (
        <DeviceListItem
          navigation={navigation}
          key={device.id}
          device={device}
        />
      ))}
    </>
  ) : (
    <Button onPress={onRegister}>
      <Image source={noAvatar} />
      <MyText fontWeight="light" color="rgba(0, 0, 0, 0.3)">
        디바이스를 등록해주세요.
      </MyText>
    </Button>
  );
};

export default DeviceList;
