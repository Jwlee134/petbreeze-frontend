import React, { Fragment, useState } from "react";
import { Animated, ScrollView } from "react-native";
import styled from "styled-components/native";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";

import ShadowContainer from "~/components/common/container/ShadowContainer";
import palette from "~/styles/palette";
import useAnimatedList from "~/hooks/useAnimatedList";

const TopContainer = styled.View`
  z-index: 1;
  background-color: white;
  padding: 25px 25px 0px 25px;
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
  const [selectedIndex, setSelectedIndex] = useState(2);

  const {
    isOpened,
    setIsOpened,
    OutsideClickHandler,
    IconContainer,
    ListContainer,
  } = useAnimatedList();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <OutsideClickHandler>
        <TopContainer>
          <ShadowContainer shadowContainerStyle={{ zIndex: 1 }}>
            <Button
              onPress={() => {
                setIsOpened(!isOpened);
              }}
              underlayColor={palette.gray_f3}>
              <Fragment>
                <LeftContainer>
                  <Title>위치정보 수집주기</Title>
                  <Value>{data[selectedIndex]}</Value>
                </LeftContainer>
                <IconContainer></IconContainer>
              </Fragment>
            </Button>
          </ShadowContainer>
        </TopContainer>
        <SidePaddingContainer>
          <ShadowContainer>
            <ListContainer
              style={{
                borderRadius: 4,
                marginTop: 5,
                overflow: "hidden",
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
                    {selectedIndex === index && <></>}
                  </Fragment>
                </List>
              ))}
            </ListContainer>
          </ShadowContainer>
        </SidePaddingContainer>
      </OutsideClickHandler>
    </ScrollView>
  );
};

export default LocationCollectInterval;
