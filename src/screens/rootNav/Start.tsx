import React from "react";
import styled from "styled-components/native";
import GradientContainer from "~/components/common/container/GradientContainer";
import Footprint from "~/assets/svg/footprint/footprint-app-icon-blue.svg";
import { Animated, Linking, useWindowDimensions } from "react-native";
import * as SecureStore from "expo-secure-store";
import useAnimatedSequence from "~/hooks/useAnimatedSequence";
import { isIphoneX } from "react-native-iphone-x-helper";
import { IS_ANDROID, IS_IOS, SECURE_ITEMS } from "~/constants";
import { StartScreenNavigationProp } from "~/types/navigator";
import notificationHandler from "~/utils/notificationHandler";
import userApi from "~/api/user";
import { store } from "~/store";
import messaging from "@react-native-firebase/messaging";
import LogoText from "~/assets/svg/start/logo-text.svg";

const Container = styled.View`
  flex: 1;
`;

const LogoContainer = styled(Animated.View)`
  position: absolute;
  align-items: center;
  align-self: center;
`;

const Start = ({ navigation }: { navigation: StartScreenNavigationProp }) => {
  const { height } = useWindowDimensions();
  const [handleRead] = userApi.useReadNotificationsMutation();

  const handleNotification = async () => {
    const remoteMessage = await messaging().getInitialNotification();
    console.log(
      "Notification caused app to open from quit state:",
      remoteMessage,
    );
    if (remoteMessage) {
      notificationHandler(remoteMessage, navigation, true);
      if (remoteMessage?.data?.messageId) {
        handleRead([parseInt(remoteMessage.data.messageId, 10)]);
      }
    } else {
      const { coords } = store.getState().storage.walk;
      if (coords.length) {
        navigation.replace("LoggedInNav", {
          initialRouteName: "WalkMap",
        });
        return;
      }
      navigation.replace("LoggedInNav");
    }
  };

  const onAnimatedFinish = async () => {
    const token = await SecureStore.getItemAsync(SECURE_ITEMS.TOKEN);
    const fbToken = await SecureStore.getItemAsync(SECURE_ITEMS.FIREBASE_TOKEN);
    if (token && fbToken) {
      console.log(`🔐 Here's your value 🔐 \n + ${token}`);
      console.log(`🔐 Here's your fb value 🔐 \n + ${fbToken}`);
      if (IS_ANDROID) {
        const link = await Linking.getInitialURL();
        if (link && link.includes("walk")) {
          navigation.replace("LoggedInNav", {
            initialRouteName: "WalkMap",
          });
          return;
        }
      }
      handleNotification();
    } else {
      console.log("No values stored under that key.");
      navigation.replace("Auth");
    }
  };

  const [footprint, appName] = useAnimatedSequence({
    numOfValues: 3,
    onAnimatedFinish,
    shouldDelayOnMount: false,
    delayAfterFirst: 400,
  });

  const translateY = footprint.interpolate({
    inputRange: [0, 1],
    outputRange: [
      IS_IOS ? height * 0.22 - (isIphoneX() ? 0 : 34) : height * 0.25,
      IS_IOS ? height * 0.32 - (isIphoneX() ? 0 : 34) : height * 0.3,
    ],
  });

  return (
    <GradientContainer>
      <Container>
        <LogoContainer style={{ transform: [{ translateY }] }}>
          <Animated.View
            style={{
              opacity: footprint,
              width: 60,
              height: 83,
              marginBottom: 26,
            }}>
            <Footprint width="100%" height="100%" />
          </Animated.View>
          <Animated.View
            style={{
              opacity: appName,
            }}>
            <LogoText />
          </Animated.View>
        </LogoContainer>
      </Container>
      <Container />
    </GradientContainer>
  );
};

export default Start;
