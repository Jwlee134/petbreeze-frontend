import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "~/store";
import { commonActions } from "~/store/common";
import BottomSheetComponent from "@gorhom/bottom-sheet";
import BottomSheet from "~/components/common/BottomSheet";
import { useDispatch } from "react-redux";
import {
  homeBottomSheetHeight,
  textLoadingIndicatorSize,
} from "~/styles/constants";
import ArrowLeft from "~/assets/svg/arrow/arrow-left.svg";
import ArrowRight from "~/assets/svg/arrow/arrow-right.svg";
import styled from "styled-components/native";
import MyText from "../common/MyText";
import { Slider } from "@miblanchard/react-native-slider";
import LoadingIndicator from "../lottie/LoadingIndicator";
import { getAddressByCoord } from "~/api/place";
import { formatYYYYMMDD } from "~/utils";
import { testApi } from "~/api";

const DateContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 24px;
  align-items: center;
`;

const ArrowButton = styled.TouchableOpacity`
  width: 32px;
  height: 44px;
  justify-content: center;
  align-items: center;
`;

const SliderContainer = styled.View`
  padding: 0px 45px;
  margin-top: 28px;
`;

const Thumb = styled.Image`
  width: 22px;
  height: 22px;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const HomeBottomSheet = () => {
  const path = useAppSelector(state => state.common.home.path);
  const deviceCoord = useAppSelector(state => state.common.home.deviceCoord);
  const showPath = useAppSelector(state => state.common.home.showPath);
  const dispatch = useDispatch();
  const sheetRef = useRef<BottomSheetComponent>(null);
  const date = useAppSelector(state => state.common.home.date);
  const [pathIndex, setPathIndex] = useState(0);
  const { data, isFetching, refetch } = testApi.useGetPathQuery(
    formatYYYYMMDD(date),
    {
      skip: !date,
    },
  );

  useEffect(() => {
    if (!showPath) return;
    const timeout = setTimeout(async () => {
      const address = await getAddressByCoord(
        deviceCoord.latitude,
        deviceCoord.longitude,
      );
      dispatch(commonActions.setHome({ address, isLoading: false }));
    }, 200);
    return () => {
      clearTimeout(timeout);
    };
  }, [deviceCoord]);

  useEffect(() => {
    if (!path.length) return;
    const [longitude, latitude, time] = path[pathIndex];
    dispatch(
      commonActions.setHome({
        deviceCoord: { latitude, longitude, time },
        isDeviceMoved: false,
        showMarker: true,
        showInfoHeader: true,
      }),
    );
  }, [pathIndex, path]);

  useEffect(() => {
    if (!showPath || !data) return;
    setPathIndex(data.length ? data.length - 1 : 0);
    dispatch(
      commonActions.setHome({
        ...(data.length
          ? {
              path: data,
            }
          : {
              path: [],
              deviceCoord: { latitude: 0, longitude: 0, time: "" },
              showMarker: false,
              showInfoHeader: false,
              address: "",
            }),
      }),
    );
  }, [showPath, data]);

  useEffect(() => {
    if (showPath) {
      if (data?.length) refetch();
      sheetRef.current?.snapToIndex(0);
    } else {
      sheetRef.current?.close();
      setPathIndex(0);
      dispatch(commonActions.setHome(null));
    }
  }, [showPath]);

  const addDay = (date: string, day: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + day);
    return result.toISOString();
  };

  const onLeftPress = () =>
    dispatch(
      commonActions.setHome({ date: addDay(date, -1), isLoading: true }),
    );
  const onRightPress = () =>
    dispatch(commonActions.setHome({ date: addDay(date, 1), isLoading: true }));
  const [, , currentDay] = formatYYYYMMDD(date).split("-");

  return (
    <BottomSheet
      handleHeight={24}
      ref={sheetRef}
      index={-1}
      enablePanDownToClose
      onChange={index => {
        if (index === -1 && showPath)
          dispatch(commonActions.setHome({ showPath: false }));
      }}
      snapPoints={[homeBottomSheetHeight]}>
      {!data ? (
        <Loader>
          <LoadingIndicator size={60} />
        </Loader>
      ) : (
        <>
          <DateContainer>
            {new Date().getDate() - Number(currentDay) < 7 && !isFetching ? (
              <ArrowButton onPress={onLeftPress}>
                <ArrowLeft />
              </ArrowButton>
            ) : (
              <ArrowButton />
            )}
            <MyText fontWeight="medium" fontSize={18}>
              {formatYYYYMMDD(date)}
            </MyText>
            {new Date().getDate() !== Number(currentDay) && !isFetching ? (
              <ArrowButton onPress={onRightPress}>
                <ArrowRight />
              </ArrowButton>
            ) : (
              <ArrowButton />
            )}
          </DateContainer>
          <SliderContainer>
            {!isFetching ? (
              data.length ? (
                <Slider
                  renderThumbComponent={() => (
                    <Thumb source={require("~/assets/image/circle.png")} />
                  )}
                  minimumTrackTintColor="#ededed"
                  maximumTrackTintColor="#ededed"
                  trackStyle={{ height: 7 }}
                  containerStyle={{ height: 22 }}
                  minimumValue={0}
                  maximumValue={data.length - 1}
                  value={pathIndex}
                  step={1}
                  onValueChange={value => {
                    if (pathIndex !== value[0]) {
                      setPathIndex(value[0]);
                    }
                  }}
                />
              ) : (
                <MyText
                  fontWeight="light"
                  style={{ textAlign: "center" }}
                  color="rgba(0, 0, 0, 0.5)">
                  표시할 경로가 없습니다.
                </MyText>
              )
            ) : (
              <MyText style={{ textAlign: "center" }}>
                {" "}
                <LoadingIndicator size={textLoadingIndicatorSize} />{" "}
              </MyText>
            )}
          </SliderContainer>
        </>
      )}
    </BottomSheet>
  );
};

export default HomeBottomSheet;
