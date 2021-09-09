import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { IDevice } from "~/store/device";
import { rpWidth } from "~/styles";
import palette from "~/styles/palette";
import { HomeScreenNavigationProp } from "~/types/navigator";
import DeviceAvatarCircle from "../common/DeviceAvatarCircle";
import HairlineDivider from "../common/HairlineDivider";
import MyText from "../common/MyText";

interface IProps {
  device: IDevice;
  close: () => void;
}

const AvatarContainer = styled.View`
  width: ${rpWidth(90)}px;
  border-radius: ${rpWidth(45)}px;
  position: absolute;
  top: -${rpWidth(112)}px;
`;

const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: ${rpWidth(50)}px;
`;

const HomeBottomModal = ({ device, close }: IProps) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <>
      <AvatarContainer>
        <DeviceAvatarCircle
          circleWidth={90}
          lineWidth={7}
          battery={device.battery}
        />
      </AvatarContainer>
      <Button>
        <MyText color={palette.blue_7b}>이동경로</MyText>
      </Button>
      <HairlineDivider />
      <Button
        onPress={() => {
          close();
          navigation.navigate("DeviceSetting", {
            data: device,
          });
        }}>
        <MyText color={palette.blue_7b}>기기설정</MyText>
      </Button>
      <HairlineDivider />
      <Button
        onPress={() => {
          close();
          navigation.navigate("EmergencyMissing", {
            data: device,
          });
        }}>
        <MyText color={palette.red_f0}>긴급실종</MyText>
      </Button>
    </>
  );
};

export default HomeBottomModal;
