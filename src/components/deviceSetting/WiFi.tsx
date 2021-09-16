import React from "react";
import { rpWidth } from "~/styles";
import MyText from "../common/MyText";
import Trashcan from "~/assets/svg/trashcan.svg";
import ListItem from "../common/ListItem";
import Swipeable from "../common/Swipeable";
import DeviceSettingSection from "./DeviceSettingSection";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { DeviceSettingScreenNavigationProp } from "~/types/navigator";
import { View } from "react-native";
import { useAppSelector } from "~/store";
import { deviceSettingActions } from "~/store/deviceSetting";

const WiFi = ({ isEdit }: { isEdit: boolean }) => {
  const navigation = useNavigation<DeviceSettingScreenNavigationProp>();
  const dispatch = useDispatch();
  const result = useAppSelector(state => state.deviceSetting.wifi.result);

  return (
    <DeviceSettingSection
      disablePlusButton={result.length > 4}
      isEdit={isEdit}
      type="wifi"
      onPlusButtonClick={() => {
        navigation.navigate("UpdateWiFi");
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
                deviceSettingActions.setWifi({
                  currentId: item.id,
                  draft: { name: item.name, password: item.password },
                }),
              );
              navigation.navigate("UpdateWiFi");
            }}
            showIcon={isEdit}
            style={{ height: rpWidth(49) }}>
            <View style={{ flexShrink: 1, paddingRight: rpWidth(35) }}>
              <MyText
                numberOfLines={1}
                style={{ marginLeft: rpWidth(5) }}
                color="rgba(0, 0, 0, 0.7)">
                {item.name}
              </MyText>
            </View>
          </ListItem>
        </Swipeable>
      ))}
    </DeviceSettingSection>
  );
};

export default WiFi;
