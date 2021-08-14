import React from "react";
import styled from "styled-components/native";
import { IDevice } from "~/store/device";
import { rpWidth } from "~/styles";
import palette from "~/styles/palette";
import DeviceAvatarCircle from "../common/DeviceAvatarCircle";
import MyText from "../common/MyText";

interface IProps {
  device: IDevice;
}

const Container = styled.View`
  align-items: center;
`;

const ButtonContainer = styled.View`
  background-color: ${palette.gray_f3};
  border-radius: 17px;
  width: 100%;
  margin-top: ${rpWidth(22)}px;
`;

const Divider = styled.View`
  width: 100%;
  height: 0.3px;
  background-color: rgba(0, 0, 0, 0.3);
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

const HomeBottomModal = ({ device }: IProps) => {
  return (
    <Container>
      <DeviceAvatarCircle battery={device.battery} />
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
        <Button>
          <MyText color={palette.blue_7b}>기기설정</MyText>
        </Button>
        <Divider />
        <Button>
          <MyText color={palette.red_f0}>긴급실종</MyText>
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default HomeBottomModal;
