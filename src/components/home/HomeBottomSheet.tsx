import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAppSelector } from "~/store";
import { commonActions } from "~/store/common";
import BottomSheetComponent from "@gorhom/bottom-sheet";
import BottomSheet from "~/components/common/BottomSheet";
import { useDispatch } from "react-redux";
import { homeBottomSheetHeight } from "~/styles/constants";
import ArrowLeft from "~/assets/svg/arrow/arrow-left.svg";
import ArrowRight from "~/assets/svg/arrow/arrow-right.svg";
import styled from "styled-components/native";
import MyText from "../common/MyText";
import { Slider } from "@miblanchard/react-native-slider";
import LoadingIndicator from "../lottie/LoadingIndicator";
import { getAddressByCoord } from "~/api/place";

const coords = {
  "2021-12-24": [
    [37.479255, 126.952387],
    [37.479183, 126.953086],
    [37.479119, 126.953617],
    [37.478747, 126.954921],
    [37.478581, 126.955559],
    [37.479594, 126.955379],
    [37.480128, 126.955414],
    [37.479983, 126.955832],
  ],
  "2021-12-23": [
    [37.479594, 126.955379],
    [37.479983, 126.955832],
    [37.479119, 126.953617],
    [37.478747, 126.954921],
    [37.479255, 126.952387],
    [37.478581, 126.955559],
    [37.479183, 126.953086],
    [37.480128, 126.955414],
  ],
  "2021-12-22": [
    [37.478581, 126.955559],
    [37.479983, 126.955832],
    [37.479119, 126.953617],
    [37.479594, 126.955379],
    [37.478747, 126.954921],
    [37.480128, 126.955414],
    [37.479255, 126.952387],
    [37.479183, 126.953086],
  ],
};

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
  const [data, setData] = useState(null);
  const [dateIndex, setDateIndex] = useState(0);
  const [pathIndex, setPathIndex] = useState(0);

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

  const currentPath = useMemo(
    () => (data ? data[Object.keys(data)[dateIndex]] : []),
    [data, dateIndex],
  );

  useEffect(() => {
    if (!currentPath.length || !path.length) return;
    dispatch(
      commonActions.setHome({
        deviceCoord: {
          latitude: currentPath[pathIndex][0],
          longitude: currentPath[pathIndex][1],
          time: new Date().toISOString(),
        },
        isDeviceMoved: false,
      }),
    );
  }, [pathIndex, currentPath]);

  useEffect(() => {
    if (!currentPath.length) return;
    setPathIndex(currentPath.length - 1);
    dispatch(
      commonActions.setHome({
        path: currentPath,
        showMarker: true,
        isDeviceMoved: false,
      }),
    );
  }, [currentPath]);

  useEffect(() => {
    if (showPath) {
      sheetRef.current?.snapToIndex(0);
      setTimeout(() => {
        setData(coords);
      }, 1000);
    } else {
      sheetRef.current?.close();
      setData(null);
      setDateIndex(0);
      setPathIndex(0);
      dispatch(commonActions.setHome(null));
    }
  }, [showPath]);

  const onLeftPress = () => setDateIndex(prev => prev + 1);
  const onRightPress = () => setDateIndex(prev => prev - 1);

  return (
    <BottomSheet
      handleHeight={24}
      ref={sheetRef}
      index={-1}
      enablePanDownToClose
      onClose={() => dispatch(commonActions.setHome({ showPath: false }))}
      snapPoints={[homeBottomSheetHeight]}>
      {!data ? (
        <Loader>
          <LoadingIndicator size={60} />
        </Loader>
      ) : (
        <>
          <DateContainer>
            {dateIndex !== Object.keys(data).length - 1 ? (
              <ArrowButton onPress={onLeftPress}>
                <ArrowLeft />
              </ArrowButton>
            ) : (
              <ArrowButton />
            )}
            <MyText fontWeight="medium" fontSize={18}>
              {Object.keys(data)[dateIndex]}
            </MyText>
            {dateIndex !== 0 ? (
              <ArrowButton onPress={onRightPress}>
                <ArrowRight />
              </ArrowButton>
            ) : (
              <ArrowButton />
            )}
          </DateContainer>
          <SliderContainer>
            <Slider
              renderThumbComponent={() => (
                <Thumb source={require("~/assets/image/circle.png")} />
              )}
              minimumTrackTintColor="#ededed"
              maximumTrackTintColor="#ededed"
              trackStyle={{ height: 7 }}
              containerStyle={{ height: 22 }}
              minimumValue={0}
              maximumValue={currentPath.length - 1}
              value={pathIndex}
              step={1}
              onValueChange={value => {
                if (pathIndex !== value[0]) {
                  setPathIndex(value[0]);
                }
              }}
            />
          </SliderContainer>
        </>
      )}
    </BottomSheet>
  );
};

export default HomeBottomSheet;
