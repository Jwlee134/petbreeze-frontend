import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import MyText from "~/components/common/MyText";
import Period from "~/components/myPage/deviceSetting/Period";
import SafetyZone from "~/components/myPage/deviceSetting/SafetyZone";
import Divider from "~/components/common/Divider";
import CustomHeader from "~/components/navigator/CustomHeader";
import palette from "~/styles/palette";
import WiFi from "~/components/myPage/deviceSetting/WiFi";
import ProfileSection from "~/components/myPage/deviceSetting/ProfileSection";
import Family from "~/components/myPage/deviceSetting/Family";
import { DeviceSettingScreenProps } from "~/types/navigator";
import { commonActions } from "~/store/common";
import { useDispatch } from "react-redux";
import deviceApi, { AreaResponse } from "~/api/device";
import { deviceSettingActions } from "~/store/deviceSetting";
import { store } from "~/store";
import { serverImageUri } from "~/constants";
import imageHandler from "~/utils/imageHandler";

const DeviceSetting = ({
  navigation,
  route: {
    params: { deviceID, avatar, name },
  },
}: DeviceSettingScreenProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const timeout = useRef<NodeJS.Timeout>();
  const dispatch = useDispatch();

  const { data: settings } = deviceApi.useGetDeviceSettingQuery(deviceID, {
    refetchOnMountOrArgChange: true,
  });
  const [updateSetting, { isLoading: updatingDeviceSetting }] =
    deviceApi.useUpdateDeviceSettingMutation();
  const [updateSafetyZoneThumbnail, { isLoading: updatingThumbnail }] =
    deviceApi.useUpdateSafetyZoneThumbnailMutation();

  const isLoading = updatingDeviceSetting || updatingThumbnail;

  // 스토어에는 id 0, 1, 2 전부 있는데 response에는 내용이 있는 id만 오므로 포맷
  const formatResponse = (res: AreaResponse[]) => {
    const {
      safetyZone: { result: safetyZone },
    } = store.getState().deviceSetting;
    return safetyZone.map(area => {
      const index = res.findIndex(
        areaRes => areaRes.safety_area_id === area.safety_area_id,
      );
      if (index === -1) {
        return area;
      }
      return res[index];
    });
  };

  // 마운트 시 스토어에 response 저장
  useEffect(() => {
    if (!settings) return;
    const {
      wifi: { result: wifi },
    } = store.getState().deviceSetting;
    if (settings.Period) {
      dispatch(deviceSettingActions.setPeriod(settings.Period));
    }
    if (settings.Area.length) {
      dispatch(
        deviceSettingActions.setSafetyZone({
          result: formatResponse(settings.Area),
        }),
      );
    }
    if (settings.WiFi.length) {
      const format = wifi.map(wifi => {
        const index = settings.WiFi.findIndex(
          wifiRes => wifiRes.wifi_id === wifi.wifi_id,
        );
        if (index === -1) {
          return wifi;
        }
        return settings.WiFi[index];
      });
      dispatch(deviceSettingActions.setWifi({ result: format }));
    }
  }, [settings]);

  const handleSubmit = async () => {
    if (isLoading || !settings) return;
    const {
      period,
      safetyZone: { result: safetyZone },
      wifi: { result: wifi },
    } = store.getState().deviceSetting;

    // 변경사항 없는데 put 요청 방지
    if (
      settings.Period === period &&
      formatResponse(settings.Area).every(area => {
        const currentArea =
          safetyZone[
            safetyZone.findIndex(
              storeArea => storeArea.safety_area_id === area.safety_area_id,
            )
          ];
        return currentArea.thumbnail === area.thumbnail;
      })
    ) {
      setIsEdit(false);
      return;
    }

    const areaWithoutImage = safetyZone.map(area => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const excludeImage = ({ thumbnail, ...rest }: AreaResponse) => rest;
      return excludeImage(area);
    });

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
        id: area.safety_area_id,
        data: area.thumbnail,
      }))
      .filter(area => area.data && !area.data.includes(serverImageUri));

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

  const onEditButtonPress = () => {
    if (!isEdit) {
      setIsEdit(true);
      dispatch(commonActions.setAnimateSwipeable(true));
      timeout.current = setTimeout(() => {
        dispatch(commonActions.setAnimateSwipeable(false));
      }, 1800);
    } else {
      handleSubmit();
    }
  };

  useEffect(() => {
    return () => {
      dispatch(deviceSettingActions.resetResults());
      if (timeout.current) clearTimeout(timeout.current);
      dispatch(commonActions.setAnimateSwipeable(false));
    };
  }, []);

  return (
    <>
      <CustomHeader
        RightButton={() => (
          <TouchableOpacity onPress={onEditButtonPress}>
            {isLoading ? (
              <ActivityIndicator color={palette.blue_7b} size={16} />
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
          paddingBottom: 35,
        }}>
        <ProfileSection deviceID={deviceID} avatar={avatar} name={name} />
        <Divider isHairline={false} />
        <Period deviceID={deviceID} />
        <View style={{ paddingHorizontal: 16 }}>
          <Divider />
        </View>
        <SafetyZone isEdit={isEdit} />
        <View style={{ paddingHorizontal: 16 }}>
          <Divider />
        </View>
        <WiFi isEdit={isEdit} />
        <View style={{ paddingHorizontal: 16 }}>
          <Divider />
        </View>
        <Family isEdit={isEdit} deviceID={deviceID} />
      </ScrollView>
    </>
  );
};

export default DeviceSetting;
