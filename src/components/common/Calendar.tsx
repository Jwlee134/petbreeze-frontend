import React from "react";
import {
  Calendar as RNCalendar,
  CalendarProps,
  LocaleConfig,
} from "react-native-calendars";
import { days, months } from "~/staticData";
import palette from "~/styles/palette";

LocaleConfig.locales["ko"] = {
  monthNames: months,
  monthNamesShort: months,
  dayNames: days,
  dayNamesShort: days,
  today: "오늘",
};
LocaleConfig.defaultLocale = "ko";

const Calendar = ({ ...props }: CalendarProps) => (
  <RNCalendar
    {...props}
    theme={{
      arrowColor: palette.blue_6e,
      todayTextColor: palette.blue_6e,
      dotColor: palette.blue_6e,
      selectedDotColor: "white",
    }}
  />
);

export default Calendar;
