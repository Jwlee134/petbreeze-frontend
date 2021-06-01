import React, { useLayoutEffect } from "react";
import styled from "styled-components/native";
import { SafetyZoneScreenNavigationProp } from "~/types/navigator";
import HelpCircle from "~/assets/svg/help-circle.svg";
import useModal from "~/hooks/useModal";
import Modal from "react-native-modal";
import ConfirmButton from "~/components/common/button/ConfirmButton";
import SafetyZoneModal from "~/components/modal/SafetyZoneModal";

const Container = styled.View`
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  margin-right: 25px;
`;

const Text = styled.Text`
  font-size: 20px;
  text-align: center;
  margin: 90px 0px;
`;

const SafetyZoneSetting = ({
  navigation,
}: {
  navigation: SafetyZoneScreenNavigationProp;
}) => {
  const { open, modalProps, CenterModalComponent } = useModal({
    type: "center",
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={open} activeOpacity={0.5}>
          <HelpCircle />
        </Button>
      ),
    });
  }, [navigation, open]);

  return (
    <>
      <Container>
        <Text>설정된 안심존이 없습니다. {"\n"}새로 설정하시겠습니까?</Text>
        <ConfirmButton onPress={() => {}}>설정</ConfirmButton>
      </Container>
      <Modal {...modalProps}>
        <CenterModalComponent headerTitle="안심존이란?">
          <SafetyZoneModal />
        </CenterModalComponent>
      </Modal>
    </>
  );
};

export default SafetyZoneSetting;
