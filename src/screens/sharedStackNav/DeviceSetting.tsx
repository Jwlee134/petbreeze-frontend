import React, { useState } from "react";
import styled from "styled-components/native";
import { ScrollView, TouchableOpacity } from "react-native";
import { rpWidth } from "~/styles";
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

const PaddingContainer = styled.View`
  padding: 0px ${rpWidth(16)}px;
`;

const DeviceSetting = ({
  navigation,
  route,
}: {
  navigation: DeviceSettingScreenNavigationProp;
}) => {
  const data = route.params.data;
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
        <PaddingContainer>
          <LocationInfoCollectionPeriod />
        </PaddingContainer>
        <PaddingContainer>
          <Divider />
        </PaddingContainer>
        <SafetyZone isEdit={isEdit} />
        <PaddingContainer>
          <Divider style={{ marginTop: rpWidth(35) }} />
        </PaddingContainer>
        <WiFi isEdit={isEdit} />
      </ScrollView>
    </>
  );
};

export default DeviceSetting;
