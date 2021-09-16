import React from "react";
import styled from "styled-components/native";
import { rpWidth } from "~/styles";
import MyText from "../common/MyText";

import Swipeable from "../common/Swipeable";
import ListItem from "../common/ListItem";
import Trashcan from "~/assets/svg/trashcan.svg";
import DeviceSettingSection from "./DeviceSettingSection";
import { useNavigation } from "@react-navigation/core";
import { useDispatch } from "react-redux";
import { navigatorActions } from "~/store/navigator";
import { DeviceSettingScreenNavigationProp } from "~/types/navigator";
import { useAppSelector } from "~/store";
import { deviceSettingActions } from "~/store/deviceSetting";

const RowContainer = styled.View`
  flex-shrink: 1;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const Image = styled.Image`
  width: ${rpWidth(70)}px;
  height: ${rpWidth(70)}px;
  border-radius: ${rpWidth(70)}px;
  margin-right: ${rpWidth(19)}px;
`;

const TextContainer = styled.View`
  flex-shrink: 1;
  padding-right: ${rpWidth(32)}px;
`;

const SafetyZone = ({ isEdit }: { isEdit: boolean }) => {
  const navigation = useNavigation<DeviceSettingScreenNavigationProp>();
  const dispatch = useDispatch();
  const result = useAppSelector(state => state.deviceSetting.safetyZone.result);

  return (
    <DeviceSettingSection
      isEdit={isEdit}
      type="safetyZone"
      disablePlusButton={result.length > 2}
      onPlusButtonClick={() => {
        dispatch(
          deviceSettingActions.setSafetyZone({
            fromDeviceSetting: true,
          }),
        );
        dispatch(
          navigatorActions.setInitialRoute({
            initialBleRootStackNavRouteName: "BleWithoutHeaderStackNav",
            initialBleWithoutHeaderStackNavRouteName: "SafetyZone",
          }),
        );
        navigation.navigate("BleRootStackNav");
      }}>
      {result.map((item, i) => (
        <Swipeable
          key={item.id}
          animate={isEdit && i === 0}
          onRightButtonPress={() => {}}
          RightButtonIcon={() => <Trashcan />}
          enableRightActions={isEdit}>
          <ListItem
            onPress={() => {
              if (!isEdit) return;
              dispatch(
                deviceSettingActions.setSafetyZone({
                  draft: {
                    name: item.name,
                    addr: item.addr,
                    coord: {
                      latitude: item.data[0],
                      longitude: item.data[1],
                    },
                    radius: item.data[2],
                  },
                  fromDeviceSetting: true,
                  currentId: item.id,
                }),
              );
              dispatch(
                navigatorActions.setInitialRoute({
                  initialBleRootStackNavRouteName: "BleWithoutHeaderStackNav",
                  initialBleWithoutHeaderStackNavRouteName: "SafetyZone",
                }),
              );
              navigation.navigate("BleRootStackNav");
            }}
            showIcon={isEdit}>
            <RowContainer>
              <Image source={{ uri: item.image }} />
              <TextContainer>
                <MyText
                  numberOfLines={1}
                  fontSize={rpWidth(12)}
                  color="rgba(0, 0, 0, 0.3)">
                  {item.addr}
                </MyText>
                <RowContainer style={{ marginTop: rpWidth(10) }}>
                  <MyText
                    color="rgba(0, 0, 0, 0.7)"
                    numberOfLines={1}
                    style={{ width: "50%" }}>
                    {item.name}
                  </MyText>
                  <MyText style={{ width: "50%" }} color="rgba(0, 0, 0, 0.7)">
                    {item.data[2]}m
                  </MyText>
                </RowContainer>
              </TextContainer>
            </RowContainer>
          </ListItem>
        </Swipeable>
      ))}
    </DeviceSettingSection>
  );
};

export default SafetyZone;
