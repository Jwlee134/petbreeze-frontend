import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import React, { Fragment, useContext } from "react";
import styled, { css } from "styled-components/native";
import MyText from "~/components/common/MyText";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import palette from "~/styles/palette";

interface IBorderProps {
  rpWidth: RpWidth;
  isFocused: boolean;
}

const TabContainer = styled.View<{ rpWidth: RpWidth }>`
  flex-direction: row;
  height: ${({ rpWidth }) => rpWidth(40)}px;
`;

const TabButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Border = styled.View<IBorderProps>`
  position: absolute;
  bottom: 0;
  ${({ rpWidth, isFocused }) => css`
    width: ${rpWidth(85)}px;
    height: ${rpWidth(3)}px;
    background-color: ${isFocused ? palette.blue_7b : "white"};
  `}
`;

const CustomTopTabBar = ({
  state,
  descriptors,
  navigation,
}: MaterialTopTabBarProps) => {
  const { rpWidth } = useContext(DimensionsContext);

  return (
    <TabContainer rpWidth={rpWidth}>
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
              <Border rpWidth={rpWidth} isFocused={isFocused} />
            </TabButton>
          </Fragment>
        );
      })}
    </TabContainer>
  );
};

export default CustomTopTabBar;
