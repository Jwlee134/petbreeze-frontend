import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import { PolicyScreenNavigationProp } from "~/types/navigator";
import PolicyIcon from "~/assets/svg/policy/policy.svg";
import Button from "~/components/common/Button";
import MyText from "~/components/common/MyText";
import { Animated, Linking } from "react-native";
import CheckCircle from "~/components/common/CheckCircle";
import Arrow from "~/assets/svg/arrow/arrow-right-light-gray.svg";
import { DimensionsContext, RpHeight } from "~/context/DimensionsContext";
import useAnimatedSequence from "~/hooks/useAnimatedSequence";
import { useSafeAreaFrame } from "react-native-safe-area-context";

const TopContainer = styled(Animated.View)`
  flex-grow: 1;
  justify-content: flex-end;
`;

const BottomContainer = styled.View`
  justify-content: flex-end;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ListItem = styled.Pressable<{ rpHeight: RpHeight }>`
  height: ${({ rpHeight }) => rpHeight(49)}px;
  padding-left: 47px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ArrowButton = styled.Pressable`
  height: 100%;
  width: 50px;
  justify-content: center;
`;

const Divider = styled.View`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.3);
  align-self: center;
  margin-top: 5px;
  margin-bottom: 14px;
`;

const data = [
  {
    isNecessary: true,
    title: "서비스 이용약관",
    onArrowPress: () =>
      Linking.openURL("https://petbreeze.co/terms-and-conditions"),
  },
  {
    isNecessary: true,
    title: "개인정보 처리방침",
    onArrowPress: () => Linking.openURL("https://petbreeze.co/privacy-policy"),
  },
  {
    isNecessary: true,
    title: "위치기반서비스 이용약관",
    onArrowPress: () => Linking.openURL("https://petbreeze.co/location-policy"),
  },
  {
    isNecessary: false,
    title: "마케팅 수신, 개인정보 제공",
    onArrowPress: () => {},
  },
];

const Policy = ({ navigation }: { navigation: PolicyScreenNavigationProp }) => {
  const { width, rpHeight } = useContext(DimensionsContext);
  const handleNext = () => navigation.navigate("Permission");
  const [selected, setSelected] = useState<number[]>([]);
  const [value1, value2] = useAnimatedSequence({ numOfValues: 2 });
  const { height } = useSafeAreaFrame();

  const handlePress = (i: number) =>
    setSelected(prev => {
      const copy = [...prev];
      if (copy.includes(i)) {
        copy.splice(
          copy.findIndex(value => value === i),
          1,
        );
      } else {
        copy.push(i);
      }
      return copy;
    });

  return (
    <>
      <TopContainer style={{ opacity: value1 }}>
        <PolicyIcon
          width={rpHeight(88)}
          height={rpHeight(99)}
          style={{ alignSelf: "center", marginBottom: rpHeight(30) }}
        />
        <MyText
          fontSize={24}
          style={{ textAlign: "center", marginBottom: rpHeight(45) }}>
          필수약관에{"\n"}동의해주세요.
        </MyText>
      </TopContainer>
      <BottomContainer style={{ minHeight: height / 2 }}>
        <Animated.View style={{ opacity: value2 }}>
          <ListItem
            rpHeight={rpHeight}
            onPress={() => setSelected([0, 1, 2, 3])}>
            <RowContainer>
              <CheckCircle selected={selected.length === 4} />
              <MyText
                fontSize={18}
                color="rgba(0, 0, 0, 0.7)"
                fontWeight="medium"
                style={{ marginLeft: 15 }}>
                모두 동의합니다.
              </MyText>
            </RowContainer>
          </ListItem>
          <Divider style={{ width: width - 100 }} />
          {data.map((item, i) => (
            <ListItem
              rpHeight={rpHeight}
              key={i}
              onPress={() => handlePress(i)}>
              <RowContainer>
                <CheckCircle selected={selected.includes(i)} />
                <MyText
                  fontSize={14}
                  color="rgba(0, 0, 0, 0.5)"
                  style={{ marginLeft: 15, marginRight: 3 }}>
                  ({item.isNecessary ? "필수" : "선택"})
                </MyText>
                <MyText
                  fontSize={14}
                  color="rgba(0, 0, 0, 0.5)"
                  fontWeight="light">
                  {item.title}
                </MyText>
              </RowContainer>
              <ArrowButton onPress={item.onArrowPress}>
                <Arrow />
              </ArrowButton>
            </ListItem>
          ))}
        </Animated.View>
        <Button
          disabled={
            !selected.includes(0) ||
            !selected.includes(1) ||
            !selected.includes(2)
          }
          style={{ marginTop: rpHeight(45) }}
          useCommonMarginBottom
          useBottomInset
          onPress={handleNext}>
          다음
        </Button>
      </BottomContainer>
    </>
  );
};

export default Policy;
