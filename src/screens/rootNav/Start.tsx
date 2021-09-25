import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import GradientContainer from "~/components/common/container/GradientContainer";
import Footprint from "~/assets/svg/footprint/footprint-app-icon-blue.svg";
import AppName from "~/assets/svg/app-name.svg";
import { Animated } from "react-native";
import { StartScreenNavigationProp } from "~/types/navigator";
import { useDispatch } from "react-redux";
import useAnimatedSequence from "~/hooks/useAnimatedSequence";
import * as SecureStore from "expo-secure-store";
import { isIos } from "~/utils";
import { DimensionsContext } from "~/context/DimensionsContext";
import messaging from "@react-native-firebase/messaging";
import setInitialRoute from "~/utils/setInitialRoute";
import { navigatorActions } from "~/store/navigator";

const Container = styled.View`
  flex: 1;
`;

const LogoContainer = styled(Animated.View)`
  position: absolute;
  align-items: center;
  align-self: center;
`;

const Start = ({ navigation }: { navigation: StartScreenNavigationProp }) => {
  const [renderAuth, setRenderAuth] = useState<boolean | null>(null);
  const dispatch = useDispatch();
  const { rpWidth, rpHeight } = useContext(DimensionsContext);

  const onAnimatedFinish = () => {
    if (renderAuth) {
      navigation.replace("Auth");
    }
    if (renderAuth === false) {
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage,
          );
          if (remoteMessage) {
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
        });
    }
  };

  const [footprint, appName] = useAnimatedSequence({
    numOfValues: 3,
    onAnimatedFinish,
    shouldDelayOnMount: false,
    delayAfterFirst: 400,
    dependencies: [renderAuth],
  });

  const translateY = footprint.interpolate({
    inputRange: [0, 1],
    outputRange: [rpHeight(isIos ? 181 : 137), rpHeight(isIos ? 262 : 218)],
  });

  useEffect(() => {
    SecureStore.getItemAsync("token").then(value => {
      if (value) {
        console.log("🔐 Here's your value 🔐 \n" + value);
        setRenderAuth(false);
      } else {
        console.log("No values stored under that key.");
        setRenderAuth(true);
      }
    });
  }, []);

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
