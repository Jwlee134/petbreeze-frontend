import React from "react";
import { rpWidth } from "~/styles";
import Dog from "~/assets/svg/dog/dog-question-mark.svg";
import MyText from "~/components/common/MyText";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IntroContainer } from "./styles";
import GradientContainer from "../common/container/GradientContainer";

const FirstIntro = () => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <GradientContainer isBlackStatusBar>
      <IntroContainer topInset={top} spaceBetween>
        <View style={{ paddingHorizontal: rpWidth(22) }}>
          <MyText color="white" fontSize={24}>
            반려동물 실종은
          </MyText>
          <MyText
            fontWeight="bold"
            fontSize={24}
            color="white"
            style={{
              marginBottom: rpWidth(53),
            }}>
            가까이 있는 문제입니다.
          </MyText>
          <MyText
            fontWeight="light"
            fontSize={16}
            color="white"
            style={{ opacity: 0.7 }}>
            리드줄을 놓친 틈에,{"\n"}잠깐 문이 열린 틈에,{"\n"}반려동물 실종은
            예기치 못한 순간에 일어납니다.
          </MyText>
        </View>
        <Dog
          width={rpWidth(175)}
          height={rpWidth(256)}
          style={{
            marginBottom: rpWidth(145) + bottom,
            marginLeft: "auto",
            marginRight: rpWidth(46),
          }}
        />
      </IntroContainer>
    </GradientContainer>
  );
};

export default FirstIntro;
