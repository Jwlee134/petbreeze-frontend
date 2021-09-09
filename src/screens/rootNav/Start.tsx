import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import GradientContainer from "~/components/common/container/GradientContainer";
import Footprint from "~/assets/svg/footprint/footprint-start.svg";
import AppName from "~/assets/svg/app-name.svg";
import { rpWidth } from "~/styles";
import { Animated, Easing } from "react-native";
import { store } from "~/store";
import { StartScreenNavigationProp } from "~/types/navigator";

const LogoContainer = styled(Animated.View)`
  justify-content: center;
  align-items: center;
`;

const Start = ({ navigation, route }: StartScreenNavigationProp) => {
  const footprintOpacity = useRef(new Animated.Value(0)).current;
  const appNameOpacity = useRef(new Animated.Value(0)).current;
  const marginBottom = useRef(new Animated.Value(0)).current;
  const footprintWidth = useRef(new Animated.Value(0)).current;
  const appNameWidth = useRef(new Animated.Value(0)).current;

  const translateY = footprintOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [rpWidth(-80), 0],
  });

  const slideDownWithFadeIn = Animated.timing(footprintOpacity, {
    toValue: 1,
    duration: 200,
    easing: Easing.ease,
    useNativeDriver: true,
  });

  const fadeInAppName = Animated.timing(appNameOpacity, {
    toValue: 1,
    duration: 200,
    easing: Easing.ease,
    useNativeDriver: true,
  });

  const footPrintWidthInterpolate = footprintWidth.interpolate({
    inputRange: [0, 1],
    outputRange: [rpWidth(60), rpWidth(33)],
  });

  const reduceFootprintWidth = Animated.timing(footprintWidth, {
    toValue: 1,
    duration: 200,
    easing: Easing.ease,
    useNativeDriver: false,
  });

  const appNameWidthInterpolate = appNameWidth.interpolate({
    inputRange: [0, 1],
    outputRange: [rpWidth(137), rpWidth(79)],
  });

  const reduceAppNameWidth = Animated.timing(appNameWidth, {
    toValue: 1,
    duration: 200,
    easing: Easing.ease,
    useNativeDriver: false,
  });

  const marginBottomInterpolate = marginBottom.interpolate({
    inputRange: [0, 1],
    outputRange: [rpWidth(38), -rpWidth(8)],
  });

  const reduceMarginBottom = Animated.timing(marginBottom, {
    toValue: 1,
    duration: 200,
    easing: Easing.ease,
    useNativeDriver: false,
  });

  useEffect(() => {
    Animated.sequence([
      slideDownWithFadeIn,
      Animated.delay(200),
      fadeInAppName,
      /* Animated.delay(400),
      Animated.parallel([
        reduceFootprintWidth,
        reduceAppNameWidth,
        reduceMarginBottom,
      ]), */
    ]).start(() => {
      const {
        init: { isPermissionAllowed, isInitialized },
        device: {
          isDeviceRegistered,
          isSafetyZoneRegistered,
          isProfileRegistered,
        },
      } = store.getState().storage;
      setTimeout(() => {
        if (!isPermissionAllowed)
          return navigation.replace("LoggedInNav", {
            initialRouteName: "Permissions",
          });
        if (isDeviceRegistered) {
          if (!isSafetyZoneRegistered)
            return navigation.replace("LoggedInNav", {
              initialRouteName: "RegisterDeviceStackNav",
              initialRouteName2: "PreSafetyZone",
            });
          if (!isProfileRegistered)
            return navigation.replace("LoggedInNav", {
              initialRouteName: "RegisterDeviceStackNav",
              initialRouteName2: "RegisterProfileFirst",
            });
        }
        if (!isInitialized)
          return navigation.replace("LoggedInNav", {
            initialRouteName: "RegisterDeviceStackNav",
          });
        navigation.replace("LoggedInNav");
      }, 600);
    });
  }, []);

  return (
    <GradientContainer
      style={{ justifyContent: "center", alignItems: "center" }}>
      <LogoContainer>
        <Animated.View
          style={{
            opacity: footprintOpacity,
            transform: [{ translateY }],
          }}>
          <Animated.View
            style={{
              width: footPrintWidthInterpolate,
              height: rpWidth(83),
              marginBottom: marginBottomInterpolate,
            }}>
            <Footprint width="100%" height="100%" />
          </Animated.View>
        </Animated.View>
        <Animated.View
          style={{
            opacity: appNameOpacity,
          }}>
          <Animated.View
            style={{ width: appNameWidthInterpolate, height: rpWidth(47) }}>
            <AppName width="100%" height="100%" />
          </Animated.View>
        </Animated.View>
      </LogoContainer>
    </GradientContainer>
  );
};

export default Start;
