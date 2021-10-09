import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import Button from "~/components/common/Button";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import Input from "~/components/common/Input";
import InputTitle from "~/components/common/InputTitle";
import useModal from "~/hooks/useModal";
import { WiFiFormScreenNavigationProp } from "~/types/navigator";
import Modal from "react-native-modal";
import CommonCenterModal from "~/components/modal/CommonCenterModal";
import { useDispatch } from "react-redux";
import { bleActions } from "~/store/ble";
import { navigatorActions } from "~/store/navigator";
import { useAppSelector } from "~/store";
import { deviceSettingActions } from "~/store/deviceSetting";
import WifiManager from "react-native-wifi-reborn";
import { DimensionsContext } from "~/context/DimensionsContext";

const WiFiForm = ({
  navigation,
}: {
  navigation: WiFiFormScreenNavigationProp;
}) => {
  const { open, close, modalProps } = useModal();
  const { name, password } = useAppSelector(
    state => state.deviceSetting.wifi.draft,
  );
  const dispatch = useDispatch();
  const { rpWidth } = useContext(DimensionsContext);
  const disconnected = useAppSelector(state => state.ble.disconnected);

  useEffect(() => {
    WifiManager.getCurrentWifiSSID().then(ssid => {
      dispatch(
        deviceSettingActions.setWifi({
          draft: { name: ssid },
        }),
      );
    });
  }, []);

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
            value={name}
            maxLength={31}
            onChangeText={text =>
              dispatch(
                deviceSettingActions.setWifi({
                  draft: { name: text },
                }),
              )
            }
          />
          <InputTitle>암호</InputTitle>
          <Input
            value={password}
            maxLength={63}
            onChangeText={text =>
              dispatch(
                deviceSettingActions.setWifi({
                  draft: { password: text },
                }),
              )
            }
          />
        </View>
        <View>
          <Button
            disabled={!name || (!!password && password.length < 8)}
            onPress={() => {
              if (disconnected) {
                /* api 요청만 */
                console.log("api 요청 보내기");
              } else {
                dispatch(bleActions.setStatus("connectingToWifi"));
                dispatch(navigatorActions.setLoadingText("연결 확인중"));
                dispatch(
                  navigatorActions.setInitialRoute({
                    initialBleWithoutHeaderStackNavRouteName: "BleLoading",
                  }),
                );
                navigation.replace("BleWithoutHeaderStackNav");
              }
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
