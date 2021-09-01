import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { IDevice } from "~/store/device";
import { rpWidth } from "~/styles";
import palette from "~/styles/palette";
import { HomeScreenNavigationProp } from "~/types/navigator";
import DeviceAvatarCircle from "../common/DeviceAvatarCircle";
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

const Container = styled.View`
  align-items: center;
`;

const ButtonContainer = styled.View`
  background-color: ${palette.gray_f3};
  border-radius: 17px;
  width: 100%;
`;

const Divider = styled.View`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  height: ${StyleSheet.hairlineWidth}px;
`;

const NameContainer = styled.View`
  height: ${rpWidth(41)}px;
  justify-content: center;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: ${rpWidth(55)}px;
`;

const HomeBottomModal = ({ device, close }: IProps) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <Container>
      <AvatarContainer>
        <DeviceAvatarCircle
          circleWidth={90}
          lineWidth={7}
          battery={device.battery}
        />
      </AvatarContainer>
      <ButtonContainer>
        <NameContainer>
          <MyText fontSize={14} color="rgba(0, 0, 0, 0.3)">
            {device.name}
          </MyText>
        </NameContainer>
        <Divider />
        <Button>
          <MyText color={palette.blue_7b}>이동경로</MyText>
        </Button>
        <Divider />
        <Button
          onPress={() => {
            close();
            navigation.navigate("DeviceSetting", {
              data: device,
            });
          }}>
          <MyText color={palette.blue_7b}>기기설정</MyText>
        </Button>
        <Divider />
        <Button
          onPress={() => {
            close();
            navigation.navigate("EmergencyMissing", {
              data: device,
            });
          }}>
          <MyText color={palette.red_f0}>긴급실종</MyText>
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default HomeBottomModal;
