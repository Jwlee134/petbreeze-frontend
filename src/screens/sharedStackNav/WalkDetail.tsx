import React, { useContext, useMemo } from "react";
import styled, { css } from "styled-components/native";
import MyText from "~/components/common/MyText";
import { useAppSelector } from "~/store";
import { WalkDetailScreenProps } from "~/types/navigator";
import palette from "~/styles/palette";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import Divider from "~/components/common/Divider";
import { CalendarList, LocaleConfig } from "react-native-calendars";
import { days, months } from "~/staticData";
import { isAndroid } from "~/utils";

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

LocaleConfig.locales["ko"] = {
  monthNames: months,
  monthNamesShort: months,
  dayNames: days,
  dayNamesShort: days,
  today: "오늘",
};
LocaleConfig.defaultLocale = "ko";

const WalkDetail = ({ navigation, route }: WalkDetailScreenProps) => {
  const devices = useAppSelector(state => state.device);
  const data = devices.find(device => device.id === 1);
  const { rpWidth, isTablet } = useContext(DimensionsContext);

  /*   const MarkingDots = useMemo(() => {
    const obj: {
      [date: string]: { dots: { key: string; color: string }[] };
    } = {};
    const dateArr = data.walk_id_list.map(data => {
      const date = new Date(data.start_date_time);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return {
        id: data.id,
        date: `${year}-${month}-${day}`,
      };
    });
    dateArr.forEach(data => {
      if (obj[data.date]) {
        obj[data.date].dots.push({
          key: data.id,
          color: palette.blue_7b,
        });
      } else {
        obj[data.date] = {
          dots: [
            {
              key: data.id,
              color: palette.blue_7b,
            },
          ],
        };
      }
    });
    return obj;
  }, [data]); */

  return (
    <>
      <TopContainer>
        <Image rpWidth={rpWidth} source={require("~/assets/image/test.jpg")} />
        <MyText style={{ marginBottom: rpWidth(19) }} fontWeight="medium">
          하하하
        </MyText>
      </TopContainer>
      <Divider isHairline={false} />
      <CalendarList
        monthFormat="M월"
        pagingEnabled
        horizontal
        futureScrollRange={0}
        markedDates={{
          "2021-10-05": {
            dots: [
              { key: "1", color: palette.blue_7b },
              { key: "2", color: palette.blue_7b },
            ],
          },
          "2021-10-06": { dots: [{ key: "1", color: palette.blue_7b }] },
        }}
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
    </>
  );
};

export default WalkDetail;
