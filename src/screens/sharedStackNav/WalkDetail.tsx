import React from "react";
import { FlatList, Text, View } from "react-native";
import styled from "styled-components/native";
import MyText from "~/components/common/MyText";
import { useAppSelector } from "~/store";
import { rpWidth } from "~/styles";
import { WalkDetailScreenProps } from "~/types/navigator";
import CalendarStrip from "react-native-calendar-strip";
import palette from "~/styles/palette";

const TopContainer = styled.View`
  align-items: center;
  border-bottom-width: ${rpWidth(4)}px;
  border-bottom-color: rgba(0, 0, 0, 0.03);
`;

const Image = styled.Image`
  width: ${rpWidth(70)}px;
  height: ${rpWidth(70)}px;
  border-radius: ${rpWidth(35)}px;
  margin-top: ${rpWidth(25)}px;
  margin-bottom: ${rpWidth(15)}px;
`;

const locale = {
  months: "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
  monthsShort: "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
  weekdays: "일요일_월요일_화요일_수요일_목요일_금요일_토요일".split("_"),
  weekdaysShort: "일_월_화_수_목_금_토".split("_"),
  weekdaysMin: "일_월_화_수_목_금_토".split("_"),
  longDateFormat: {
    LT: "A h:mm",
    LTS: "A h:mm:ss",
    L: "YYYY.MM.DD.",
    LL: "YYYY년 MMMM D일",
    LLL: "YYYY년 MMMM D일 A h:mm",
    LLLL: "YYYY년 MMMM D일 dddd A h:mm",
    l: "YYYY.MM.DD.",
    ll: "YYYY년 MMMM D일",
    lll: "YYYY년 MMMM D일 A h:mm",
    llll: "YYYY년 MMMM D일 dddd A h:mm",
  },
  calendar: {
    sameDay: "오늘 LT",
    nextDay: "내일 LT",
    nextWeek: "dddd LT",
    lastDay: "어제 LT",
    lastWeek: "지난주 dddd LT",
    sameElse: "L",
  },
  relativeTime: {
    future: "%s 후",
    past: "%s 전",
    s: "몇 초",
    ss: "%d초",
    m: "1분",
    mm: "%d분",
    h: "한 시간",
    hh: "%d시간",
    d: "하루",
    dd: "%d일",
    M: "한 달",
    MM: "%d달",
    y: "일 년",
    yy: "%d년",
  },
  dayOfMonthOrdinalParse: /\d{1,2}(일|월|주)/,
  ordinal: function (number, period) {
    switch (period) {
      case "d":
      case "D":
      case "DDD":
        return number + "일";
      case "M":
        return number + "월";
      case "w":
      case "W":
        return number + "주";
      default:
        return number;
    }
  },
  meridiemParse: /오전|오후/,
  isPM: function (token) {
    return token === "오후";
  },
  meridiem: function (hour, minute, isUpper) {
    return hour < 12 ? "오전" : "오후";
  },
};

const WalkDetail = ({ navigation, route }: WalkDetailScreenProps) => {
  const devices = useAppSelector(state => state.device);
  const data = devices.find(device => device.id === route.params.id);

  console.log(data);

  return (
    <>
      <TopContainer>
        <Image source={require("~/assets/image/test.jpg")} />
        <MyText style={{ marginBottom: rpWidth(19) }} fontWeight="medium">
          {data?.name}
        </MyText>
      </TopContainer>
      {/* <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <CalendarStrip
            scrollerPaging
            locale={{
              name: "ko",
              config: locale,
            }}
            iconStyle={{
              display: "none",
            }}
            calendarHeaderStyle={{ display: "none" }}
            scrollable
            dateNameStyle={{
              fontFamily: "NotoSansKR-Regular",
              includeFontPadding: false,
              fontSize: rpWidth(12),
              color: "black",
            }}
            dateNumberStyle={{
              fontWeight: "400",
              fontFamily: "NotoSansKR-Medium",
              includeFontPadding: false,
              fontSize: rpWidth(16),
              color: "black",
            }}
            highlightDateNameStyle={{
              fontFamily: "NotoSansKR-Regular",
              includeFontPadding: false,
              fontSize: rpWidth(12),
              color: "white",
            }}
            highlightDateNumberStyle={{
              fontWeight: "400",
              fontFamily: "NotoSansKR-Medium",
              includeFontPadding: false,
              fontSize: rpWidth(16),
              color: "white",
            }}
            style={{
              height: rpWidth(54),
            }}
            daySelectionAnimation={{
              type: "background",
              duration: 200,
              highlightColor: palette.blue_7b,
            }}
          />
        )}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        renderItem={({ item }) => (
          <View style={{ height: 100, borderBottomWidth: 1 }}>
            <Text>{item}</Text>
          </View>
        )}
      /> */}
    </>
  );
};

export default WalkDetail;
