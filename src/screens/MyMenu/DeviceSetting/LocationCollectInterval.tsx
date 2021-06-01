import React, { Fragment, useRef, useState } from "react";
import {
  Animated,
  Easing,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";

import Ionicons from "react-native-vector-icons/Ionicons";
import ShadowContainer from "~/components/common/container/ShadowContainer";
import palette from "~/styles/palette";

const InfoText = styled.Text`
  font-size: 15px;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 48px;
`;

const TopContainer = styled.View`
  z-index: 1;
  background-color: white;
  padding: 0px 25px;
`;

const Button = styled.TouchableHighlight`
  border-radius: 4px;
  width: 100%;
  height: 56px;
  background-color: white;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;
`;

const LeftContainer = styled.View``;

const RightContainer = styled(Animated.View)``;

const Title = styled.Text`
  font-size: 13px;
  color: rgba(17, 17, 17, 0.48);
  margin-bottom: 4px;
`;

const Value = styled.Text`
  font-size: 16px;
`;

const Content = styled(Animated.View)`
  border-radius: 4px;
  width: 100%;
  background-color: white;
  margin-top: 5px;
  overflow: hidden;
`;

const List = styled.TouchableHighlight`
  width: 100%;
  padding: 16px;
  background-color: white;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const data = ["실시간", "1분", "2분", "5분", "10분"];

const LocationCollectInterval = () => {
  const value = useRef(new Animated.Value(0)).current;

  const [selectedIndex, setSelectedIndex] = useState(2);

  const [isOpened, setIsOpened] = useState(false);
  const handlePress = () => setIsOpened(!isOpened);

  const rotateInterpolate = value.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const translateInterpolate = value.interpolate({
    inputRange: [0, 1],
    outputRange: ["-300px", "0px"],
  });

  const opacityInterpolate = value.interpolate({
    inputRange: [0, 0.1, 1],
    outputRange: [0, 0.9, 1],
  });

  Animated.timing(value, {
    toValue: isOpened ? 1 : 0,
    duration: 150,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <TouchableOpacity
        activeOpacity={1}
        style={{ flexGrow: 1 }}
        onPress={() => setIsOpened(false)}>
        <TopContainer>
          <InfoText>
            위치정보 수집주기는{"\n"} 짧을수록 배터리가 더 빨리 방전되니
            참고해주세요.
          </InfoText>
          <ShadowContainer shadowContainerStyle={{ zIndex: 1 }}>
            <Button onPress={handlePress} underlayColor={palette.gray_f3}>
              <Fragment>
                <LeftContainer>
                  <Title>위치정보 수집주기</Title>
                  <Value>{data[selectedIndex]}</Value>
                </LeftContainer>
                <RightContainer
                  style={{ transform: [{ rotate: rotateInterpolate }] }}>
                  <Ionicons name="chevron-down" size={24} />
                </RightContainer>
              </Fragment>
            </Button>
          </ShadowContainer>
        </TopContainer>
        <SidePaddingContainer>
          <ShadowContainer>
            <Content
              style={{
                opacity: opacityInterpolate,
                transform: [{ translateY: translateInterpolate }],
              }}>
              {data.map((item, index) => (
                <List
                  key={index}
                  onPress={() => {
                    setSelectedIndex(index);
                    setIsOpened(false);
                  }}
                  underlayColor={palette.gray_f3}>
                  <Fragment>
                    <Value>{item}</Value>
                    {selectedIndex === index && (
                      <Ionicons name="checkmark" size={24} />
                    )}
                  </Fragment>
                </List>
              ))}
            </Content>
          </ShadowContainer>
        </SidePaddingContainer>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LocationCollectInterval;
