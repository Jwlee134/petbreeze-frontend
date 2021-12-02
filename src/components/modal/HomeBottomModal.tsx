import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import deviceApi, { Device } from "~/api/device";
import palette from "~/styles/palette";
import { HomeScreenNavigationProp } from "~/types/navigator";
import AnimatedCircularProgress from "../common/AnimatedCircularProgress";
import MyText from "../common/MyText";
import IosBottomModalButton from "./IosBottomModalButton";

interface Props {
  device: Device;
  close: () => void;
}

const AvatarContainer = styled.View`
  width: 90px;
  border-radius: 45px;
  top: -118px;
  position: absolute;
  align-self: center;
`;

const HomeBottomModal = ({ device, close }: Props) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [trigger] = deviceApi.useDeleteEmergencyMissingMutation();

  const onDeviceSettingPress = () => {
    close();
    navigation.navigate("DeviceSetting", {
      deviceID: device.id,
      avatar: device.profile_image,
      name: device.name,
    });
  };

  const onEmergencyMissingPress = () => {
    /*  if (!device.is_missed) {
      close();
      navigation.navigate("EmergencyMissingStackNav", {
        avatar: device.profile_image,
        name: device.name,
        deviceID: device.id,
      });
    } else {
      close();
      trigger(device.id);
    } */
  };

  return (
    <>
      <AvatarContainer>
        <AnimatedCircularProgress
          circleWidth={90}
          lineWidth={3.5}
          battery={device.battery}
          highlightOnEmergency={device.is_missed}
          avatar={device.profile_image}
        />
      </AvatarContainer>
      <IosBottomModalButton onPress={onDeviceSettingPress}>
        <MyText color={palette.blue_7b}>기기설정</MyText>
      </IosBottomModalButton>
      <IosBottomModalButton isLast onPress={onEmergencyMissingPress}>
        <MyText color={palette.red_f0}>실종신고</MyText>
      </IosBottomModalButton>
    </>
  );
};

export default HomeBottomModal;
