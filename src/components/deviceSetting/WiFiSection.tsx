import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import { useAppSelector } from "~/store";
import Swipeable from "../common/Swipeable";
import SwipeableButton from "../common/SwipeableButton";
import SectionHeader from "./SectionHeader";
import Minus from "~/assets/svg/minus/minus-white.svg";
import ListItem from "../common/ListItem";
import { View } from "react-native";
import MyText from "../common/MyText";

const WiFiSection = () => {
  const currentID = useAppSelector(state => state.deviceSetting.area.currentID);
  const result = useAppSelector(state => state.deviceSetting.result.Area).find(
    area => area.safety_area_id === currentID,
  )?.WiFi;
  const dispatch = useDispatch();

  if (!result) return null;
  return (
    <>
      <SectionHeader
        type="wifi"
        onPlusButtonClick={() => {}}
        disablePlusButton={result.filter(item => item.ssid).length > 2}
      />
      {result.map(({ wifi_id: id, password, ssid }) =>
        ssid ? (
          <Swipeable
            key={id}
            RenderRightActions={() => (
              <SwipeableButton backgroundColor="red" onPress={() => {}}>
                <Minus />
              </SwipeableButton>
            )}
            enableRightActions>
            <ListItem
              onPress={() => {}}
              style={{ height: 54, paddingRight: 36 }}>
              <View style={{ flexShrink: 1, paddingRight: 36 }}>
                <MyText
                  numberOfLines={1}
                  style={{ marginLeft: 5 }}
                  color="rgba(0, 0, 0, 0.7)">
                  {ssid}
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
