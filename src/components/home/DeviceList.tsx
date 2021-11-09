import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAppSelector } from "~/store";
import { Animated } from "react-native";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import HomeAvatar from "./HomeAvatar";
import Modal from "react-native-modal";
import useModal from "~/hooks/useModal";
import IosStyleBottomModal from "../modal/IosStyleBottomModal";
import HomeBottomModal from "../modal/HomeBottomModal";
import styled from "styled-components/native";
import MyText from "../common/MyText";
import palette from "~/styles/palette";
import useDevice from "~/hooks/useDevice";
import { noName } from "~/constants";
import { useDispatch } from "react-redux";
import deviceApi from "~/api/device";
import { useIsFocused } from "@react-navigation/native";
import { commonActions } from "~/store/common";
import useAppState from "~/hooks/useAppState";
import { storageActions } from "~/store/storage";

const Address = styled(Animated.View)<{ rpWidth: RpWidth }>`
  height: ${({ rpWidth }) => rpWidth(41)}px;
  background-color: ${palette.blue_7b_80};
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  justify-content: center;
  align-items: center;
`;

const DeviceList = () => {
  const deviceList = useDevice();
  const { latitude, longitude } = useAppSelector(
    state => state.common.home.deviceCoord,
  );
  const pressedID = useAppSelector(state => state.common.home.pressedID);
  const address = useAppSelector(state => state.common.home.address);
  const value = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const [getDeviceCoord, { data: coord, isFetching: isCoordFetching }] =
    deviceApi.useLazyGetDeviceCoordQuery();
  const [
    getDeviceSetting,
    { data: deviceSetting, isFetching: isDeviceSettingFetching, originalArgs },
  ] = deviceApi.useLazyGetDeviceSettingQuery();
  const timeout = useRef<NodeJS.Timeout>();
  const isFocused = useIsFocused();
  const appState = useAppState();

  const [interval, setInterval] = useState(0);
  const [longPressedID, setLongPressedID] = useState(0);

  const { rpWidth, width, isTablet } = useContext(DimensionsContext);

  const { open, close, modalProps } = useModal();

  const device = useMemo(
    () =>
      deviceList?.length
        ? deviceList[
            deviceList.findIndex(device => device.id === longPressedID)
          ]
        : null,
    [longPressedID, deviceList],
  );

  // 이미 캐시된 데이터 있는 상태에서 한번 더 클릭하여 같은 데이터 들어오면 effect 실행 안되는 현상이
  // 가 디바이스가 여러개일 경우 문제가 생기므로 isFetching 인자 추가하여 같은 데이터라도 매번 실행

  useEffect(() => {
    if (isDeviceSettingFetching || !originalArgs) return;
    if (deviceSetting) {
      const period =
        deviceSetting.Period === 0 ? 1000 : deviceSetting.Period * 60000;
      if (period !== interval || pressedID !== originalArgs) {
        setInterval(period);
        dispatch(commonActions.setHome({ pressedID: originalArgs }));
        getDeviceCoord(originalArgs);
      } else {
        dispatch(
          commonActions.setHome({ deviceCoord: { latitude, longitude } }),
        );
      }
    }
  }, [deviceSetting, isDeviceSettingFetching]);

  useEffect(() => {
    if (isCoordFetching || !interval) return;
    if (coord?.coordinate?.coordinates) {
      const latitude = coord.coordinate.coordinates[1];
      const longitude = coord.coordinate.coordinates[0];

      dispatch(commonActions.setHome({ deviceCoord: { latitude, longitude } }));
      dispatch(storageActions.setLastCoord({ latitude, longitude }));

      timeout.current = setTimeout(() => {
        getDeviceCoord(pressedID);
      }, interval);
    } else {
      dispatch(
        commonActions.setHome({
          isDeviceMoved: true,
          deviceCoord: { latitude: 0, longitude: 0 },
        }),
      );
    }

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [coord, isCoordFetching, interval]);

  const onAvatarPress = useCallback((id: number) => {
    dispatch(commonActions.setHome({ isDeviceMoved: false }));
    getDeviceSetting(id);
  }, []);

  const onAvatarLongPress = useCallback((id: number) => {
    setLongPressedID(id);
    open();
  }, []);

  useEffect(() => {
    if ((!isFocused || appState === "background") && timeout.current) {
      clearTimeout(timeout.current);
    }
  }, [isFocused, appState]);

  const translateYAvatar = value.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -rpWidth(41)],
  });

  const translateY = value.interpolate({
    inputRange: [0, 1],
    outputRange: [rpWidth(41), 0],
  });

  useEffect(() => {
    Animated.timing(value, {
      toValue: address ? 1 : 0,
      useNativeDriver: true,
      duration: 200,
    }).start();
  }, [address]);

  if (!deviceList || !deviceList.length) return null;

  return (
    <>
      {deviceList.length < 4 ? (
        deviceList.map((device, i) => (
          <HomeAvatar
            key={device.id}
            device={device}
            index={i}
            length={deviceList.length}
            onAvatarPress={onAvatarPress}
            onAvatarLongPress={onAvatarLongPress}
            style={{
              transform: [{ translateY: translateYAvatar }],
            }}
          />
        ))
      ) : (
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            position: "absolute",
            bottom: 0,
            marginBottom: rpWidth(30),
            height: rpWidth(95),
            transform: [{ translateY: translateYAvatar }],
          }}
          contentContainerStyle={{
            minWidth: isTablet ? 0 : width,
            ...(isTablet &&
              deviceList.length < 6 && {
                paddingLeft: rpWidth(10),
              }),
            paddingHorizontal: !isTablet
              ? width * 0.15
              : deviceList.length > 5
              ? width * 0.09
              : 0,
            alignItems: "center",
          }}>
          {deviceList.map((device, i) => (
            <HomeAvatar
              key={device.id}
              device={device}
              index={i}
              length={deviceList.length}
              onAvatarPress={onAvatarPress}
              onAvatarLongPress={onAvatarLongPress}
            />
          ))}
        </Animated.ScrollView>
      )}
      <Modal {...modalProps({ type: "bottom" })}>
        {device ? (
          <IosStyleBottomModal title={device.name || noName} close={close}>
            <HomeBottomModal close={close} device={device} />
          </IosStyleBottomModal>
        ) : (
          <></>
        )}
      </Modal>
      <Address rpWidth={rpWidth} style={{ transform: [{ translateY }] }}>
        <MyText fontWeight="medium" fontSize={14} color="white">
          {address}
        </MyText>
      </Address>
    </>
  );
};

export default DeviceList;
