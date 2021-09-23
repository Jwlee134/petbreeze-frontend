import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
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
  const { name, password } = useAppSelector(
    state => state.deviceSetting.wifi.draft,
  );
  const dispatch = useDispatch();
  const { rpWidth } = useContext(DimensionsContext);

  useEffect(() => {
    return () => {
      dispatch(deviceSettingActions.setWifi(null));
    };
  }, []);

  return (
    <KeyboardAwareScrollContainer isSpaceBetween>
      <View style={{ paddingHorizontal: rpWidth(43) }}>
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
          value={name}
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
          onChangeText={text =>
            dispatch(
              deviceSettingActions.setWifi({
                draft: { password: text },
              }),
            )
          }
        />
      </View>
      <Button
        onPress={() => {
          dispatch(
            deviceSettingActions.updateWifiResult({
              name,
              password,
            }),
          );
          navigation.goBack();
        }}
        disabled={!name || !password}
        useCommonMarginBottom>
        확인
      </Button>
    </KeyboardAwareScrollContainer>
  );
};

export default UpdateWiFi;
