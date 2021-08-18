import { format } from "date-fns";
import React, { useState, useMemo, useEffect } from "react";
import { ScrollView } from "react-native";
import { MultiDotMarking } from "react-native-calendars";
import deviceApi from "~/api/device";
import walkApi from "~/api/walk";
import Calendar from "~/components/common/Calendar";
import Device from "~/components/walk/Device";
import { useAppSelector } from "~/store";
import { rpHeight, rpWidth } from "~/styles";
import palette from "~/styles/palette";
import { WalkRecordScreenNavigationProp } from "~/types/navigator";

const WalkRecord = ({
  navigation,
}: {
  navigation: WalkRecordScreenNavigationProp;
}) => {
  const devices = useAppSelector(state => state.device);
  /* const { data: devices } = deviceApi.useGetDeviceListQuery();
  const [getWalkRecord] = walkApi.useLazyGetWalkDetailQuery(); */

  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [loading, setLoading] = useState(false);

  /*   const MarkingDots = useMemo(() => {
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
  }, [currentTabName, data]); */

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: rpWidth(16),
        paddingTop: rpHeight(31),
      }}
      showsVerticalScrollIndicator={false}>
      {devices.map(item => (
        <Device
          key={item.id}
          data={item}
          onPress={() => {}}
          isStartWalking={false}
        />
      ))}
      {/* <Calendar
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
      /> */}
    </ScrollView>
  );
};

export default WalkRecord;
