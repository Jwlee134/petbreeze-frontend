import React, { useContext } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import WiFi from "~/assets/svg/wifi/wifi-blue.svg";
import Button from "~/components/common/Button";
import MyText from "~/components/common/MyText";
import ParagraphWithCheckCircle from "~/components/common/ParagraphWithCheckCircle";
import useModal from "~/hooks/useModal";
import { PreWiFiFormScreenNavigationProp } from "~/types/navigator";
import CommonCenterModal from "~/components/modal/CommonCenterModal";
import { centerModalOutTiming } from "~/styles/constants";
import { DimensionsContext } from "~/context/DimensionsContext";
import useUpdateDeviceSetting from "~/hooks/useUpdateDeviceSetting";
import { useAppSelector } from "~/store";

const TopContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
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
  const { rpHeight } = useContext(DimensionsContext);
  const { open, close, modalProps } = useModal();
  const deviceID = useAppSelector(state => state.ble.deviceID);
  const { sendRequest, isLoading } = useUpdateDeviceSetting(deviceID);
  const safety_areas = useAppSelector(
    state => state.deviceSetting.result.safety_areas,
  );

  const onNext = () => navigation.navigate("WiFiForm");

  const onSkip = async () => {
    await sendRequest(safety_areas);
    close();
    setTimeout(() => {
      navigation.navigate("RegisterProfileFirst");
    }, centerModalOutTiming);
  };

  return (
    <>
      <TopContainer>
        <WiFi width={rpHeight(82)} height={rpHeight(64)} />
        <MyText
          style={{
            textAlign: "center",
            marginTop: rpHeight(55),
            marginBottom: rpHeight(23),
          }}
          fontSize={24}>
          안심존의 WiFi를{"\n"}등록해주세요.
        </MyText>
      </TopContainer>
      <BottomContainer>
        <View style={{ marginTop: rpHeight(61) }}>
          <ParagraphWithCheckCircle isWhiteBackground>
            WiFi 모드에서 실내 위치 감지가 더 정확합니다.
          </ParagraphWithCheckCircle>
          <ParagraphWithCheckCircle isWhiteBackground>
            WiFi 모드에서 배터리가 더 오래 지속됩니다.
          </ParagraphWithCheckCircle>
        </View>
        <View>
          <Button onPress={onNext} style={{ marginBottom: 12 }}>
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
      <CommonCenterModal
        close={close}
        modalProps={modalProps}
        onRightButtonPress={onSkip}
        title="잠깐!"
        description={`와이파이 미등록 시,\n배터리 소모가 크게 증가할 수 있습니다.`}
        isLoading={isLoading}
        rightButtonText="건너뛰기"
      />
    </>
  );
};

export default PreWiFiForm;
