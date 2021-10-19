import React, { useContext, useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import MyText from "~/components/common/MyText";

import LocationInfoCollectionPeriod from "~/components/myPage/deviceSetting/LocationInfoCollectionPeriod";
import SafetyZone from "~/components/myPage/deviceSetting/SafetyZone";
import { DeviceSettingScreenProps } from "~/types/navigator";
import Divider from "~/components/common/Divider";
import CustomHeader from "~/components/navigator/CustomHeader";
import palette from "~/styles/palette";
import WiFi from "~/components/myPage/deviceSetting/WiFi";
import ProfileSection from "~/components/myPage/deviceSetting/ProfileSection";
import { store } from "~/store";
import { DimensionsContext } from "~/context/DimensionsContext";
import deviceApi from "~/api/device";
import { useDispatch } from "react-redux";
import { deviceSettingActions } from "~/store/deviceSetting";
import Family from "~/components/myPage/deviceSetting/Family";

const DeviceSetting = ({
  navigation,
  route: {
    params: { deviceID },
  },
}: DeviceSettingScreenProps) => {
  const { rpWidth } = useContext(DimensionsContext);
  const [isEdit, setIsEdit] = useState(false);
  const { data: settings } = deviceApi.useGetDeviceSettingQuery(deviceID);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!settings) return;
    if (settings.Period) {
      dispatch(
        deviceSettingActions.setLocationInfoCollectionPeriod(settings.Period),
      );
    }
    if (settings.Area.length) {
      dispatch(
        deviceSettingActions.setSafetyZone({
          result: settings.Area,
        }),
      );
    }
    if (settings.WiFi.length) {
      dispatch(
        deviceSettingActions.setWifi({
          result: settings.WiFi,
        }),
      );
    }
  }, [settings]);

  const handleSubmit = () => {
    const {
      locationInfoCollectionPeriod,
      safetyZone: { result: safetyZone },
      wifi: { result: wifi },
    } = store.getState().deviceSetting;

    setIsEdit(false);
  };

  return (
    <>
      <CustomHeader
        RightButton={() => (
          <TouchableOpacity
            onPress={() => {
              if (!isEdit) {
                setIsEdit(true);
              } else {
                handleSubmit();
              }
            }}>
            <MyText color={palette.blue_7b}>{!isEdit ? "편집" : "완료"}</MyText>
          </TouchableOpacity>
        )}
        navigation={navigation}>
        기기설정
      </CustomHeader>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: rpWidth(35),
        }}>
        <ProfileSection deviceID={deviceID} />
        <Divider isHairline={false} />
        <LocationInfoCollectionPeriod />
        <View style={{ paddingHorizontal: rpWidth(16) }}>
          <Divider />
        </View>
        <SafetyZone isEdit={isEdit} />
        <View style={{ paddingHorizontal: rpWidth(16) }}>
          <Divider />
        </View>
        <WiFi isEdit={isEdit} />
        <View style={{ paddingHorizontal: rpWidth(16) }}>
          <Divider />
        </View>
        <Family isEdit={isEdit} deviceID={deviceID} />
      </ScrollView>
    </>
  );
};

export default DeviceSetting;
