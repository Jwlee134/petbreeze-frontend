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
import { SwipeListView } from "react-native-swipe-list-view";
import { hiddenButtonWidth } from "~/styles/constants";
import HiddenButton from "../common/HiddenButton";

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
      {data.length ? (
        <SwipeListView
          disableRightSwipe
          rightOpenValue={-hiddenButtonWidth}
          data={data}
          keyExtractor={({ wifi_number }) => String(wifi_number)}
          previewRowKey={String(data[0].wifi_number)}
          previewOpenValue={-hiddenButtonWidth}
          renderItem={({ item }) => (
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
          renderHiddenItem={({ item }, rowMap) => (
            <HiddenButton
              onPress={() => {
                onMinusPress(item.wifi_number);
                rowMap[item.wifi_number].closeRow();
              }}
            />
          )}
        />
      ) : null}
    </>
  );
};

export default WiFiSection;
