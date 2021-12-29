import React, { useEffect } from "react";
import { View } from "react-native";
import MyText from "~/components/common/MyText";
import PeriodSection from "~/components/deviceSetting/PeriodSection";
import AreaSection from "~/components/deviceSetting/AreaSection";
import Divider from "~/components/common/Divider";
import CustomHeader from "~/components/navigator/CustomHeader";
import palette from "~/styles/palette";
import ProfileSection from "~/components/deviceSetting/ProfileSection";
import FamilySection from "~/components/deviceSetting/FamilySection";
import { DeviceSettingScreenProps } from "~/types/navigator";
import { useDispatch } from "react-redux";
import deviceApi, { AreaResponse, DeviceMembers } from "~/api/device";
import { deviceSettingActions } from "~/store/deviceSetting";
import { store } from "~/store";
import LoadingIndicator from "~/components/lottie/LoadingIndicator";
import { SMALL_LOADING_INDICATOR_SIZE } from "~/styles/constants";
import useUpdateDeviceSetting from "~/hooks/useUpdateDeviceSetting";
import Toast from "react-native-toast-message";
import { ScrollView } from "react-native-gesture-handler";
import allSettled from "promise.allsettled";
import { TOAST_TYPE } from "~/constants";

const DeviceSetting = ({
  navigation,
  route: {
    params: { deviceID, avatar, name },
  },
}: DeviceSettingScreenProps) => {
  const dispatch = useDispatch();
  const { data: settings, isLoading: getSetting } =
    deviceApi.useGetDeviceSettingQuery(deviceID, {
      refetchOnMountOrArgChange: true,
    });
  const { data: profile, isLoading: getProfile } =
    deviceApi.useGetDeviceProfileQuery(deviceID, {
      refetchOnMountOrArgChange: true,
    });
  const { data: members, isLoading: getMembers } =
    deviceApi.useGetDeviceMembersQuery(deviceID, {
      refetchOnMountOrArgChange: true,
    });
  const [deleteMember, { isLoading: isDeleting, isSuccess: isDeleted }] =
    deviceApi.useDeleteDeviceMemberMutation();
  const {
    sendRequest,
    isLoading: isChanging,
    isSuccess: isUpdated,
  } = useUpdateDeviceSetting(deviceID);
  const isLoading = getSetting || getProfile || getMembers;
  const isUpdating = isChanging || isDeleting;
  const isSuccess = isUpdated || isDeleted;

  useEffect(() => {
    if (!settings) return;
    if (!settings.setting_confirmation) {
      Toast.show({
        type: TOAST_TYPE.NOTIFICATION,
        text1: "최근에 설정을 변경하셨나요?",
        text2: "변경된 설정이 기기에 적용되고 있어요.",
      });
    }
    dispatch(deviceSettingActions.setAreaResult(settings.safety_areas));
    dispatch(deviceSettingActions.setPeriod(settings.collection_period));
  }, [settings]);

  useEffect(() => {
    if (!members) return;
    dispatch(deviceSettingActions.setMembersResult(members));
  }, [members]);

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

  const deletedMemberIDs = (memberResult: DeviceMembers | null) => {
    if (!memberResult) return [];
    return (
      members?.members
        .filter(
          member =>
            !memberResult.members.map(member => member.id).includes(member.id),
        )
        .map(member => member.id) || []
    );
  };

  const sendMemberRequest = async (list: number[]) => {
    await allSettled(list.map(id => deleteMember({ deviceID, userID: id })));
  };

  const handleSubmit = async () => {
    if (isUpdating || !settings || !members) return;
    const {
      result: { collection_period, safety_areas, members: memberResult },
    } = store.getState().deviceSetting;
    if (isSettingsChanged(collection_period, safety_areas)) {
      await sendRequest(safety_areas, collection_period);
    }
    if (deletedMemberIDs(memberResult).length) {
      await sendMemberRequest(deletedMemberIDs(memberResult));
    }
  };

  useEffect(() => {
    if (isSuccess || isDeleted)
      Toast.show({
        type: TOAST_TYPE.NOTIFICATION,
        text1: "성공적으로 변경되었습니다.",
      });
  }, [isSuccess, isDeleted]);

  useEffect(() => {
    return () => {
      dispatch(deviceSettingActions.reset());
    };
  }, []);

  return (
    <>
      <CustomHeader
        RightButtonText={
          isUpdating ? (
            <LoadingIndicator size={SMALL_LOADING_INDICATOR_SIZE} />
          ) : (
            <MyText color={palette.blue_7b}>완료</MyText>
          )
        }
        onRightButtonPress={handleSubmit}
        navigation={navigation}
        title="기기설정"
      />
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <LoadingIndicator size={80} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 16 }}>
          <ProfileSection
            data={profile}
            deviceID={deviceID}
            avatar={avatar}
            name={name}
          />
          <Divider isHairline={false} style={{ marginBottom: 10 }} />
          <PeriodSection />
          <View style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
            <Divider />
          </View>
          <AreaSection />
          <View style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
            <Divider />
          </View>
          <FamilySection deviceID={deviceID} />
        </ScrollView>
      )}
    </>
  );
};

export default DeviceSetting;
