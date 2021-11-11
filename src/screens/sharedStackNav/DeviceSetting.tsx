import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import MyText from "~/components/common/MyText";

import Period from "~/components/myPage/deviceSetting/Period";
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
import imageHandler from "~/utils/imageHandler";
import { serverImageUri } from "~/constants";

const DeviceSetting = ({
  navigation,
  route: {
    params: { deviceID, avatar, name },
  },
}: DeviceSettingScreenProps) => {
  const { rpWidth } = useContext(DimensionsContext);
  const [isEdit, setIsEdit] = useState(false);
  const { data: settings } = deviceApi.useGetDeviceSettingQuery(deviceID, {
    refetchOnMountOrArgChange: true,
  });
  const [updateSetting, { isLoading: updatingDeviceSetting }] =
    deviceApi.useUpdateDeviceSettingMutation();
  const [updateSafetyZoneThumbnail, { isLoading: updatingThumbnail }] =
    deviceApi.useUpdateSafetyZoneThumbnailMutation();
  const dispatch = useDispatch();

  const isLoading = updatingDeviceSetting || updatingThumbnail;

  useEffect(() => {
    if (!settings) return;
    const {
      safetyZone: { result: safetyZone },
      wifi: { result: wifi },
    } = store.getState().deviceSetting;
    if (settings.Period) {
      dispatch(deviceSettingActions.setPeriod(settings.Period));
    }
    if (settings.Area.length) {
      const format = safetyZone.map(area => {
        const index = settings.Area.findIndex(
          areaRes => areaRes.id === area.id,
        );
        if (index === -1) {
          return area;
        }
        return settings.Area[index];
      });
      dispatch(deviceSettingActions.setSafetyZone({ result: format }));
    }
    if (settings.WiFi.length) {
      const format = wifi.map(wifi => {
        const index = settings.WiFi.findIndex(
          wifiRes => wifiRes.id === wifi.id,
        );
        if (index === -1) {
          return wifi;
        }
        return settings.WiFi[index];
      });
      dispatch(deviceSettingActions.setWifi({ result: format }));
    }
  }, [settings]);

  useEffect(() => {
    return () => {
      dispatch(deviceSettingActions.resetResults());
    };
  }, []);

  const handleSubmit = async () => {
    if (isLoading) return;
    const {
      period,
      safetyZone: { result: safetyZone },
      wifi: { result: wifi },
    } = store.getState().deviceSetting;

    const areaWithoutImage = safetyZone.map(area => ({
      address: area.address,
      data: area.data,
      id: area.id,
      name: area.name,
    }));

    try {
      await updateSetting({
        deviceID,
        body: {
          Area: areaWithoutImage,
          Period: period as number,
          WiFi: wifi,
        },
      }).unwrap();
    } catch {
      return;
    }

    const areaImages = safetyZone
      .map(area => ({
        id: area.id,
        data: area.image,
      }))
      .filter(area => !area.data.includes(serverImageUri) && area.data);

    if (areaImages.length) {
      const generateKey = (i: number) => `safety_area_${i}_thumbnail`;
      const formData = imageHandler.handleFormData(areaImages, generateKey);
      try {
        await updateSafetyZoneThumbnail({ deviceID, body: formData }).unwrap();
      } catch {
        return;
      }
    }

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
            {isLoading ? (
              <ActivityIndicator color={palette.blue_7b} size={rpWidth(16)} />
            ) : (
              <MyText color={palette.blue_7b}>
                {!isEdit ? "편집" : "완료"}
              </MyText>
            )}
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
        <ProfileSection deviceID={deviceID} avatar={avatar} name={name} />
        <Divider isHairline={false} />
        <Period deviceID={deviceID} />
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
