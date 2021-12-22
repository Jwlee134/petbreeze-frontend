import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import { Device } from "~/api/device";
import { HomeScreenNavigationProp } from "~/types/navigator";
import AnimatedCircularProgress from "../common/AnimatedCircularProgress";
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

  const onDeviceSettingPress = () => {
    close();
    navigation.navigate("DeviceSetting", {
      deviceID: device.id,
      avatar: device.profile_image,
      name: device.name,
    });
  };

  const onMissigReportPress = () => {
    close();
    if (!device.is_missed) {
      navigation.navigate("MissingReportStackNav", {
        avatar: device.profile_image,
        name: device.name,
        deviceID: device.id,
      });
    } else {
      navigation.navigate("MissingReportInfo", {
        avatar: device.profile_image,
        name: device.name,
        deviceID: device.id,
      });
    }
  };

  return (
    <>
      <AvatarContainer>
        <AnimatedCircularProgress
          circleWidth={90}
          lineWidth={3.5}
          battery={device.battery}
          avatar={device.profile_image}
        />
      </AvatarContainer>
      <IosBottomModalButton
        onPress={onDeviceSettingPress}
        title="기기설정"
        color="blue"
      />
      <IosBottomModalButton
        isLast
        onPress={onMissigReportPress}
        title="실종신고"
        color="red"
      />
    </>
  );
};

export default HomeBottomModal;
