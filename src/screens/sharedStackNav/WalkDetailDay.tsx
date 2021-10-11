import React, { useContext } from "react";
import { ScrollView, View } from "react-native";
import styled, { css } from "styled-components/native";
import MyText from "~/components/common/MyText";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import palette from "~/styles/palette";
import { WalkDetailDayScreenProps } from "~/types/navigator";

import Timer from "~/assets/svg/walk/timer.svg";
import Path from "~/assets/svg/walk/path.svg";
import Divider from "~/components/common/Divider";

const Container = styled.View<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    padding-top: ${rpWidth(35)}px;
    padding-bottom: ${rpWidth(65)}px;
  `}
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SvgContainer = styled(RowContainer)<{ rpWidth: RpWidth }>`
  justify-content: space-evenly;
  ${({ rpWidth }) => css`
    margin-top: ${rpWidth(40)}px;
    margin-bottom: ${rpWidth(25)}px;
  `}
`;

const Avatar = styled.Image<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    width: ${rpWidth(70)}px;
    height: ${rpWidth(70)}px;
    border-radius: ${rpWidth(35)}px;
    margin-right: ${rpWidth(25)}px;
  `}
`;

const MapContainer = styled.View<{ rpWidth: RpWidth }>`
  padding: ${({ rpWidth }) => `0 ${rpWidth(28)}px`};
`;

const Map = styled.Image`
  width: 100%;
  height: 100%;
`;

const data = [
  {
    avatarUrl: require("~/assets/image/test.jpg"),
    name: "엄마",
    time: "10:30 ~ 11:00",
    duration: "30분",
    distance: "1.5km",
    photo: require("~/assets/image/test.jpg"),
  },
  {
    avatarUrl: require("~/assets/image/test.jpg"),
    name: "엄마",
    time: "10:30 ~ 11:00",
    duration: "30분",
    distance: "1.5km",
    photo: require("~/assets/image/test.jpg"),
  },
];

const WalkDetailDay = ({ navigation, route }: WalkDetailDayScreenProps) => {
  const { rpWidth, width } = useContext(DimensionsContext);

  return (
    <ScrollView>
      {data.map((item, index) => (
        <>
          <Container rpWidth={rpWidth} key={index}>
            <RowContainer style={{ paddingHorizontal: rpWidth(32) }}>
              <Avatar rpWidth={rpWidth} source={item.avatarUrl} />
              <View>
                <MyText
                  color={palette.blue_7b}
                  style={{ marginBottom: rpWidth(5) }}>
                  {item.name}
                </MyText>
                <MyText color="rgba(0, 0, 0, 0.5)">{item.time}</MyText>
              </View>
            </RowContainer>
            <SvgContainer rpWidth={rpWidth}>
              <RowContainer>
                <Timer
                  width={rpWidth(22)}
                  height={rpWidth(27)}
                  style={{ marginRight: rpWidth(17) }}
                />
                <MyText color={palette.blue_7b} fontSize={24}>
                  {item.duration}
                </MyText>
              </RowContainer>
              <RowContainer>
                <Path
                  width={rpWidth(21)}
                  height={rpWidth(22)}
                  style={{ marginRight: rpWidth(17) }}
                />
                <MyText color={palette.blue_7b} fontSize={24}>
                  {item.distance}
                </MyText>
              </RowContainer>
            </SvgContainer>
            <MapContainer rpWidth={rpWidth} style={{ height: width * 0.66 }}>
              <Map source={item.avatarUrl} />
            </MapContainer>
          </Container>
          {data.length > 1 && index !== data.length - 1 ? (
            <Divider
              style={{ width: width - rpWidth(34), alignSelf: "center" }}
            />
          ) : null}
        </>
      ))}
    </ScrollView>
  );
};

export default WalkDetailDay;
