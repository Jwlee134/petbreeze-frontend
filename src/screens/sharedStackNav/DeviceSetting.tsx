import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import { ScrollView, TouchableOpacity, View } from "react-native";
import MyText from "~/components/common/MyText";

import LocationInfoCollectionPeriod from "~/components/deviceSetting/LocationInfoCollectionPeriod";
import SafetyZone from "~/components/deviceSetting/SafetyZone";
import { DeviceSettingScreenNavigationProp } from "~/types/navigator";
import Divider from "~/components/common/Divider";
import CustomHeader from "~/components/navigator/CustomHeader";
import palette from "~/styles/palette";
import WiFi from "~/components/deviceSetting/WiFi";
import ProfileSection from "~/components/deviceSetting/ProfileSection";
import { store, useAppSelector } from "~/store";
import { DimensionsContext } from "~/context/DimensionsContext";

const DeviceSetting = ({
  navigation,
  route,
}: {
  navigation: DeviceSettingScreenNavigationProp;
}) => {
  const { rpWidth } = useContext(DimensionsContext);
  const { data } = route.params;
  const [isEdit, setIsEdit] = useState(false);

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
        <ProfileSection data={data} />
        <Divider isHairline={false} />
        <View style={{ paddingHorizontal: rpWidth(16) }}>
          <LocationInfoCollectionPeriod />
        </View>
        <View style={{ paddingHorizontal: rpWidth(16) }}>
          <Divider />
        </View>
        <SafetyZone isEdit={isEdit} />
        <View style={{ paddingHorizontal: rpWidth(16) }}>
          <Divider style={{ marginTop: rpWidth(35) }} />
        </View>
        <WiFi isEdit={isEdit} />
      </ScrollView>
    </>
  );
};

export default DeviceSetting;
