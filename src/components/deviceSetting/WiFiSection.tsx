import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "~/store";
import Swipeable from "../common/Swipeable";
import SwipeableButton from "../common/SwipeableButton";
import SectionHeader from "./SectionHeader";
import Minus from "~/assets/svg/minus/minus-white.svg";
import ListItem from "../common/ListItem";
import { View } from "react-native";
import MyText from "../common/MyText";
import { WiFiResponse } from "~/api/device";
import { deviceSettingActions } from "~/store/deviceSetting";
import { useNavigation } from "@react-navigation/native";
import { UpdateAreaScreenNavigationProp } from "~/types/navigator";

const WiFiSection = () => {
  const navigation = useNavigation<UpdateAreaScreenNavigationProp>();
  const currentID = useAppSelector(state => state.deviceSetting.area.currentID);
  const result = useAppSelector(state => state.deviceSetting.result.Area).find(
    area => area.safety_area_id === currentID,
  )?.WiFi;
  const dispatch = useDispatch();

  const onPlusPress = () => {
    if (!result) return;
    navigation.navigate("UpdateWiFi", {
      id: result.findIndex(wifi => !wifi.ssid),
    });
  };

  const onWiFiPress = ({ wifi_id, ssid, password }: WiFiResponse) => {
    dispatch(deviceSettingActions.setWiFiDraft({ ssid, password }));
    navigation.navigate("UpdateWiFi", { id: wifi_id });
  };

  const onMinusPress = (id: number) => {
    dispatch(deviceSettingActions.deleteWiFiResult(id));
  };

  if (!result) return null;
  return (
    <>
      <SectionHeader
        type="wifi"
        onPlusButtonClick={onPlusPress}
        disablePlusButton={result.filter(item => item.ssid).length > 2}
      />
      {result.map(data =>
        data.ssid ? (
          <Swipeable
            key={data.wifi_id}
            RenderRightActions={() => (
              <SwipeableButton
                backgroundColor="red"
                onPress={() => onMinusPress(data.wifi_id)}>
                <Minus />
              </SwipeableButton>
            )}
            enableRightActions>
            <ListItem
              onPress={() => onWiFiPress(data)}
              style={{ height: 54, paddingRight: 36 }}>
              <View style={{ flexShrink: 1, paddingRight: 36 }}>
                <MyText
                  numberOfLines={1}
                  style={{ marginLeft: 5 }}
                  color="rgba(0, 0, 0, 0.7)">
                  {data.ssid}
                </MyText>
              </View>
            </ListItem>
          </Swipeable>
        ) : null,
      )}
    </>
  );
};

export default WiFiSection;
