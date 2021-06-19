import React, { useLayoutEffect } from "react";
import styled from "styled-components/native";
import { SafetyZoneScreenNavigationProp } from "~/types/navigator";
import HelpCircle from "~/assets/svg/help-circle.svg";
import useModal from "~/hooks/useModal";
import Modal from "react-native-modal";
import ConfirmButton from "~/components/common/button/ConfirmButton";
import SafetyZoneModal from "~/components/modal/SafetyZoneModal";
import { useAppSelector } from "~/store";
import SafetyZone from "~/components/myPage/SafetyZone";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  margin-right: 25px;
`;

const Text = styled.Text`
  font-size: 20px;
  text-align: center;
  margin: 100px 0px;
`;

const SafetyZoneSetting = ({
  navigation,
}: {
  navigation: SafetyZoneScreenNavigationProp;
}) => {
  const safetyZone = useAppSelector(state => state.storage.safetyZone);
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
      {safetyZone.length > 0 && (
        <SidePaddingContainer style={{ paddingTop: 25 }}>
          {safetyZone.map(item => (
            <SafetyZone
              key={item.id}
              item={item}
              handleEdit={() => {
                navigation.navigate("SafetyZoneMap", {
                  id: item.id,
                  name: item.name,
                  camera: item.camera,
                  range: {
                    label: item.distanceLabel,
                    value: item.distanceValue,
                  },
                });
              }}
            />
          ))}
        </SidePaddingContainer>
      )}
      <Container>
        {safetyZone.length === 0 && (
          <Text>설정된 안심존이 없습니다.{"\n"}새로 설정하시겠습니까?</Text>
        )}
        {safetyZone.length < 4 && (
          <ConfirmButton
            style={{ position: "absolute", bottom: 25 }}
            onPress={() => {
              navigation.navigate("SafetyZoneMap");
            }}>
            설정
          </ConfirmButton>
        )}
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
