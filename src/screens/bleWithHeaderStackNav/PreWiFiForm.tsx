import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import WiFi from "~/assets/svg/wifi/wifi-blue.svg";
import Button from "~/components/common/Button";
import MyText from "~/components/common/MyText";
import ParagraphWithCheckCircle from "~/components/ble/ParagraphWithCheckCircle";
import useModal from "~/hooks/useModal";
import { PreWiFiFormScreenNavigationProp } from "~/types/navigator";
import Modal from "react-native-modal";
import CommonCenterModal from "~/components/modal/CommonCenterModal";
import { centerModalOutTiming } from "~/styles/constants";

const TopContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BottomContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const PreWiFiForm = ({
  navigation,
}: {
  navigation: PreWiFiFormScreenNavigationProp;
}) => {
  const { open, close, modalProps } = useModal();

  return (
    <>
      <TopContainer>
        <WiFi width={82} height={64} />
        <MyText style={{ textAlign: "center", marginTop: 55 }} fontSize={24}>
          WiFi를{"\n"}등록해주세요.
        </MyText>
      </TopContainer>
      <BottomContainer>
        <View>
          <ParagraphWithCheckCircle isWhiteBackground>
            실내에서는 WiFi 모드가 보다 정확합니다.
          </ParagraphWithCheckCircle>
          <ParagraphWithCheckCircle isWhiteBackground>
            WiFi 모드가 배터리를 아낄 수 있습니다.
          </ParagraphWithCheckCircle>
        </View>
        <View>
          <Button
            onPress={() => {
              navigation.navigate("WiFiForm");
            }}
            style={{
              marginBottom: 12,
            }}>
            다음
          </Button>
          <Button
            onPress={open}
            useCommonMarginBottom
            useBottomInset
            backgroundColor="transparent"
            fontColor="rgba(0, 0, 0, 0.5)">
            건너뛰기
          </Button>
        </View>
      </BottomContainer>
      <Modal {...modalProps({ type: "center" })}>
        <CommonCenterModal
          close={close}
          onRightButtonPress={() => {
            close();
            setTimeout(() => {
              navigation.navigate("PreSafetyZone");
            }, centerModalOutTiming);
          }}
          title="잠깐!"
          description={`와이파이 미등록 시,\n배터리 소모가 크게 증가할 수 있습니다.`}
          rightButtonText="건너뛰기"
        />
      </Modal>
    </>
  );
};

export default PreWiFiForm;
