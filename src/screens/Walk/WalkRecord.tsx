import { format } from "date-fns";
import React, { useState, useMemo, useEffect } from "react";
import { ScrollView, View, Text } from "react-native";
import { MultiDotMarking } from "react-native-calendars";
import { api } from "~/api";
import Calendar from "~/components/common/Calendar";
import useFocusEvent from "~/hooks/useFocusEvent";
import { useAppSelector } from "~/store";
import palette from "~/styles/palette";

const WalkRecord = () => {
  const { currentTabName } = useAppSelector(state => state.common);
  useFocusEvent({ isTab: true });

  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const MarkingDots = useMemo(() => {
    if (currentTabName !== "WalkRecord" || !data) return;
    let obj: {
      [date: string]: MultiDotMarking;
    } = {};
    const dateArr = data.walk_id_list.map(data => ({
      id: data.id,
      date: format(new Date(data.start_date_time), "yyyy-MM-dd"),
    }));
    dateArr.forEach(data => {
      if (obj[data.date]) {
        obj[data.date].dots.push({
          key: String(data.id),
          color: palette.blue_6e,
          selectedDotColor: "transparent",
        });
      } else {
        obj[data.date] = {
          dots: [
            {
              key: String(data.id),
              color: palette.blue_6e,
              selectedDotColor: "transparent",
            },
          ],
        };
      }
    });
    return obj;
  }, [currentTabName, data]);

  const fetchWalkRecord = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/walk/?pet_id=2");
      console.log(data);
      setData(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentTabName !== "WalkRecord") return;
    /* fetchWalkRecord(); */
  }, [currentTabName]);

  return (
    <ScrollView>
      <Calendar
        onDayPress={day => {
          if (selected && day.dateString === selected) {
            setSelected("");
          } else {
            setSelected(day.dateString);
          }
        }}
        markedDates={{
          ...MarkingDots,
          [selected]: {
            dots: [],
            selected: true,
            selectedColor: palette.blue_6e,
          },
        }}
        markingType="multi-dot"
      />
      <View>
        <Text>하하</Text>
        {data && (
          <Text style={{ fontSize: 30 }}>{data.summary.total_time}</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default WalkRecord;
