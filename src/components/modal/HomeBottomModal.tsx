import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components/native";
import { Device } from "~/api/device";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import palette from "~/styles/palette";
import { HomeScreenNavigationProp } from "~/types/navigator";
import AnimatedCircularProgress from "../common/AnimatedCircularProgress";
import Divider from "../common/Divider";
import MyText from "../common/MyText";

interface IProps {
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

const HomeBottomModal = ({ device, close }: IProps) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useDispatch();
  const { rpWidth } = useContext(DimensionsContext);

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
      <Button rpWidth={rpWidth}>
        <MyText color={palette.blue_7b}>이동경로</MyText>
      </Button>
      <Divider />
      <Button
        rpWidth={rpWidth}
        onPress={() => {
          close();
          navigation.navigate("DeviceSetting", {
            deviceID: device.id,
          });
        }}>
        <MyText color={palette.blue_7b}>기기설정</MyText>
      </Button>
      <Divider />
      <Button
        rpWidth={rpWidth}
        onPress={() => {
          close();
          /* dispatch(
            formActions.setDefaultValue({
              name: device.name,
              breed: device.breed,
              characteristic: device.etc,
            }),
          ); */
          navigation.navigate("EmergencyMissingStackNav", {
            device,
          });
        }}>
        <MyText color={palette.red_f0}>긴급실종</MyText>
      </Button>
    </>
  );
};

export default HomeBottomModal;
