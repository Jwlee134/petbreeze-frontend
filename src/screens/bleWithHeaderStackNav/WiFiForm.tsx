import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
} from "react";
import { View } from "react-native";
import Button from "~/components/common/Button";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import Input from "~/components/common/Input";
import InputTitle from "~/components/common/InputTitle";
import CommonCenterModal from "~/components/modal/CommonCenterModal";
import { useDispatch } from "react-redux";
import { deviceSettingActions } from "~/store/deviceSetting";
import { WiFiFormScreenNavigationProp } from "~/types/navigator";
import { useAppSelector } from "~/store";
import useModal from "~/hooks/useModal";
import WifiManager from "react-native-wifi-reborn";
import {
  centerModalOutTiming,
  headerHeight,
  minSpace,
  textLoadingIndicatorSize,
} from "~/styles/constants";
import styled from "styled-components/native";
import palette from "~/styles/palette";
import MyText from "~/components/common/MyText";
import { DimensionsContext } from "~/context/DimensionsContext";
import useUpdateDeviceSetting from "~/hooks/useUpdateDeviceSetting";
import LoadingIndicator from "~/components/lottie/LoadingIndicator";

const TopContainer = styled.View`
  padding: 0 43px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export interface WiFiFormGoBack {
  goBack: () => void;
}

const WiFiForm = forwardRef<
  WiFiFormGoBack,
  {
    navigation: WiFiFormScreenNavigationProp;
  }
>(({ navigation }, ref) => {
  const dispatch = useDispatch();
  const { open, close, modalProps } = useModal();
  const { ssid, password } = useAppSelector(
    state => state.deviceSetting.draft.wifi,
  );
  const { rpHeight } = useContext(DimensionsContext);
  const deviceID = useAppSelector(state => state.ble.deviceID);
  const { sendRequest, isLoading } = useUpdateDeviceSetting(deviceID);
  const safety_areas = useAppSelector(
    state => state.deviceSetting.result.safety_areas,
  );

  useImperativeHandle(ref, () => ({
    goBack: () => navigation.goBack(),
  }));

  useEffect(() => {
    if (!ssid) {
      WifiManager.getCurrentWifiSSID().then(ssid => {
        dispatch(deviceSettingActions.setWiFiDraft({ ssid }));
      });
    }
  }, []);

  const onChangeSsid = (text: string) =>
    dispatch(deviceSettingActions.setWiFiDraft({ ssid: text }));

  const onChangePassword = (text: string) =>
    dispatch(deviceSettingActions.setWiFiDraft({ password: text }));

  const onNextButtonPress = async () => {
    /* 와이파이 연결 테스트 */
    await sendRequest(safety_areas);
    navigation.navigate("RegisterProfileFirst");
  };

  const onSkip = async () => {
    await sendRequest(safety_areas);
    close();
    setTimeout(() => {
      navigation.navigate("RegisterProfileFirst");
    }, centerModalOutTiming);
  };

  return (
    <>
      <KeyboardAwareScrollContainer isSpaceBetween>
        <TopContainer style={{ marginTop: rpHeight(109) }}>
          <InputTitle style={{ marginTop: headerHeight + minSpace }}>
            WiFi 이름
          </InputTitle>
          <Input
            value={ssid || ""}
            maxLength={31}
            onChangeText={onChangeSsid}
          />
          <InputTitle>암호</InputTitle>
          <Input
            value={password || ""}
            maxLength={63}
            onChangeText={onChangePassword}
          />
          <RowContainer>
            <MyText
              color={palette.blue_7b}
              style={{ marginLeft: 4, marginRight: 14 }}>
              •
            </MyText>
            <MyText fontWeight="light" color="rgba(0, 0, 0, 0.5)" fontSize={14}>
              2G WiFi만 등록 가능합니다.
            </MyText>
          </RowContainer>
        </TopContainer>
        <View style={{ marginTop: minSpace }}>
          <Button
            disabled={!ssid || (!!password && password.length < 8)}
            onPress={onNextButtonPress}
            style={{ marginBottom: 12 }}>
            {isLoading ? (
              <LoadingIndicator size={textLoadingIndicatorSize} />
            ) : (
              "확인"
            )}
          </Button>
          <Button
            onPress={open}
            useCommonMarginBottom
            backgroundColor="transparent"
            fontColor="rgba(0, 0, 0, 0.5)">
            건너뛰기
          </Button>
        </View>
      </KeyboardAwareScrollContainer>
      <CommonCenterModal
        close={close}
        modalProps={modalProps}
        onRightButtonPress={onSkip}
        title="잠깐!"
        titleFontWeight="medium"
        description={`와이파이 미등록 시,\n배터리 소모가 크게 증가할 수 있습니다.`}
        rightButtonText={
          isLoading ? (
            <LoadingIndicator size={textLoadingIndicatorSize} />
          ) : (
            "건너뛰기"
          )
        }
      />
    </>
  );
});

export default WiFiForm;
