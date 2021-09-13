import React, { useState } from "react";
import { View } from "react-native";
import Button from "~/components/common/Button";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import Input from "~/components/common/Input";
import InputTitle from "~/components/common/InputTitle";
import useModal from "~/hooks/useModal";
import { rpWidth } from "~/styles";
import { WiFiFormScreenNavigationProp } from "~/types/navigator";
import Modal from "react-native-modal";
import CommonCenterModal from "~/components/modal/CommonCenterModal";
import { useDispatch } from "react-redux";
import { bleActions } from "~/store/ble";
import { navigatorActions } from "~/store/navigator";
import { useAppSelector } from "~/store";
import { formActions } from "~/store/form";

const WiFiForm = ({
  navigation,
}: {
  navigation: WiFiFormScreenNavigationProp;
}) => {
  const { open, close, modalProps } = useModal();
  const { wifiName, wifiPw } = useAppSelector(state => state.form);
  const dispatch = useDispatch();

  return (
    <>
      <KeyboardAwareScrollContainer isSpaceBetween>
        <View
          style={{
            marginTop: rpWidth(90),
            paddingHorizontal: rpWidth(43),
            marginBottom: rpWidth(200),
          }}>
          <InputTitle>WiFi 이름</InputTitle>
          <Input
            value={wifiName}
            onChangeText={text => dispatch(formActions.setWifiName(text))}
          />
          <InputTitle>암호</InputTitle>
          <Input
            value={wifiPw}
            onChangeText={text => dispatch(formActions.setWifiPw(text))}
          />
        </View>
        <View>
          <Button
            disabled={!wifiName || !wifiPw}
            onPress={() => {
              dispatch(navigatorActions.setLoadingText("연결 확인중"));
              dispatch(
                navigatorActions.setInitialRoute({
                  initialBleWithoutHeaderStackNavRouteName: "BleLoading",
                }),
              );
              navigation.replace("BleWithoutHeaderStackNav");
              dispatch(bleActions.setStatus("connectingToWifi"));
            }}
            style={{
              marginBottom: rpWidth(12),
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
          onRightButtonPress={() => {
            close();
            setTimeout(() => {
              navigation.replace("PreSafetyZone");
            }, 200);
          }}
          title="잠깐!"
          description={`와이파이 미등록 시,\n배터리 소모가 크게 증가할 수 있습니다.`}
          rightButtonText="건너뛰기"
        />
      </Modal>
    </>
  );
};

export default WiFiForm;
