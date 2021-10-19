import React, { Fragment, useContext } from "react";
import { FlatList, ScrollView, View } from "react-native";
import styled, { css } from "styled-components/native";
import MyText from "~/components/common/MyText";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import palette from "~/styles/palette";
import { WalkDetailDayScreenProps } from "~/types/navigator";

import Timer from "~/assets/svg/walk/timer.svg";
import Path from "~/assets/svg/walk/path.svg";
import Divider from "~/components/common/Divider";
import deviceApi from "~/api/device";
import { formatWalkDistance, formatWalkTime } from "~/utils";
import { noAvatar } from "~/constants";

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

const WalkDetailDay = ({
  navigation,
  route: {
    params: { deviceID, date, avatar },
  },
}: WalkDetailDayScreenProps) => {
  const { rpWidth, width } = useContext(DimensionsContext);
  const { data } = deviceApi.useGetDailyWalkRecordQuery({
    deviceID,
    date,
  });

  const formatPeriod = (from: string, duration: number) => {
    const formatFrom = new Date(from);
    const formatTo = new Date(new Date(from).getTime() + duration * 60000);

    return `${formatFrom.getHours()}:${
      formatFrom.getMinutes() < 10
        ? `0${formatFrom.getMinutes()}`
        : formatFrom.getMinutes()
    } ~ ${formatTo.getHours()}:${
      formatTo.getMinutes() < 10
        ? `0${formatTo.getMinutes()}`
        : formatTo.getMinutes()
    }`;
  };

  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) => (
        <Fragment key={item.id}>
          <Container rpWidth={rpWidth}>
            <RowContainer style={{ paddingHorizontal: rpWidth(32) }}>
              <Avatar
                rpWidth={rpWidth}
                source={avatar ? { uri: avatar } : noAvatar}
              />
              <View>
                <MyText
                  color={palette.blue_7b}
                  style={{ marginBottom: rpWidth(5) }}>
                  {item.handler__nickname}
                </MyText>
                <MyText color="rgba(0, 0, 0, 0.5)">
                  {formatPeriod(item.start_date_time, item.time)}
                </MyText>
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
                  {formatWalkTime(item.time)}
                </MyText>
              </RowContainer>
              <RowContainer>
                <Path
                  width={rpWidth(21)}
                  height={rpWidth(22)}
                  style={{ marginRight: rpWidth(17) }}
                />
                <MyText color={palette.blue_7b} fontSize={24}>
                  {formatWalkDistance(item.distance)}
                </MyText>
              </RowContainer>
            </SvgContainer>
            <MapContainer rpWidth={rpWidth} style={{ height: width * 0.66 }}>
              <Map source={{ uri: item.path_image }} />
            </MapContainer>
          </Container>
          {data && data.length > 1 && index !== data.length - 1 ? (
            <Divider
              style={{ width: width - rpWidth(34), alignSelf: "center" }}
            />
          ) : null}
        </Fragment>
      )}
      onViewableItemsChanged={item => {
        console.log(item.viewableItems);
      }}
      viewabilityConfig={{ viewAreaCoveragePercentThreshold: 95 }}
    />
  );
};

export default WalkDetailDay;
