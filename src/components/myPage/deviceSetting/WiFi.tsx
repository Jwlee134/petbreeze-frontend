import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import MyText from "../../common/MyText";
import Trashcan from "~/assets/svg/myPage/trashcan.svg";
import ListItem from "../../common/ListItem";
import Swipeable from "../../common/Swipeable";
import DeviceSettingTitle from "./DeviceSettingTitle";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { DeviceSettingScreenNavigationProp } from "~/types/navigator";
import { View } from "react-native";
import { useAppSelector } from "~/store";
import { deviceSettingActions } from "~/store/deviceSetting";
import { DimensionsContext } from "~/context/DimensionsContext";
import Animated, { EasingNode } from "react-native-reanimated";
import SwipeableButton from "~/components/common/SwipeableButton";

const WiFi = ({ isEdit }: { isEdit: boolean }) => {
  const navigation = useNavigation<DeviceSettingScreenNavigationProp>();
  const dispatch = useDispatch();
  const result = useAppSelector(state => state.deviceSetting.wifi.result);
  const { rpWidth } = useContext(DimensionsContext);

  const [showList, setShowList] = useState(false);

  const value1 = useRef(new Animated.Value(0)).current;

  const height = useMemo(() => {
    return showList && result.filter(item => item.ssid).length
      ? result.filter(item => item.ssid).length * rpWidth(49) + rpWidth(35)
      : 1;
  }, [showList, result.filter(item => item.ssid).length]);

  const heightInterpolate = value1.interpolate({
    inputRange: [0, height],
    outputRange: [0, height],
  });

  useEffect(() => {
    Animated.timing(value1, {
      toValue: height,
      duration: 200,
      easing: EasingNode.linear,
    }).start();
  }, [height]);

  useEffect(() => {
    if (isEdit) setShowList(true);
  }, [isEdit]);

  return (
    <>
      <DeviceSettingTitle
        disableArrowButton={result.filter(item => item.ssid).length === 0}
        disablePlusButton={result.filter(item => item.ssid).length > 4}
        isEdit={isEdit}
        showList={showList}
        type="wifi"
        onArrowButtonClick={() => {
          setShowList(!showList);
        }}
        onPlusButtonClick={() => {
          dispatch(
            deviceSettingActions.setWifi({
              currentId: result[result.findIndex(item => !item.ssid)].id,
            }),
          );
          navigation.navigate("UpdateWiFi");
        }}
      />
      <Animated.View
        style={{
          height: heightInterpolate,
        }}>
        {result.map(({ id, pw, ssid }, i) =>
          ssid ? (
            <Animated.View key={id}>
              <Swipeable
                animate={isEdit && i === 0}
                RenderRightActions={() => (
                  <SwipeableButton
                    backgroundColor="red"
                    onPress={() => {
                      dispatch(deviceSettingActions.deleteWiFi(id));
                    }}>
                    <Trashcan width={rpWidth(22)} height={rpWidth(24)} />
                  </SwipeableButton>
                )}
                enableRightActions={isEdit}>
                <ListItem
                  onPress={() => {
                    if (!isEdit) return;
                    dispatch(
                      deviceSettingActions.setWifi({
                        currentId: id,
                        draft: { ssid, pw },
                      }),
                    );
                    navigation.navigate("UpdateWiFi");
                  }}
                  showIcon={isEdit}
                  style={{ height: rpWidth(49), paddingRight: rpWidth(36) }}>
                  <View style={{ flexShrink: 1, paddingRight: rpWidth(36) }}>
                    <MyText
                      numberOfLines={1}
                      style={{ marginLeft: rpWidth(5) }}
                      color="rgba(0, 0, 0, 0.7)">
                      {ssid}
                    </MyText>
                  </View>
                </ListItem>
              </Swipeable>
            </Animated.View>
          ) : null,
        )}
      </Animated.View>
    </>
  );
};

export default WiFi;
