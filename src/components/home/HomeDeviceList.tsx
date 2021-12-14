import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import HomeAvatar from "./HomeAvatar";
import Modal from "react-native-modal";
import useModal, { ModalPosition } from "~/hooks/useModal";
import IosBottomModal from "../modal/IosBottomModal";
import HomeBottomModal from "../modal/HomeBottomModal";
import useDevice from "~/hooks/useDevice";
import { useDispatch } from "react-redux";
import deviceApi, { AreaResponse } from "~/api/device";
import { useIsFocused } from "@react-navigation/native";
import { commonActions } from "~/store/common";
import useAppState from "~/hooks/useAppState";
import { getDistanceBetween2Points } from "~/utils";
import { getAddressByCoord } from "~/api/place";
import styled from "styled-components/native";
import Toast from "react-native-toast-message";
import { ToastType } from "~/styles/toast";
import { store, useAppSelector } from "~/store";

const ScrollView = styled.ScrollView`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  margin-bottom: 30px;
  height: 95px;
`;

const HomeDeviceList = () => {
  const deviceList = useDevice();
  const dispatch = useDispatch();
  const [getDeviceCoord] = deviceApi.useLazyGetDeviceCoordQuery();
  const [getDeviceSetting] = deviceApi.useLazyGetDeviceSettingQuery();
  const interval = useRef<NodeJS.Timer | null>(null);
  const isFocused = useIsFocused();
  const appState = useAppState();
  const [longPressedID, setLongPressedID] = useState(0);
  const { open, close, modalProps } = useModal();
  const isLoading = useAppSelector(state => state.common.home.isLoading);
  const isMapClicked = useAppSelector(state => state.common.home.isMapClicked);

  const clearTimer = () => {
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
  };

  useEffect(() => {
    if (isMapClicked) {
      clearTimer();
      dispatch(commonActions.setHome(null));
    }
  }, [isMapClicked]);

  const device = useMemo(
    () =>
      deviceList.length
        ? deviceList[
            deviceList.findIndex(device => device.id === longPressedID)
          ]
        : null,
    [longPressedID, deviceList],
  );

  const areaInfo = (lat: number, lng: number, areas: AreaResponse[]) => {
    const currentAreaIndex = areas.findIndex(area => {
      const areaCoord = area.coordinate.coordinates;
      return (
        getDistanceBetween2Points(lat, lng, areaCoord[1], areaCoord[0]) <
        area.radius
      );
    });
    if (currentAreaIndex === -1) {
      return null;
    }
    const {
      name,
      radius,
      coordinate: { coordinates },
    } = areas[currentAreaIndex];
    return { name, radius, lat: coordinates[1], lng: coordinates[0] };
  };

  const fetchAddress = async (lat: number, lng: number, time: string) => {
    dispatch(
      commonActions.setHome({
        deviceCoord: { latitude: lat, longitude: lng, time },
        areaRadius: 0,
      }),
    );
    try {
      const data = await getAddressByCoord(lat, lng);
      dispatch(commonActions.setHome({ address: data || "주소 없음" }));
    } catch {
      dispatch(commonActions.setHome({ address: "주소 없음", areaRadius: 0 }));
    } finally {
      dispatch(
        commonActions.setHome({
          showMarker: true,
          showInfoHeader: true,
          isLoading: false,
        }),
      );
    }
  };

  const displayCoord = (
    lat: number,
    lng: number,
    areas: AreaResponse[],
    time: string,
  ) => {
    const area = areaInfo(lat, lng, areas);
    if (area) {
      const { name, radius, lat, lng } = area;
      dispatch(
        commonActions.setHome({
          address: name,
          areaRadius: radius,
          deviceCoord: { latitude: lat, longitude: lng, time },
          showMarker: true,
          showInfoHeader: true,
          isLoading: false,
        }),
      );
    } else {
      fetchAddress(lat, lng, time);
    }
  };

  const fetchDeviceCoord = async (id: number, areas: AreaResponse[]) => {
    try {
      const {
        coordinate: { coordinates },
        date_time,
      } = await getDeviceCoord(id).unwrap();
      const lat = coordinates[1];
      const lng = coordinates[0];
      if (lat && lng) {
        displayCoord(lat, lng, areas, date_time);
      } else {
        clearTimer();
        dispatch(commonActions.setHome({ isLoading: false }));
        Toast.show({
          type: ToastType.Error,
          text1: "최근 위치가 존재하지 않습니다.",
        });
      }
    } catch {
      clearTimer();
      dispatch(commonActions.setHome({ isLoading: false }));
    }
  };

  const fetchDeviceSetting = async (id: number) => {
    try {
      const { collection_period, safety_areas } = await getDeviceSetting(
        id,
      ).unwrap();
      const period =
        collection_period === 1 ? 3000 : 5000; /* collection_period * 1000 */
      fetchDeviceCoord(id, safety_areas);
      interval.current = setInterval(() => {
        fetchDeviceCoord(id, safety_areas);
      }, period);
    } catch {
      clearTimer();
      dispatch(commonActions.setHome({ isLoading: false }));
    }
  };

  const onAvatarPress = useCallback(
    (id: number) => {
      if (isLoading) return;
      const { pressedID } = store.getState().common.home;
      clearTimer();
      if (pressedID !== id) {
        dispatch(
          commonActions.setHome({
            pressedID: id,
            showMarker: false,
            isDeviceMoved: false,
          }),
        );
      }
      dispatch(commonActions.setHome({ isLoading: true }));
      fetchDeviceSetting(id);
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
    if (!isFocused || appState === "background") {
      clearTimer();
    }
  }, [isFocused, appState]);

  if (!deviceList.length) return null;

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
          />
        ))
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            flexGrow: 1,
            paddingHorizontal: 52,
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
        </ScrollView>
      )}
      <Modal {...modalProps({ type: ModalPosition.Bottom })}>
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

export default HomeDeviceList;
