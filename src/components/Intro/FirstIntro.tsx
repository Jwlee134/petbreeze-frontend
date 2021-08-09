import React from "react";
import styled from "styled-components/native";
import { rpWidth, rpHeight, width } from "~/styles";
import Dog from "~/assets/svg/intro/dog-question-mark.svg";
import MyText from "~/components/common/MyText";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Container = styled.View`
  width: ${width}px;
  padding: 0px ${rpWidth(26)}px;
  justify-content: space-between;
`;

const FirstIntro = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <Container>
      <View>
        <MyText fontSize={30}>반려동물 실종은</MyText>
        <MyText
          fontWeight="bold"
          fontSize={30}
          style={{
            marginBottom: rpHeight(52),
          }}>
          가까이 있는 문제입니다.
        </MyText>
        <MyText fontWeight="light" fontSize={18} style={{ opacity: 0.7 }}>
          리드줄을 놓친 틈에,{"\n"}잠깐 문이 열린 틈에,{"\n"}반려동물 실종은
          예기치 못한 순간에 일어납니다.
        </MyText>
      </View>
      <Dog
        width={rpWidth(229)}
        height={rpHeight(319)}
        style={{
          marginBottom: rpHeight(150) + bottom,
          marginLeft: "auto",
          marginRight: rpWidth(20),
        }}
      />
    </Container>
  );
};

export default FirstIntro;
