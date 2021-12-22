import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import MyText from "~/components/common/MyText";
import palette from "~/styles/palette";
import Divider from "~/components/common/Divider";
import { CalendarList, LocaleConfig } from "react-native-calendars";
import { days, months, noAvatar, noName } from "~/constants";
import { formatWalkDistance, formatWalkTime, isAndroid } from "~/utils";
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
  justify-content: space-between;
  padding: 30px 16px 0 16px;
`;

const NoWalkRecord = styled.View`
  background-color: rgba(255, 255, 255, 0.9);
  flex-grow: 1;
  justify-content: flex-end;
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
  const { width } = useWindowDimensions();

  const [date, setDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });
  const [dateObj, setDateObj] = useState<DateObj>({});

  const { data } = deviceApi.useGetMonthlyWalkRecordQuery(
    {
      deviceID,
      year: date.year,
      month: date.month,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

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
    const emptyKeys = Object.keys(obj).filter(objDate => {
      const year = new Date(objDate).getFullYear();
      const month = new Date(objDate).getMonth() + 1;
      const currentMonth = year === date.year && month === date.month;

      return currentMonth && !dateArr.map(date => date[0]).includes(objDate);
    });
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

  const onMonthChange = (months: DateData[]) => {
    setDate({ year: months[0].year, month: months[0].month });
  };

  const onDayPress = (day: DateData) => {
    if (Object.keys(dateObj).some(date => date === day.dateString)) {
      navigation.navigate("WalkDetailDay", {
        deviceID,
        avatarUrl,
        date: new Date(day.dateString).toISOString(),
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
          params: {
            initialStartWalkingParams: { preSelectedID: deviceID },
          },
        },
      ],
    });
  };

  const isNoWalkRecordVisible =
    data !== undefined &&
    !data.day_count.length &&
    date.month === new Date().getMonth() + 1 &&
    date.year === new Date().getFullYear();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <TopContainer>
        <Image source={avatarUrl ? { uri: avatarUrl } : noAvatar} />
        <MyText style={{ marginBottom: 19 }} fontWeight="medium">
          {name || noName}
        </MyText>
      </TopContainer>
      <Divider isHairline={false} />
      <View style={{ flexGrow: 1, paddingBottom: 30 }}>
        <CalendarList
          calendarWidth={width}
          onVisibleMonthsChange={onMonthChange}
          onDayPress={onDayPress}
          monthFormat="M월"
          pagingEnabled
          horizontal
          futureScrollRange={0}
          markedDates={dateObj}
          theme={{
            // @ts-ignore
            "stylesheet.calendar.header": {
              monthText: {
                margin: 31,
                fontFamily: "NotoSansKR-Medium",
                fontSize: 18,
                color: palette.blue_7b,
                includeFontPadding: false,
              },
              dayHeader: {
                fontFamily: "NotoSansKR-Regular",
                fontSize: 12,
                color: "rgba(0, 0, 0, 0.8)",
                includeFontPadding: false,
              },
            },
            "stylesheet.day.basic": {
              base: {
                width: 32,
                height: 32,
                alignItems: "center",
              },
              text: {
                marginTop: isAndroid ? 4 : 6,
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
          style={StyleSheet.absoluteFill}
          isVisible={isNoWalkRecordVisible}>
          <NoWalkRecord pointerEvents="none">
            <MyText
              color="rgba(0, 0, 0, 0.5)"
              fontWeight="light"
              fontSize={18}
              style={{ textAlign: "center", marginBottom: 249 }}>
              산책 기록이 없습니다.{"\n"}첫 산책을 시작해보세요!
            </MyText>
          </NoWalkRecord>
        </Dissolve>
        <Dissolve
          style={{ position: "absolute", alignSelf: "center", bottom: 84 }}
          isVisible={isNoWalkRecordVisible}>
          <Button onPress={onStartWalking} style={{ width: 126 }}>
            산책 시작
          </Button>
        </Dissolve>
        {data && data.day_count.length !== 0 ? (
          <RowContainer>
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
