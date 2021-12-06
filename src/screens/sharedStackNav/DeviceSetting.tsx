import React, { useEffect, useRef } from "react";
import { View, ScrollView } from "react-native";
import MyText from "~/components/common/MyText";
import PeriodSection from "~/components/deviceSetting/PeriodSection";
import AreaSection from "~/components/deviceSetting/AreaSection";
import Divider from "~/components/common/Divider";
import CustomHeader from "~/components/navigator/CustomHeader";
import palette from "~/styles/palette";
import ProfileSection from "~/components/deviceSetting/ProfileSection";
import FamilySection from "~/components/deviceSetting/FamilySection";
import { DeviceSettingScreenProps } from "~/types/navigator";
import { commonActions } from "~/store/common";
import { useDispatch } from "react-redux";
import deviceApi, { AreaResponse } from "~/api/device";
import { deviceSettingActions } from "~/store/deviceSetting";
import { store } from "~/store";
import { serverImageUri } from "~/constants";
import imageHandler from "~/utils/imageHandler";
import LoadingIndicator from "~/components/lottie/LoadingIndicator";
import { textLoadingIndicatorSize } from "~/styles/constants";

const DeviceSetting = ({
  navigation,
  route: {
    params: { deviceID, avatar, name },
  },
}: DeviceSettingScreenProps) => {
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

  // 마운트 시 스토어에 response 저장
  useEffect(() => {
    if (!settings) return;
    dispatch(
      deviceSettingActions.setAreaResult([
        {
          safety_area_id: 0,
          name: "동휘집",
          address: "서울특별시 월곡로 XX",
          coordinate: {
            type: "Point",
            coordinates: [126.3233, 37.3123],
          },
          radius: 30,
          thumbnail:
            "https://wheredog-dev-storage.s3.amazonaws.com/posts/20211126/7?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVDFXVHJZFQTJWVLS%2F20211206%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20211206T121713Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=99e211768471a6e2d030303e827c042fe16b203262d6aa2619359a1113480b7e",
          WiFi: [
            {
              wifi_id: 0,
              ssid: "blah",
              password: "blahblah",
            },
            {
              wifi_id: 1,
              ssid: "blah",
              password: "blahblah",
            },
            {
              wifi_id: 2,
              ssid: null,
              password: null,
            },
          ],
        },
        {
          safety_area_id: 1,
          name: "재원집",
          address: "서울특별시 관악로 XX",
          coordinate: {
            type: "Point",
            coordinates: [126.5233, 37.4123],
          },
          radius: 50,
          thumbnail:
            "https://wheredog-dev-storage.s3.amazonaws.com/posts/20211126/7?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVDFXVHJZFQTJWVLS%2F20211206%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20211206T121713Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=99e211768471a6e2d030303e827c042fe16b203262d6aa2619359a1113480b7e",
          WiFi: [
            {
              wifi_id: 0,
              ssid: "blah",
              password: "blahblah",
            },
            {
              wifi_id: 1,
              ssid: "blah",
              password: "blahblah",
            },
            {
              wifi_id: 2,
              ssid: null,
              password: null,
            },
          ],
        },
        {
          safety_area_id: 2,
          name: null,
          address: null,
          coordinate: {
            type: "Point",
            coordinates: [0, 0],
          },
          radius: 0,
          thumbnail: null,
          WiFi: [
            {
              wifi_id: 0,
              ssid: null,
              password: null,
            },
            {
              wifi_id: 1,
              ssid: null,
              password: null,
            },
            {
              wifi_id: 2,
              ssid: null,
              password: null,
            },
          ],
        },
      ]),
    );
    dispatch(deviceSettingActions.setPeriod(settings.Period));
  }, [settings]);

  const handleSubmit = async () => {
    // if (isLoading || !settings) return;
    // const {
    //   period,
    //   safetyZone: { result: safetyZone },
    //   /* wifi: { result: wifi }, */
    // } = store.getState().deviceSetting;
    // // 변경사항 없는데 put 요청 방지
    // if (
    //   settings.Period === period &&
    //   formatResponse(settings.Area).every(area => {
    //     const currentArea =
    //       safetyZone[
    //         safetyZone.findIndex(
    //           storeArea => storeArea.safety_area_id === area.safety_area_id,
    //         )
    //       ];
    //     return currentArea.thumbnail === area.thumbnail;
    //   })
    // ) {
    //   return;
    // }
    // const areaWithoutImage = safetyZone.map(area => {
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   const excludeImage = ({ thumbnail, ...rest }: AreaResponse) => rest;
    //   return excludeImage(area);
    // });
    // try {
    //   await updateSetting({
    //     deviceID,
    //     body: {
    //       Area: areaWithoutImage,
    //       Period: period as number,
    //       /* WiFi: wifi, */
    //     },
    //   }).unwrap();
    // } catch {
    //   return;
    // }
    // const areaImages = safetyZone
    //   .map(area => ({
    //     id: area.safety_area_id,
    //     data: area.thumbnail,
    //   }))
    //   .filter(area => area.data && !area.data.includes(serverImageUri));
    // if (areaImages.length) {
    //   const generateKey = (i: number) => `safety_area_${i}_thumbnail`;
    //   const formData = imageHandler.handleFormData(areaImages, generateKey);
    //   try {
    //     await updateSafetyZoneThumbnail({ deviceID, body: formData }).unwrap();
    //   } catch {}
    // }
  };

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
      dispatch(commonActions.setAnimateSwipeable(false));
    };
  }, []);

  return (
    <>
      <CustomHeader
        RightButtonText={
          isLoading ? (
            <LoadingIndicator size={textLoadingIndicatorSize} />
          ) : (
            <MyText color={palette.blue_7b}>완료</MyText>
          )
        }
        onRightButtonPress={handleSubmit}
        navigation={navigation}
        title="기기설정"
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 16 }}>
        <ProfileSection deviceID={deviceID} avatar={avatar} name={name} />
        <Divider isHairline={false} />
        <PeriodSection />
        <View style={{ paddingHorizontal: 16, marginBottom: 10 }}>
          <Divider />
        </View>
        <AreaSection />
        <View style={{ paddingHorizontal: 16, marginBottom: 10 }}>
          <Divider />
        </View>
        <FamilySection deviceID={deviceID} />
      </ScrollView>
    </>
  );
};

export default DeviceSetting;
