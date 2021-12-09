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
import LoadingIndicator from "~/components/lottie/LoadingIndicator";
import { textLoadingIndicatorSize } from "~/styles/constants";
import useUpdateDeviceSetting from "~/hooks/useUpdateDeviceSetting";

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
  const { sendRequest, isLoading } = useUpdateDeviceSetting(deviceID);

  // 마운트 시 스토어에 response 저장
  useEffect(() => {
    if (!settings) return;
    dispatch(deviceSettingActions.setAreaResult(settings.safety_areas));
    dispatch(deviceSettingActions.setPeriod(settings.collection_period));
  }, [settings]);

  const isAreaChanged = (safety_areas: AreaResponse[]) =>
    safety_areas.some(area => {
      if (!settings) return false;
      const originalTarget =
        settings.safety_areas[
          settings.safety_areas.findIndex(
            target => target.safety_area_number === area.safety_area_number,
          )
        ];
      const isAreaChanged = originalTarget.thumbnail !== area.thumbnail;
      return isAreaChanged;
    });

  const isSettingsChanged = (
    collection_period: number,
    safety_areas: AreaResponse[],
  ) => {
    if (!settings) return false;
    return (
      collection_period !== settings.collection_period ||
      isAreaChanged(safety_areas)
    );
  };

  const handleSubmit = async () => {
    if (isLoading || !settings) return;
    const {
      result: { collection_period, safety_areas },
    } = store.getState().deviceSetting;
    if (isSettingsChanged(collection_period, safety_areas)) {
      await sendRequest(safety_areas, collection_period);
    }
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
        <View style={{ paddingHorizontal: 16, paddingBottom: 10 }}>
          <Divider />
        </View>
        <AreaSection />
        <View style={{ paddingHorizontal: 16, paddingBottom: 10 }}>
          <Divider />
        </View>
        <FamilySection deviceID={deviceID} />
      </ScrollView>
    </>
  );
};

export default DeviceSetting;
