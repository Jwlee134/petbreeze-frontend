import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
import GradientContainer from "~/components/common/container/GradientContainer";
import { AuthScreenNavigationProp } from "~/types/navigator";
import Footprint from "~/assets/svg/footprint/footprint-app-icon-blue.svg";
import AppName from "~/assets/svg/app-name.svg";
import { rpHeight, rpWidth } from "~/styles";
import useAnimatedSequence from "~/hooks/useAnimatedSequence";
import MyText from "~/components/common/MyText";
import Input from "~/components/common/Input";
import { isIos } from "~/utils";

const TopContainer = styled.View`
  flex: 1;
`;

const BottomContainer = styled(Animated.View)`
  flex: 1;
  justify-content: center;
`;

const LogoContainer = styled(Animated.View)`
  position: absolute;
  align-items: center;
  align-self: center;
`;

const PaddingContainer = styled.View`
  padding: 0px ${rpWidth(50)}px;
`;

const Auth = ({ navigation }: { navigation: AuthScreenNavigationProp }) => {
  const [slideTop, opacity] = useAnimatedSequence({
    numOfValues: 2,
    delayAfterMount: 200,
  });

  const translateY = slideTop.interpolate({
    inputRange: [0, 1],
    outputRange: [rpHeight(isIos ? 262 : 218), rpHeight(84)],
  });

  const scale = slideTop.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.6],
  });

  const ref = useRef<TextInput>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    if (ref.current) {
      setTimeout(() => {
        ref.current?.focus();
      }, 600);
    }
  }, [ref.current]);

  const handleSubmit = () => {
    if (!name) return;
    Keyboard.dismiss();
    navigation.replace("Loading", {
      previousRouteName: "Auth",
    });
  };

  return (
    <GradientContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={isIos ? "padding" : undefined}>
          <TopContainer>
            <LogoContainer
              style={{
                transform: [{ translateY }, { scale }],
              }}>
              <Footprint
                style={{ marginBottom: rpHeight(38) }}
                width={rpWidth(60)}
                height={rpHeight(83)}
              />
              <AppName width={rpWidth(137)} height={rpHeight(47)} />
            </LogoContainer>
          </TopContainer>
          <BottomContainer style={{ opacity }}>
            <MyText
              style={{ textAlign: "center", marginBottom: rpHeight(34) }}
              color="white"
              fontSize={20}
              fontWeight="light">
              반갑습니다 :){"\n"}내 이름을 설정해주세요.
            </MyText>
            <PaddingContainer>
              <Input
                ref={ref}
                isWhiteBorder
                value={name}
                onChangeText={text => setName(text)}
                textAlign="center"
                onSubmitEditing={handleSubmit}
              />
            </PaddingContainer>
          </BottomContainer>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </GradientContainer>
  );
};

export default Auth;
