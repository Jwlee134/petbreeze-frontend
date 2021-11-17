import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import WiFi from "~/assets/svg/wifi/wifi-blue.svg";
import Button from "~/components/common/Button";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import Input from "~/components/common/Input";
import InputTitle from "~/components/common/InputTitle";
import { DimensionsContext } from "~/context/DimensionsContext";
import { useAppSelector } from "~/store";
import { deviceSettingActions } from "~/store/deviceSetting";
import { UpdateWiFiScreenNavigationProp } from "~/types/navigator";

const UpdateWiFi = ({
  navigation,
}: {
  navigation: UpdateWiFiScreenNavigationProp;
}) => {
  const { ssid, pw } = useAppSelector(state => state.deviceSetting.wifi.draft);
  const dispatch = useDispatch();
  const { rpWidth } = useContext(DimensionsContext);

  useEffect(() => {
    return () => {
      dispatch(deviceSettingActions.setWifi(null));
    };
  }, []);

  return (
    <KeyboardAwareScrollContainer isSpaceBetween>
      <View
        style={{ paddingHorizontal: rpWidth(43), marginBottom: rpWidth(50) }}>
        <WiFi
          style={{
            alignSelf: "center",
            marginTop: rpWidth(91),
            marginBottom: rpWidth(53),
          }}
          width={rpWidth(82)}
          height={rpWidth(64)}
        />
        <InputTitle>WiFi 이름</InputTitle>
        <Input
          value={ssid}
          maxLength={31}
          onChangeText={text =>
            dispatch(
              deviceSettingActions.setWifi({
                draft: { ssid: text },
              }),
            )
          }
        />
        <InputTitle>암호</InputTitle>
        <Input
          value={pw}
          maxLength={63}
          onChangeText={text =>
            dispatch(
              deviceSettingActions.setWifi({
                draft: { pw: text },
              }),
            )
          }
        />
      </View>
      <Button
        onPress={() => {
          dispatch(
            deviceSettingActions.updateWifiResult({
              ssid,
              pw,
            }),
          );
          navigation.goBack();
        }}
        disabled={!ssid || (!!pw && pw.length < 8)}
        useCommonMarginBottom>
        확인
      </Button>
    </KeyboardAwareScrollContainer>
  );
};

export default UpdateWiFi;
