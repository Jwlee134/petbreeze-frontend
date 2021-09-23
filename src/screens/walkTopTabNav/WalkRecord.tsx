import React, { useState, useMemo, useEffect, useContext } from "react";
import { ScrollView, View } from "react-native";
import deviceApi from "~/api/device";
import walkApi from "~/api/walk";
import Calendar from "~/components/common/Calendar";
import DeviceAvatarCircle from "~/components/common/DeviceAvatarCircle";
import ListItem from "~/components/common/ListItem";
import MyText from "~/components/common/MyText";
import { useAppSelector } from "~/store";
import palette from "~/styles/palette";
import { WalkRecordScreenNavigationProp } from "~/types/navigator";
import styled from "styled-components/native";
import { DimensionsContext } from "~/context/DimensionsContext";

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const WalkRecord = ({
  navigation,
}: {
  navigation: WalkRecordScreenNavigationProp;
}) => {
  const { rpWidth, rpHeight } = useContext(DimensionsContext);
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
        paddingTop: rpHeight(31),
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={false}>
      {devices.map(item => (
        <ListItem
          key={item.id}
          onPress={() =>
            navigation.navigate("WalkDetail", {
              id: item.id,
            })
          }>
          <RowContainer>
            <DeviceAvatarCircle
              isBackgroundTransparent
              lineWidth={2}
              circleWidth={70}
              battery={item.battery}
            />
            <View
              style={{
                marginLeft: rpWidth(26),
              }}>
              <RowContainer>
                <MyText fontWeight="medium">{item.name}</MyText>
                <MyText
                  fontSize={12}
                  color={palette.blue_7b}
                  style={{ marginLeft: rpWidth(12) }}>
                  {item.battery}%
                </MyText>
              </RowContainer>
              <MyText
                style={{ marginTop: rpWidth(5) }}
                fontSize={12}
                color="rgba(0, 0, 0, 0.5)">
                마지막 산책
              </MyText>
            </View>
          </RowContainer>
        </ListItem>
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
