import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components/native";
import MyText from "~/components/common/MyText";
import { WalkDetailMonthScreenProps } from "~/types/navigator";
import palette from "~/styles/palette";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import Divider from "~/components/common/Divider";
import { CalendarList, LocaleConfig } from "react-native-calendars";
import { days, months, noAvatar, noName } from "~/constants";
import {
  formatWalkDistance,
  formatWalkTime,
  isAndroid,
  permissionCheck,
} from "~/utils";
import deviceApi from "~/api/device";
import { ScrollView, StyleSheet, View } from "react-native";
import Dissolve from "~/components/common/Dissolve";
import Button from "~/components/common/Button";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";
import { useIsFocused } from "@react-navigation/native";

const TopContainer = styled.View`
  align-items: center;
`;

const Image = styled.Image<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    width: ${rpWidth(70)}px;
    height: ${rpWidth(70)}px;
    border-radius: ${rpWidth(35)}px;
    margin-top: ${rpWidth(25)}px;
    margin-bottom: ${rpWidth(15)}px;
  `}
`;

const RowContainer = styled.View<{ rpWidth: RpWidth }>`
  flex-direction: row;
  justify-content: space-between;
  ${({ rpWidth }) => css`
    padding: 0 ${rpWidth(16)}px;
    margin-top: ${rpWidth(30)}px;
  `}
`;

const NoWalkRecord = styled.View`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  flex-grow: 1;
  justify-content: center;
`;

LocaleConfig.locales["ko"] = {
  monthNames: months,
  monthNamesShort: months,
  dayNames: days,
  dayNamesShort: days,
  today: "오늘",
};
LocaleConfig.defaultLocale = "ko";

interface DateObj {
  [key: string]: { dots: { key: string; color: string }[] };
}

const WalkDetailMonth = ({
  navigation,
  route: {
    params: { deviceID, avatarUrl, name },
  },
}: WalkDetailMonthScreenProps) => {
  const [date, setDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });
  const [dateObj, setDateObj] = useState<DateObj>({});
  const { data, refetch, isFetching } = deviceApi.useGetMonthlyWalkRecordQuery(
    {
      deviceID,
      year: date.year,
      month: date.month,
    },
    { refetchOnMountOrArgChange: true },
  );
  const { rpWidth, isTablet } = useContext(DimensionsContext);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) refetch();
  }, [isFocused]);

  useEffect(() => {
    if (!data) return;
    // markedDates obj 변경되어도 달력의 dots 변화없는 문제 해결
    // https://github.com/wix/react-native-calendars/issues/726#issuecomment-458659037
    const obj: DateObj = JSON.parse(JSON.stringify(dateObj));

    // 날짜 배열 아래와 같이 생성
    //  [["2021-10-16", "0", "isLast"], ["2021-10-17", "0"], ["2021-10-17", "1", "isLast"], ["2021-10-18", "0", "isLast"]]
    const dateArr = data.day_count
      .map(({ date, count }) => {
        const arr: string[][] = [];
        for (let i = 0; i < count; i++) {
          arr.push([date, i.toString(), ...(i === count - 1 ? ["last"] : [])]);
        }
        return arr;
      })
      .flat();

    // 해당 날짜 산책기록이 전부 삭제되어 dateArr에서 필터링을 못할 때
    const emptyKeys = Object.keys(obj).filter(
      date => !dateArr.map(date => date[0]).includes(date),
    );
    if (emptyKeys.length) {
      emptyKeys.forEach(date => {
        delete obj[date];
      });
    }

    if (dateArr.length) {
      dateArr.forEach(date => {
        // 날짜 key가 없으면 새로 생성
        if (!obj[date[0]]) {
          obj[date[0]] = { dots: [{ key: date[1], color: palette.blue_7b }] };
          return;
        }
        // dots 배열의 모든 항목 중 같은 키가 없을 때 push => 중복 push 방지 목적
        if (obj[date[0]].dots.every(item => item.key !== date[1])) {
          obj[date[0]].dots.push({ key: date[1], color: palette.blue_7b });
        }

        // 산책 기록이 삭제되어 dots 배열에 담긴 수가 새로 받아온 날짜 배열의 마지막 인덱스보다 클 때
        if (date[2] && obj[date[0]].dots.length - 1 > parseInt(date[1], 10)) {
          const numOfStale =
            obj[date[0]].dots.length - 1 - parseInt(date[1], 10);
          obj[date[0]].dots.splice(-numOfStale);
        }
      });
    }

    setDateObj(obj);
  }, [data]);

  const isNoWalkRecordVisible =
    data !== undefined &&
    !data.day_count.length &&
    date.month === new Date().getMonth() + 1 &&
    !isFetching;

  return (
    <ScrollView>
      <TopContainer>
        <Image
          rpWidth={rpWidth}
          source={avatarUrl ? { uri: avatarUrl } : noAvatar}
        />
        <MyText style={{ marginBottom: rpWidth(19) }} fontWeight="medium">
          {name || noName}
        </MyText>
      </TopContainer>
      <Divider isHairline={false} />
      <View>
        <CalendarList
          onVisibleMonthsChange={months => {
            setDate({ year: months[0].year, month: months[0].month });
          }}
          onDayPress={day => {
            if (Object.keys(dateObj).some(date => date === day.dateString)) {
              navigation.navigate("WalkDetailDay", {
                deviceID,
                avatarUrl,
                date: day.dateString,
              });
            }
          }}
          monthFormat="M월"
          pagingEnabled
          horizontal
          futureScrollRange={0}
          markedDates={dateObj}
          theme={{
            // @ts-ignore
            "stylesheet.calendar.header": {
              monthText: {
                margin: rpWidth(37),
                fontFamily: "NotoSansKR-Medium",
                fontSize: rpWidth(18),
                color: palette.blue_7b,
                includeFontPadding: false,
              },
              dayHeader: {
                fontFamily: "NotoSansKR-Regular",
                fontSize: rpWidth(12),
                color: "rgba(0, 0, 0, 0.8)",
                includeFontPadding: false,
              },
            },
            "stylesheet.day.basic": {
              base: {
                width: rpWidth(32),
                height: rpWidth(32),
                alignItems: "center",
              },
              text: {
                marginTop: isAndroid ? rpWidth(4) : rpWidth(6),
                fontFamily: "NotoSansKR-Regular",
                fontSize: rpWidth(16),
                color: "rgba(0, 0, 0, 0.8)",
                includeFontPadding: false,
              },
            },
            "stylesheet.dot": {
              dot: {
                width: isTablet ? rpWidth(4) : 4,
                height: isTablet ? rpWidth(4) : 4,
                marginTop: 1,
                marginHorizontal: isTablet ? 2 : 1,
                borderRadius: isTablet ? rpWidth(2) : 2,
                opacity: 0,
              },
            },
          }}
          markingType="multi-dot"
        />
        <Dissolve
          pointerEvents="none"
          style={StyleSheet.absoluteFill}
          isVisible={isNoWalkRecordVisible}>
          <NoWalkRecord pointerEvents="none">
            <MyText
              color="rgba(0, 0, 0, 0.5)"
              fontWeight="light"
              fontSize={18}
              style={{ textAlign: "center" }}>
              산책 기록이 없습니다.{"\n"}첫 산책을 시작해보세요!
            </MyText>
          </NoWalkRecord>
        </Dissolve>
        <Dissolve
          style={{ position: "absolute", bottom: 0, alignSelf: "center" }}
          isVisible={isNoWalkRecordVisible}>
          <Button
            onPress={() => {
              permissionCheck("location").then(() => {
                dispatch(
                  storageActions.setWalk({
                    selectedDeviceId: [deviceID],
                  }),
                );
                navigation.replace("LoggedInNav", {
                  initialRouteName: "WalkMap",
                });
              });
            }}
            style={{ width: rpWidth(126) }}>
            산책 시작
          </Button>
        </Dissolve>
        {data && data.day_count.length !== 0 ? (
          <RowContainer rpWidth={rpWidth}>
            <MyText
              style={{ width: "33.3%", textAlign: "center" }}
              fontSize={24}
              color="rgba(0, 0, 0, 0.5)">
              {data?.summary.count || 0}회
            </MyText>
            <MyText
              style={{ width: "33.3%", textAlign: "center" }}
              fontSize={24}
              color={palette.blue_7b}>
              {
                formatWalkTime(data?.summary.total_time || 0)
                  .toString()
                  .split(" ")[0]
              }
            </MyText>
            <MyText
              style={{ width: "33.3%", textAlign: "center" }}
              fontSize={24}
              color={palette.blue_7b}>
              {formatWalkDistance(data?.summary.total_distance || 0)}
            </MyText>
          </RowContainer>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default WalkDetailMonth;
