import React, { useEffect } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import Button from "~/components/common/Button";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import Input from "~/components/common/Input";
import InputTitle from "~/components/common/InputTitle";
import MyText from "~/components/common/MyText";
import CustomHeader from "~/components/navigator/CustomHeader";
import useWiFi from "~/hooks/useWiFi";
import { useAppSelector } from "~/store";
import { deviceSettingActions } from "~/store/deviceSetting";
import { MIN_SPACE } from "~/styles/constants";
import palette from "~/styles/palette";
import { UpdateWiFiScreenProps } from "~/types/navigator";

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const UpdateWiFi = ({
  navigation,
  route: {
    params: { id },
  },
}: UpdateWiFiScreenProps) => {
  const { getCurrentWiFiSSID, connectToProtectedSSID, isConnecting } =
    useWiFi();
  const { ssid, password } = useAppSelector(
    state => state.deviceSetting.draft.wifi,
  );
  const dispatch = useDispatch();

  const onButtonPress = async () => {
    try {
      await connectToProtectedSSID(ssid, password);
      dispatch(deviceSettingActions.updateWiFiResult(id));
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!ssid) getCurrentWiFiSSID();
    return () => {
      dispatch(deviceSettingActions.setWiFiDraft(null));
    };
  }, []);

  return (
    <>
      <CustomHeader title="와이파이" navigation={navigation} />
      <KeyboardAwareScrollContainer isSpaceBetween>
        <View
          style={{
            paddingTop: 29,
            paddingHorizontal: 43,
            marginBottom: MIN_SPACE,
          }}>
          <InputTitle>WiFi 이름</InputTitle>
          <Input
            value={ssid || ""}
            maxLength={31}
            onChangeText={text =>
              dispatch(deviceSettingActions.setWiFiDraft({ ssid: text }))
            }
          />
          <InputTitle>암호</InputTitle>
          <Input
            value={password || ""}
            maxLength={63}
            onChangeText={text =>
              dispatch(deviceSettingActions.setWiFiDraft({ password: text }))
            }
          />
          <RowContainer>
            <MyText
              color={palette.blue_7b}
              style={{ marginLeft: 4, marginRight: 14 }}>
              •
            </MyText>
            <MyText fontWeight="light" color="rgba(0, 0, 0, 0.5)" fontSize={14}>
              5G WiFi는 기기에서 인식하지 못합니다.
            </MyText>
          </RowContainer>
        </View>
        <Button
          isLoading={isConnecting}
          onPress={onButtonPress}
          disabled={!ssid || (!!password && password.length < 8)}
          useCommonMarginBottom>
          확인
        </Button>
      </KeyboardAwareScrollContainer>
    </>
  );
};

export default UpdateWiFi;
