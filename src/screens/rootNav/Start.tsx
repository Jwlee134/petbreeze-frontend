import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import GradientContainer from "~/components/common/container/GradientContainer";
import Footprint from "~/assets/svg/footprint/footprint-app-icon-blue.svg";
import AppName from "~/assets/svg/app-name.svg";
import { rpWidth } from "~/styles";
import { Animated, Easing } from "react-native";
import { StartScreenNavigationProp } from "~/types/navigator";
import { store } from "~/store";
import { useDispatch } from "react-redux";
import { navigatorActions } from "~/store/navigator";

const LogoContainer = styled(Animated.View)`
  justify-content: center;
  align-items: center;
`;

const Start = ({ navigation }: { navigation: StartScreenNavigationProp }) => {
  const footprintOpacity = useRef(new Animated.Value(0)).current;
  const appNameOpacity = useRef(new Animated.Value(0)).current;
  const marginBottom = useRef(new Animated.Value(0)).current;
  const footprintWidth = useRef(new Animated.Value(0)).current;
  const appNameWidth = useRef(new Animated.Value(0)).current;

  const dispatch = useDispatch();

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
      setTimeout(() => {
        const {
          init: { isPermissionAllowed, isInitialized },
          device: {
            isDeviceRegistered,
            isSafetyZoneRegistered,
            isProfileRegistered,
          },
        } = store.getState().storage;

        if (!isPermissionAllowed) {
          dispatch(
            navigatorActions.setInitialRoute({
              initialLoggedInNavRouteName: "Permissons",
            }),
          );
          navigation.replace("LoggedInNav");
          return;
        }
        if (isDeviceRegistered) {
          if (!isSafetyZoneRegistered) {
            dispatch(
              navigatorActions.setInitialRoute({
                initialLoggedInNavRouteName: "BleRootStackNav",
                initialBleWithHeaderStackNavRouteName: "PreSafetyZone",
              }),
            );
            navigation.replace("LoggedInNav");
            return;
          }
          if (!isProfileRegistered) {
            dispatch(
              navigatorActions.setInitialRoute({
                initialLoggedInNavRouteName: "BleRootStackNav",
                initialBleWithHeaderStackNavRouteName: "RegisterProfileFirst",
              }),
            );
            navigation.replace("LoggedInNav");
            return;
          }
        }
        if (!isInitialized) {
          dispatch(
            navigatorActions.setInitialRoute({
              initialLoggedInNavRouteName: "BleRootStackNav",
            }),
          );
          navigation.replace("LoggedInNav");
          return;
        }
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
