import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { store, useAppSelector } from "~/store";
import { Animated } from "react-native";
import { DimensionsContext } from "~/context/DimensionsContext";
import HomeAvatar from "./HomeAvatar";
import Modal from "react-native-modal";
import useModal from "~/hooks/useModal";
import IosBottomModal from "../modal/IosBottomModal";
import HomeBottomModal from "../modal/HomeBottomModal";
import useDevice from "~/hooks/useDevice";
import { useDispatch } from "react-redux";
import deviceApi from "~/api/device";
import { useIsFocused } from "@react-navigation/native";
import { commonActions } from "~/store/common";
import useAppState from "~/hooks/useAppState";
import { getDistanceBetween2Points } from "~/utils";
import { getAddressByCoord } from "~/api/place";

const DeviceList = () => {
  const deviceList = useDevice();
  const isPressed = useAppSelector(state => state.common.home.isPressed);
  const pressedID = useAppSelector(state => state.common.home.pressedID);
  const showDeviceLocation = useAppSelector(
    state => state.common.home.showDeviceLocation,
  );
  const areaRadius = useAppSelector(state => state.common.home.areaRadius);
  const value = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const [
    getDeviceCoord,
    { data: coord, isFetching: isCoordFetching, isLoading: loading1 },
  ] = deviceApi.useLazyGetDeviceCoordQuery();
  const [
    getDeviceSetting,
    {
      data: deviceSetting,
      isFetching: isDeviceSettingFetching,
      originalArgs,
      isLoading: loading2,
    },
  ] = deviceApi.useLazyGetDeviceSettingQuery();
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const isFocused = useIsFocused();
  const appState = useAppState();
  const [interval, setInterval] = useState(0);
  const [longPressedID, setLongPressedID] = useState(0);
  const { width, isTablet } = useContext(DimensionsContext);
  const { open, close, modalProps } = useModal();
  const isLoading = loading1 || loading2;

  const device = useMemo(
    () =>
      deviceList?.length
        ? deviceList[
            deviceList.findIndex(device => device.id === longPressedID)
          ]
        : null,
    [longPressedID, deviceList],
  );

  const clearTimer = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }
  };

  // 이미 캐시된 데이터 있는 상태에서 한번 더 클릭하여 같은 데이터 들어오면 effect 실행 안되는 문제로
  // isFetching 인자 추가하여 같은 데이터라도 매번 실행

  useEffect(() => {
    if (
      isDeviceSettingFetching ||
      !originalArgs ||
      !isPressed ||
      !deviceSetting
    ) {
      return;
    }
    const period =
      deviceSetting.Period === 1 ? 3000 : deviceSetting.Period * 1000;
    dispatch(
      commonActions.setHome({
        pressedID: originalArgs,
        isDeviceMoved: false,
        deviceCoord: { latitude: 0, longitude: 0, time: "" },
      }),
    );
    setInterval(period);
    getDeviceCoord(originalArgs);
  }, [deviceSetting, isDeviceSettingFetching]);

  const fetchAddressAndShowLocation = (latitude: number, longitude: number) => {
    getAddressByCoord(latitude, longitude)
      .then(addr => {
        dispatch(
          commonActions.setHome({
            address: addr || "주소 없음",
            showDeviceLocation: true,
            ...(areaRadius && { areaRadius: 0 }),
          }),
        );
      })
      .catch(() => {
        dispatch(
          commonActions.setHome({
            address: "주소 없음",
            showDeviceLocation: true,
            ...(areaRadius && { areaRadius: 0 }),
          }),
        );
      });
  };

  const display = (latitude: number, longitude: number, time: string) => {
    if (!deviceSetting) return;
    const areas = deviceSetting.Area.filter(area => area.name !== null);
    if (areas.length) {
      // 안심존이 있을 때
      const currentAreaIndex = areas.findIndex(area => {
        const areaCoord = area.coordinate.coordinates;
        return (
          getDistanceBetween2Points(
            latitude,
            longitude,
            areaCoord[1],
            areaCoord[0],
          ) < area.radius
        );
      });
      if (currentAreaIndex === -1) {
        // 현재 위치가 안심존 밖
        fetchAddressAndShowLocation(latitude, longitude);
      } else {
        // 현재 위치가 안심존 내
        const currentArea = areas[currentAreaIndex];
        const coord = currentArea.coordinate.coordinates;
        dispatch(
          commonActions.setHome({
            address: currentArea.name as string,
            areaRadius: 50,
            deviceCoord: {
              latitude: coord[1],
              longitude: coord[0],
              time,
            },
            showDeviceLocation: true,
          }),
        );
      }
    } else {
      // 안심존이 없을 때
      fetchAddressAndShowLocation(latitude, longitude);
    }
  };

  useEffect(() => {
    if (isCoordFetching || !interval) return;
    if (coord?.coordinate?.coordinates) {
      const latitude = coord.coordinate.coordinates[1];
      const longitude = coord.coordinate.coordinates[0];
      const time = coord.date_time;
      if (!latitude && !longitude) {
        return;
      }
      const prevCoord = store.getState().common.home.deviceCoord;
      if (
        prevCoord.latitude !== latitude &&
        prevCoord.longitude !== longitude
      ) {
        dispatch(
          commonActions.setHome({
            deviceCoord: { latitude, longitude, time: coord.date_time },
          }),
        );
        display(latitude, longitude, time);
      }
      timeout.current = setTimeout(() => {
        getDeviceCoord(pressedID);
      }, interval);
    }
    return () => {
      clearTimer();
    };
  }, [coord, isCoordFetching]);

  const onAvatarPress = useCallback(
    (id: number) => {
      if (isLoading) return;
      dispatch(commonActions.setHome({ isPressed: true }));
      getDeviceSetting(id);
    },
    [deviceList, isLoading],
  );

  const onAvatarLongPress = useCallback(
    (id: number) => {
      setLongPressedID(id);
      open();
    },
    [deviceList],
  );

  useEffect(() => {
    if (!showDeviceLocation) {
      clearTimer();
    }
  }, [showDeviceLocation]);

  useEffect(() => {
    if (!isFocused || appState === "background") {
      clearTimer();
    }
  }, [isFocused, appState, timeout.current]);

  const translateYAvatar = value.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  useEffect(() => {
    Animated.timing(value, {
      toValue: showDeviceLocation ? 1 : 0,
      useNativeDriver: true,
      duration: 200,
    }).start();
  }, [showDeviceLocation]);

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
            style={{ transform: [{ translateY: translateYAvatar }] }}
          />
        ))
      ) : (
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            position: "absolute",
            bottom: 0,
            marginBottom: 30,
            height: 95,
            transform: [{ translateY: translateYAvatar }],
          }}
          contentContainerStyle={{
            minWidth: isTablet ? 0 : width,
            ...(isTablet &&
              deviceList.length < 6 && {
                paddingLeft: 10,
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
          <IosBottomModal close={close}>
            <HomeBottomModal close={close} device={device} />
          </IosBottomModal>
        ) : (
          <></>
        )}
      </Modal>
    </>
  );
};

export default DeviceList;
