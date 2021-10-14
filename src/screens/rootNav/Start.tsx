import React, { useContext } from "react";
import styled from "styled-components/native";
import GradientContainer from "~/components/common/container/GradientContainer";
import Footprint from "~/assets/svg/footprint/footprint-app-icon-blue.svg";
import AppName from "~/assets/svg/app-name.svg";
import { Animated, Linking } from "react-native";
import { StartScreenNavigationProp } from "~/types/navigator";
import { useDispatch } from "react-redux";
import useAnimatedSequence from "~/hooks/useAnimatedSequence";
import * as SecureStore from "expo-secure-store";
import { isAndroid, isIos } from "~/utils";
import { DimensionsContext } from "~/context/DimensionsContext";
import messaging from "@react-native-firebase/messaging";
import setInitialRoute from "~/utils/setInitialRoute";
import { navigatorActions } from "~/store/navigator";
import userApi from "~/api/user";

const Container = styled.View`
  flex: 1;
`;

const LogoContainer = styled(Animated.View)`
  position: absolute;
  align-items: center;
  align-self: center;
`;

const Start = ({ navigation }: { navigation: StartScreenNavigationProp }) => {
  const dispatch = useDispatch();
  const { rpWidth, rpHeight } = useContext(DimensionsContext);
  const [handleRead] = userApi.useReadNotificationsMutation();

  const onAnimatedFinish = async () => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      console.log(`🔐 Here's your value 🔐 \n + ${token}`);

      if (isAndroid) {
        const link = await Linking.getInitialURL();
        if (link && link.includes("walk")) {
          dispatch(
            navigatorActions.setInitialRoute({
              initialLoggedInNavRouteName: "WalkMap",
            }),
          );
          navigation.replace("LoggedInNav");
          return;
        }
      }

      const remoteMessage = await messaging().getInitialNotification();
      console.log(
        "Notification caused app to open from quit state:",
        remoteMessage,
      );
      if (remoteMessage) {
        /* if(remoteMessage.data.messageId){
          try {
            await handleRead([remoteMessage.data.messageId]).unwrap()
          } catch (error) {
            console.log(error)
          }
        } */
        if (remoteMessage.notification?.title === "Test") {
          dispatch(
            navigatorActions.setInitialRoute({
              initialLoggedInNavRouteName: "DeviceAlert",
            }),
          );
        }
      } else {
        setInitialRoute();
      }
      navigation.replace("LoggedInNav");
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
    outputRange: [rpHeight(isIos ? 181 : 137), rpHeight(isIos ? 262 : 218)],
  });

  return (
    <GradientContainer>
      <Container>
        <LogoContainer style={{ transform: [{ translateY }] }}>
          <Animated.View
            style={{
              opacity: footprint,
              width: rpWidth(60),
              height: rpHeight(83),
              marginBottom: rpHeight(38),
            }}>
            <Footprint width="100%" height="100%" />
          </Animated.View>
          <Animated.View
            style={{
              opacity: appName,
              width: rpWidth(137),
              height: rpHeight(47),
            }}>
            <AppName width="100%" height="100%" />
          </Animated.View>
        </LogoContainer>
      </Container>
      <Container />
    </GradientContainer>
  );
};

export default Start;
