import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "~/store";
import SectionHeader from "./SectionHeader";
import ListItem from "../common/ListItem";
import { View } from "react-native";
import MyText from "../common/MyText";
import { WiFiResponse } from "~/api/device";
import { deviceSettingActions } from "~/store/deviceSetting";
import { useNavigation } from "@react-navigation/native";
import { UpdateAreaScreenNavigationProp } from "~/types/navigator";
import SwipeableList from "../common/SwipeableList";

const WiFiSection = () => {
  const navigation = useNavigation<UpdateAreaScreenNavigationProp>();
  const currentID = useAppSelector(state => state.deviceSetting.area.currentID);
  const result = useAppSelector(
    state => state.deviceSetting.result.safety_areas,
  ).find(area => area.safety_area_number === currentID)?.wifis;
  const dispatch = useDispatch();

  const onPlusPress = () => {
    if (!result) return;
    navigation.navigate("UpdateWiFi", {
      id: result.findIndex(wifi => !wifi.ssid),
    });
  };

  const onWiFiPress = ({ wifi_number, ssid, password }: WiFiResponse) => {
    dispatch(deviceSettingActions.setWiFiDraft({ ssid, password }));
    navigation.navigate("UpdateWiFi", { id: wifi_number });
  };

  const onMinusPress = (id: number) => {
    dispatch(deviceSettingActions.deleteWiFiResult(id));
  };

  const data = result?.filter(wifi => wifi.ssid !== "") || [];

  if (!result) return null;
  return (
    <>
      <SectionHeader
        type="wifi"
        onPlusButtonClick={onPlusPress}
        disablePlusButton={result.filter(item => item.ssid).length > 2}
      />
      <SwipeableList
        data={data}
        keyExtractor={item => item.wifi_number.toString()}
        onHiddenButtonPress={item => {
          onMinusPress(item.wifi_number);
        }}
        renderItem={item => (
          <ListItem
            onPress={() => onWiFiPress(item)}
            style={{ height: 54, paddingRight: 36 }}>
            <View style={{ flexShrink: 1, paddingRight: 36 }}>
              <MyText
                numberOfLines={1}
                style={{ marginLeft: 5 }}
                color="rgba(219, 113, 113, 0.7)">
                {item.ssid}
              </MyText>
            </View>
          </ListItem>
        )}
      />
    </>
  );
};

export default WiFiSection;
