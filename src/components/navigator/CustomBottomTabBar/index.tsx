import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import palette from "~/styles/palette";
import Tab from "./Tab";

const CustomBottomTabBar = ({
  state,
  navigation,
  newNotifExists,
}: BottomTabBarProps & { newNotifExists: boolean }) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            onLongPress={onLongPress}
            key={index}
            style={{
              flex: 1,
              height: 52 + bottom,
              borderTopWidth: 1,
              borderTopColor: palette.gray_e5,
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Tab
              isFocused={isFocused}
              name={route.name}
              newNotifExists={newNotifExists}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomBottomTabBar;
