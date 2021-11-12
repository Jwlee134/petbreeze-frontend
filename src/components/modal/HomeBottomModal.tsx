import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import styled, { css } from "styled-components/native";
import deviceApi, { Device } from "~/api/device";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import palette from "~/styles/palette";
import { HomeScreenNavigationProp } from "~/types/navigator";
import AnimatedCircularProgress from "../common/AnimatedCircularProgress";
import Divider from "../common/Divider";
import MyText from "../common/MyText";

interface Props {
  device: Device;
  close: () => void;
}

const AvatarContainer = styled.View<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    width: ${rpWidth(90)}px;
    border-radius: ${rpWidth(45)}px;
    top: -${rpWidth(112)}px;
  `}
  position: absolute;
  align-self: center;
`;

const Button = styled.TouchableOpacity<{ rpWidth: RpWidth }>`
  justify-content: center;
  align-items: center;
  height: ${({ rpWidth }) => rpWidth(50)}px;
`;

const HomeBottomModal = ({ device, close }: Props) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { rpWidth } = useContext(DimensionsContext);
  const [trigger] = deviceApi.useDeleteEmergencyMissingMutation();

  return (
    <>
      <AvatarContainer rpWidth={rpWidth}>
        <AnimatedCircularProgress
          circleWidth={90}
          lineWidth={7}
          battery={device.battery}
          highlightOnEmergency={device.is_missed}
          avatar={device.profile_image}
        />
      </AvatarContainer>
      <Button
        rpWidth={rpWidth}
        onPress={() => {
          close();
          navigation.navigate("DeviceSetting", {
            deviceID: device.id,
            avatar: device.profile_image,
            name: device.name,
          });
        }}>
        <MyText color={palette.blue_7b}>기기설정</MyText>
      </Button>
      <Divider />
      {device.is_missed ? (
        <>
          <Button
            rpWidth={rpWidth}
            onPress={() => {
              close();
              navigation.navigate("EmergencyMissingStackNav", {
                avatar: device.profile_image,
                name: device.name,
                deviceID: device.id,
                isModify: true,
              });
            }}>
            <MyText color={palette.red_f0}>긴급실종 수정</MyText>
          </Button>
          <Divider />
        </>
      ) : null}
      <Button
        rpWidth={rpWidth}
        onPress={() => {
          if (!device.is_missed) {
            close();
            navigation.navigate("EmergencyMissingStackNav", {
              avatar: device.profile_image,
              name: device.name,
              deviceID: device.id,
            });
          } else {
            close();
            trigger(device.id);
          }
        }}>
        <MyText color={palette.red_f0}>
          {device.is_missed ? "찾았어요" : "긴급실종"}
        </MyText>
      </Button>
    </>
  );
};

export default HomeBottomModal;
