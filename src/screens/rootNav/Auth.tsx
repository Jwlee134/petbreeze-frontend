import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
import GradientContainer from "~/components/common/container/GradientContainer";
import Footprint from "~/assets/svg/footprint/footprint-app-icon-blue.svg";
import AppName from "~/assets/svg/app-name.svg";
import useAnimatedSequence from "~/hooks/useAnimatedSequence";
import MyText from "~/components/common/MyText";
import Input from "~/components/common/Input";
import { isIos } from "~/utils";
import { DimensionsContext } from "~/context/DimensionsContext";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import SocialLogin from "~/components/auth/SocialLogin";
import Policies from "~/components/auth/Policies";

const TopContainer = styled.View`
  flex: 1;
`;

const BottomContainer = styled(Animated.View)`
  flex: 1;
`;

const LogoContainer = styled(Animated.View)`
  position: absolute;
  align-items: center;
  align-self: center;
`;

const InputContainer = styled(Animated.View)``;

const BtnContainer = styled(Animated.View)`
  flex-direction: row;
  justify-content: center;
`;

const TextContainer = styled(Animated.View)`
  align-items: center;
  position: absolute;
  text-align: center;
  width: 100%;
`;

const Auth = () => {
  const { rpHeight, rpWidth } = useContext(DimensionsContext);
  const { bottom } = useSafeAreaInsets();
  const [slideTop, opacity] = useAnimatedSequence({
    numOfValues: 2,
    delayAfterMount: 200,
  });

  const translateYLogo = slideTop.interpolate({
    inputRange: [0, 1],
    outputRange: [rpHeight(isIos ? 262 : 218), rpHeight(84)],
  });

  const scaleLogo = slideTop.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.6],
  });

  const ref = useRef<TextInput>(null);
  const timeout = useRef<NodeJS.Timeout>();
  const [name, setName] = useState("");
  const [showBtn, setShowBtn] = useState(false);
  const value = useRef(new Animated.Value(0)).current;

  const translateYInput = value.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -rpHeight(86)],
  });

  useEffect(() => {
    if (showBtn) {
      Animated.timing(value, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [showBtn]);

  useEffect(() => {
    if (ref.current && !showBtn) {
      timeout.current = setTimeout(() => {
        ref.current?.focus();
      }, 600);
    }
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [ref.current, timeout.current, showBtn]);

  const handleSubmit = () => {
    if (!name) return;
    Keyboard.dismiss();
    setShowBtn(true);
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
                transform: [
                  { translateY: translateYLogo },
                  { scale: scaleLogo },
                ],
              }}>
              <Footprint
                style={{ marginBottom: rpHeight(38) }}
                width={rpWidth(60)}
                height={rpHeight(83)}
              />
              <AppName width={rpWidth(137)} height={rpHeight(47)} />
            </LogoContainer>
          </TopContainer>
          <BottomContainer
            style={{
              opacity,
              justifyContent: showBtn ? "flex-start" : "center",
            }}>
            {!showBtn ? (
              <MyText
                style={{ textAlign: "center", marginBottom: rpHeight(34) }}
                color="white"
                fontSize={20}
                fontWeight="light">
                반갑습니다 :){"\n"}내 이름을 설정해주세요.
              </MyText>
            ) : null}
            <InputContainer
              style={{
                paddingHorizontal: rpWidth(50),
                transform: [{ translateY: translateYInput }],
              }}>
              <Input
                ref={ref}
                isWhiteBorder
                value={name}
                onChangeText={text => setName(text)}
                textAlign="center"
                onSubmitEditing={handleSubmit}
                editable={!showBtn}
              />
            </InputContainer>
            {showBtn ? (
              <>
                <BtnContainer style={{ opacity: value }}>
                  <SocialLogin name={name} />
                </BtnContainer>
                <TextContainer
                  style={{
                    bottom: rpWidth(34) + bottom,
                    opacity: value,
                  }}>
                  <Policies />
                </TextContainer>
              </>
            ) : null}
          </BottomContainer>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </GradientContainer>
  );
};

export default Auth;
