import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import MyText from "~/components/common/MyText";
import palette from "~/styles/palette";
import Divider from "~/components/common/Divider";
import { CalendarList, LocaleConfig } from "react-native-calendars";
import {
  DAYS,
  MONTHS,
  DEFAULT_AVATAR,
  DEFAULT_NAME,
  IS_ANDROID,
} from "~/constants";
import { formatWalkDistance, formatWalkTime } from "~/utils";
import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import Dissolve from "~/components/common/Dissolve";
import Button from "~/components/common/Button";
import { WalkDetailMonthScreenProps } from "~/types/navigator";
import deviceApi from "~/api/device";
import { DateData } from "react-native-calendars/src/types";
import LoadingIndicator from "~/components/lottie/LoadingIndicator";

const TopContainer = styled.View`
  align-items: center;
`;

const Image = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  margin-top: 25px;
  margin-bottom: 15px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  border-width: 1px;
  border-color: ${palette.blue_7b};
  border-radius: 50px;
  height: 47px;
  align-self: center;
  align-items: center;
  margin-top: 31px;
`;

const Loader = styled.View`
  background-color: rgba(255, 255, 255, 0.9);
  flex-grow: 1;
`;

LocaleConfig.locales["ko"] = {
  monthNames: MONTHS,
  monthNamesShort: MONTHS,
  dayNames: DAYS,
  dayNamesShort: DAYS,
  today: "오늘",
};
LocaleConfig.defaultLocale = "ko";

const WalkDetailMonth = ({
  navigation,
  route: {
    params: { deviceID, avatarUrl, name },
  },
}: WalkDetailMonthScreenProps) => {
  const { width } = useWindowDimensions();
  const [date, setDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });
  const { data, isFetching, refetch } = deviceApi.useGetMonthlyWalkRecordQuery({
    deviceID,
    year: date.year,
    month: date.month,
  });

  useEffect(() => {
    if (data) refetch();
  }, []);

  const onMonthChange = (months: DateData[]) => {
    setDate({ year: months[0].year, month: months[0].month });
  };

  const onDayPress = (day: DateData) => {
    if (!data || !data.dateObj) return;
    if (Object.keys(data.dateObj).some(date => date === day.dateString)) {
      navigation.navigate("WalkDetailDay", {
        deviceID,
        avatarUrl,
        date: day.dateString,
        name,
      });
    }
  };

  const onStartWalking = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "WalkTopTabNav",
          params: { initialStartWalkingParams: { preSelectedID: deviceID } },
        },
      ],
    });
  };

  const isNoWalkRecordVisible =
    data === null &&
    date.month === new Date().getMonth() + 1 &&
    date.year === new Date().getFullYear();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <TopContainer>
        <Image source={avatarUrl ? { uri: avatarUrl } : DEFAULT_AVATAR} />
        <MyText style={{ marginBottom: 19 }} fontWeight="medium">
          {name || DEFAULT_NAME}
        </MyText>
      </TopContainer>
      <Divider isHairline={false} />
      <View style={{ flexGrow: 1, paddingVertical: 31 }}>
        <CalendarList
          calendarWidth={width}
          onVisibleMonthsChange={onMonthChange}
          onDayPress={onDayPress}
          monthFormat="M월"
          pagingEnabled
          horizontal
          futureScrollRange={0}
          markedDates={data?.dateObj || undefined}
          theme={{
            // @ts-ignore
            "stylesheet.calendar.header": {
              monthText: {
                fontFamily: "NotoSansKR-Medium",
                fontSize: 18,
                color: palette.blue_7b,
                includeFontPadding: false,
              },
              week: {
                marginTop: 31,
                flexDirection: "row",
                justifyContent: "space-around",
              },
              dayHeader: {
                fontFamily: "NotoSansKR-Regular",
                fontSize: 12,
                color: "rgba(0, 0, 0, 0.8)",
                includeFontPadding: false,
              },
            },
            "stylesheet.day.basic": {
              text: {
                marginTop: IS_ANDROID ? 4 : 6,
                fontFamily: "NotoSansKR-Regular",
                fontSize: 16,
                color: "rgba(0, 0, 0, 0.8)",
                includeFontPadding: false,
              },
            },
            "stylesheet.dot": {
              dot: {
                width: 5,
                height: 5,
                marginTop: 1,
                marginHorizontal: 1.5,
                borderRadius: 2.5,
                opacity: 0,
              },
            },
          }}
          markingType="multi-dot"
        />
        <Dissolve
          pointerEvents="none"
          style={{ ...(StyleSheet.absoluteFill as object), zIndex: 10 }}
          isVisible={isFetching || isNoWalkRecordVisible}>
          {isNoWalkRecordVisible ? (
            <Loader style={{ justifyContent: "flex-end" }} pointerEvents="none">
              <MyText
                color="rgba(0, 0, 0, 0.5)"
                fontWeight="light"
                fontSize={18}
                style={{ textAlign: "center", marginBottom: 249 }}>
                산책 기록이 없습니다.{"\n"}첫 산책을 시작해보세요!
              </MyText>
            </Loader>
          ) : (
            <Loader style={{ justifyContent: "center", alignItems: "center" }}>
              <LoadingIndicator size={60} />
            </Loader>
          )}
        </Dissolve>
        <Dissolve
          style={{
            position: "absolute",
            alignSelf: "center",
            bottom: 84,
            zIndex: 11,
          }}
          isVisible={isNoWalkRecordVisible}>
          <Button onPress={onStartWalking} style={{ width: 126 }}>
            산책 시작
          </Button>
        </Dissolve>
        {data?.summary && !isFetching ? (
          <RowContainer style={{ width: width - 64 }}>
            <MyText
              style={{ width: "33.3%", textAlign: "center" }}
              fontSize={20}
              color="rgba(0, 0, 0, 0.5)">
              {data.summary.count || 0}회
            </MyText>
            <MyText
              style={{ width: "33.3%", textAlign: "center" }}
              fontSize={20}
              color={palette.blue_7b}>
              {
                formatWalkTime(data.summary.total_time || 0)
                  .toString()
                  .split(" ")[0]
              }
            </MyText>
            <MyText
              style={{ width: "33.3%", textAlign: "center" }}
              fontSize={20}
              color={palette.blue_7b}>
              {formatWalkDistance(data.summary.total_distance || 0)}
            </MyText>
          </RowContainer>
        ) : (
          <View style={{ height: 47, marginTop: 31 }} />
        )}
      </View>
    </ScrollView>
  );
};

export default WalkDetailMonth;
