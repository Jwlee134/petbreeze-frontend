import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import React, { useContext } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import palette from "~/styles/palette";
import Tab from "./Tab";

type Route = {
  key: string;
  name: string;
  params?: object | undefined;
};

const TabContainer = styled.View<{ rpWidth: RpWidth }>`
  flex-direction: row;
  height: ${({ rpWidth }) => rpWidth(37)}px;
`;

const BorderBottomContainer = styled(Animated.View)<{ rpWidth: RpWidth }>`
  width: 50%;
  height: ${({ rpWidth }) => rpWidth(3)}px;
  background-color: transparent;
  align-items: center;
`;

const BorderBottom = styled.View<{ rpWidth: RpWidth }>`
  width: ${({ rpWidth }) => rpWidth(85)}px;
  height: 100%;
  background-color: ${palette.blue_7b};
`;

const CustomTopTabBar = ({
  state,
  descriptors,
  navigation,
}: MaterialTopTabBarProps) => {
  const value = useRef(new Animated.Value(0)).current;
  const [toValue, setToValue] = useState(0);
  const { rpWidth } = useContext(DimensionsContext);

  Animated.spring(value, {
    toValue,
    damping: 10,
    mass: 1,
    stiffness: 100,
    overshootClamping: true,
    restDisplacementThreshold: 0.001,
    restSpeedThreshold: 0.001,
    useNativeDriver: true,
  }).start();

  return (
    <>
      <TabContainer rpWidth={rpWidth}>
        {state.routes.map((route: Route, index: number) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Tab
              key={`tab_${index}`}
              onPress={onPress}
              isFocused={isFocused}
              label={label}
              setToValue={setToValue}
            />
          );
        })}
      </TabContainer>
      <BorderBottomContainer
        rpWidth={rpWidth}
        style={{
          transform: [{ translateX: value }],
        }}>
        <BorderBottom rpWidth={rpWidth} />
      </BorderBottomContainer>
    </>
  );
};

export default CustomTopTabBar;
