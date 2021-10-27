import React, { useContext } from "react";
import styled from "styled-components/native";
import GradientContainer from "~/components/common/container/GradientContainer";
import Footprint from "~/assets/svg/footprint/footprint-app-icon-blue.svg";
import { Animated, Linking } from "react-native";
import { StartScreenNavigationProp } from "~/types/navigator";
import useAnimatedSequence from "~/hooks/useAnimatedSequence";
import * as SecureStore from "expo-secure-store";
import { isAndroid, isIos } from "~/utils";
import { DimensionsContext } from "~/context/DimensionsContext";
import messaging from "@react-native-firebase/messaging";
import userApi from "~/api/user";
import { secureItems } from "~/constants";
import notificationHandler from "~/utils/notificationHandler";
import MyText from "~/components/common/MyText";

const Container = styled.View`
  flex: 1;
`;

const LogoContainer = styled(Animated.View)`
  position: absolute;
  align-items: center;
  align-self: center;
`;

const Start = ({ navigation }: { navigation: StartScreenNavigationProp }) => {
  const { rpWidth, rpHeight } = useContext(DimensionsContext);
  const [handleRead] = userApi.useReadNotificationsMutation();

  const onAnimatedFinish = async () => {
    const token = await SecureStore.getItemAsync(secureItems.token);
    const fbToken = await SecureStore.getItemAsync(secureItems.firebaseToken);
    if (token && fbToken) {
      console.log(`🔐 Here's your value 🔐 \n + ${token}`);
      console.log(`🔐 Here's your fb value 🔐 \n + ${fbToken}`);

      if (isAndroid) {
        const link = await Linking.getInitialURL();
        if (link && link.includes("walk")) {
          navigation.replace("LoggedInNav", {
            initialRouteName: "WalkMap",
          });
          return;
        }
      }

      const remoteMessage = await messaging().getInitialNotification();
      console.log(
        "Notification caused app to open from quit state:",
        remoteMessage,
      );
      if (remoteMessage) {
        notificationHandler(remoteMessage, navigation);
        /* if(remoteMessage.data.messageId){
          try {
            await handleRead([remoteMessage.data.messageId]).unwrap()
          } catch (error) {
            console.log(error)
          }
        } */
      } else {
        navigation.replace("LoggedInNav");
      }
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
              marginBottom: rpHeight(26),
            }}>
            <Footprint width="100%" height="100%" />
          </Animated.View>
          <Animated.View
            style={{
              opacity: appName,
            }}>
            <MyText fontSize={30} fontWeight="light" color="white">
              PETBREEZE
            </MyText>
          </Animated.View>
        </LogoContainer>
      </Container>
      <Container />
    </GradientContainer>
  );
};

export default Start;
