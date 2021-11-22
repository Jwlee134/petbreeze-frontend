import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import React, { Fragment } from "react";
import styled from "styled-components/native";
import MyText from "~/components/common/MyText";
import palette from "~/styles/palette";

const TabContainer = styled.View`
  flex-direction: row;
  height: 40px;
`;

const TabButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Border = styled.View<{ isFocused: boolean }>`
  position: absolute;
  bottom: 0;
  width: 85px;
  height: 3px;
  background-color: ${({ isFocused }) =>
    isFocused ? palette.blue_7b : "white"};
`;

const CustomTopTabBar = ({
  state,
  descriptors,
  navigation,
}: MaterialTopTabBarProps) => {
  return (
    <TabContainer>
      {state.routes.map((route, index) => {
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

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Fragment key={index}>
            <TabButton onPress={onPress} onLongPress={onLongPress}>
              <MyText
                fontSize={14}
                color={isFocused ? palette.blue_7b : "rgba(0, 0, 0, 0.5)"}>
                {label}
              </MyText>
              <Border isFocused={isFocused} />
            </TabButton>
          </Fragment>
        );
      })}
    </TabContainer>
  );
};

export default CustomTopTabBar;
