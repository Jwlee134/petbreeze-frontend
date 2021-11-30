import React, { useEffect } from "react";
import { View } from "react-native";
import Button from "~/components/common/Button";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import Input from "~/components/common/Input";
import InputTitle from "~/components/common/InputTitle";
import Modal from "react-native-modal";
import CommonCenterModal from "~/components/modal/CommonCenterModal";
import { useDispatch } from "react-redux";
import { deviceSettingActions } from "~/store/deviceSetting";
import { WiFiFormScreenNavigationProp } from "~/types/navigator";
import { useAppSelector } from "~/store";
import useModal from "~/hooks/useModal";
import WifiManager from "react-native-wifi-reborn";
import { centerModalOutTiming } from "~/styles/constants";
import { bleActions } from "~/store/ble";

const WiFiForm = ({
  navigation,
}: {
  navigation: WiFiFormScreenNavigationProp;
}) => {
  const dispatch = useDispatch();
  const { open, close, modalProps } = useModal();
  const { ssid, password } = useAppSelector(
    state => state.deviceSetting.wifi.draft,
  );
  const disconnected = useAppSelector(state => state.ble.disconnected);

  useEffect(() => {
    if (!ssid) {
      WifiManager.getCurrentWifiSSID().then(ssid => {
        dispatch(
          deviceSettingActions.setWifi({
            draft: { ssid },
          }),
        );
      });
    }
  }, []);

  const onChangeSsid = (text: string) =>
    dispatch(
      deviceSettingActions.setWifi({
        draft: { ssid: text },
      }),
    );

  const onChangePassword = (text: string) =>
    dispatch(
      deviceSettingActions.setWifi({
        draft: { password: text },
      }),
    );

  const onNextButtonPress = () => {
    if (disconnected) {
      navigation.navigate("PreSafetyZone");
    } else {
      dispatch(bleActions.setStatus("connectingToWifi"));
      navigation.navigate("BleWithoutHeaderStackNav", {
        initialRouteName: "BleLoading",
        loadingText: "연결 확인중",
      });
    }
  };

  const onSkip = () => {
    close();
    setTimeout(() => {
      navigation.navigate("PreSafetyZone");
    }, centerModalOutTiming);
  };

  return (
    <>
      <KeyboardAwareScrollContainer isSpaceBetween>
        <View
          style={{
            marginTop: 90,
            paddingHorizontal: 43,
            marginBottom: 200,
          }}>
          <InputTitle>WiFi 이름</InputTitle>
          <Input value={ssid} maxLength={31} onChangeText={onChangeSsid} />
          <InputTitle>암호</InputTitle>
          <Input
            value={password}
            maxLength={63}
            onChangeText={onChangePassword}
          />
        </View>
        <View>
          <Button
            disabled={!ssid || (!!password && password.length < 8)}
            onPress={onNextButtonPress}
            style={{
              marginBottom: 12,
            }}>
            다음
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
      <Modal {...modalProps({ type: "center" })}>
        <CommonCenterModal
          close={close}
          onRightButtonPress={onSkip}
          title="잠깐!"
          description={`와이파이 미등록 시,\n배터리 소모가 크게 증가할 수 있습니다.`}
          rightButtonText="건너뛰기"
        />
      </Modal>
    </>
  );
};

export default WiFiForm;
