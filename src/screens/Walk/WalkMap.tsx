import React, { useEffect } from "react";
import useMap from "~/hooks/useMap";
import { WalkMapScreenNavigationProp } from "~/types/navigator";
import styled, { css } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useMyLocation from "~/hooks/useMyLocation";
import { useAppSelector } from "~/store";
import Marker from "~/components/map/Marker";
import palette from "~/styles/palette";
import { Polyline } from "react-native-maps";
import useModal from "~/hooks/useModal";
import Modal from "react-native-modal";
import BackgroundService from "react-native-background-actions";

import Camera from "~/assets/svg/camera.svg";
import PauseCircle from "~/assets/svg/pause-circle.svg";
import PlayCircle from "~/assets/svg/play-circle.svg";
import SimpleToggleModal from "~/components/modal/SimpleToggleModal";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";
import { useRef } from "react";

const Controller = styled.View<{ bottom: number }>`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${({ bottom }) => bottom + 145}px;
  padding-bottom: ${({ bottom }) => bottom}px;
  background-color: rgba(110, 65, 226, 0.87);
  justify-content: space-evenly;
`;

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
`;

const Button = styled.TouchableOpacity<{ isTransparent?: boolean }>`
  ${({ isTransparent }) =>
    !isTransparent &&
    css`
      width: 46px;
      height: 46px;
      border-radius: 23px;
      background-color: white;
      justify-content: center;
      align-items: center;
    `}
`;

const TextContainer = styled.View`
  width: 50%;
  align-items: center;
`;

const Text = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

const PauseSquare = styled.View`
  width: 15px;
  height: 15px;
  background-color: ${palette.blue_6e};
`;

const options = {
  taskName: "Example",
  taskTitle: "어디개",
  taskDesc: "산책 중입니다...",
  taskIcon: {
    name: "ic_launcher",
    type: "mipmap",
  },
  color: "#ff00ff",
  linkingURI: "petbreeze://walk/map",
};

const WalkMap = ({
  navigation,
}: {
  navigation: WalkMapScreenNavigationProp;
}) => {
  const { bottom } = useSafeAreaInsets();
  const { Map, mapRef } = useMap();
  const { clearTracking, setCoords } = useMyLocation({
    isWalking: true,
  });
  const { open, close, modalProps, CenterModalComponent } = useModal({
    type: "center",
  });
  const { didMountInitially, duration, isWalking, startTime, meter, coords } =
    useAppSelector(state => state.storage.walk);
  const dispatch = useDispatch();
  const timer = useRef<NodeJS.Timeout>();

  const stopwatch = async () => {
    for (let i = duration; BackgroundService.isRunning(); i++) {
      console.log(i);
      dispatch(storageActions.setDuration(i));
      await new Promise<void>(resolve => {
        timer.current = setTimeout(() => {
          resolve();
        }, 1000);
      });
    }
  };

  const backgroundTask = async () => {
    await new Promise<void>(() => {
      setCoords()
        .then(stopwatch)
        .catch(() => {
          dispatch(storageActions.setIsWalking(false));
          BackgroundService.stop();
        });
    });
  };

  useEffect(() => {
    if (isWalking && !BackgroundService.isRunning()) {
      BackgroundService.start(backgroundTask, options);
    }
    if (!isWalking && BackgroundService.isRunning()) {
      BackgroundService.stop().then(() => {
        clearTracking();
        if (timer.current) {
          clearTimeout(timer.current);
        }
      });
    }
  }, [isWalking]);

  useEffect(() => {
    if (!mapRef.current) return;
    if (coords.length === 1 && !startTime) {
      mapRef.current.animateCamera({
        center: {
          latitude: coords[0][0],
          longitude: coords[0][1],
        },
        zoom: 18,
      });
      dispatch(storageActions.setStartTime(new Date().toISOString()));
    }
    if (coords.length > 1) {
      dispatch(storageActions.setMeter((coords.length - 1) * 10));
    }
  }, [mapRef, coords]);

  useEffect(() => {
    if (!mapRef.current) return;
    if (coords.length !== 0) {
      // map initialCamera 프로퍼티와 겹치지 않기 위해 setTimeout
      setTimeout(() => {
        mapRef.current?.animateCamera({
          center: {
            latitude: coords[coords.length - 1][0],
            longitude: coords[coords.length - 1][1],
          },
          zoom: 18,
        });
      }, 500);
      return;
    }
    if (!BackgroundService.isRunning() && didMountInitially) {
      BackgroundService.start(backgroundTask, options).then(() => {
        dispatch(storageActions.setDidMountInitially(false));
        dispatch(storageActions.setIsWalking(true));
      });
    }
  }, [mapRef]);

  const hour = Math.floor(duration / 3600) % 60;
  const min = Math.floor(duration / 60) % 60;
  const sec = Math.floor(duration) % 60;

  const handleFinish = async () => {
    if (BackgroundService.isRunning()) {
      await BackgroundService.stop();
      clearTracking();
    }
    dispatch(storageActions.clearWalk());
    navigation.replace("Walk");
    /*  const { data } = await api.post("/walk/2/", {
      start_date_time: startTime as Date,
      end_date_time: new Date((startTime as Date).getTime() + time * 1000),
      distance: meter,
      travel_path: {
        type: "MultiPoint",
        coordinates: path.map(coord => [coord.latitude, coord.longitude]),
      },
    });
    const { data: data2 } = await api.patch(`/walk/2/?walk_id=${data.id}`);
    console.log(data2); */
  };

  return (
    <>
      <Map style={StyleSheet.absoluteFill}>
        {coords.length > 0 && (
          <>
            <Polyline
              coordinates={coords.map(coord => ({
                latitude: coord[0],
                longitude: coord[1],
              }))}
              strokeWidth={7}
              strokeColor={palette.blue_34}
            />
            <Marker
              coordinate={{
                latitude: coords[coords.length - 1][0],
                longitude: coords[coords.length - 1][1],
              }}
              color="green"
            />
          </>
        )}
      </Map>
      <Controller bottom={bottom}>
        <RowContainer>
          <TextContainer>
            <Text>
              거리{" "}
              {meter < 1000
                ? `${meter}m`
                : `${String(meter / 1000).substring(0, 4)}km`}
            </Text>
          </TextContainer>
          <TextContainer>
            <Text>
              {hour < 10 ? `0${hour}` : hour}:{min < 10 ? `0${min}` : min}:
              {sec < 10 ? `0${sec}` : sec}
            </Text>
          </TextContainer>
        </RowContainer>
        <RowContainer>
          <Button>
            <Camera />
          </Button>
          <Button
            isTransparent
            onPress={() => {
              dispatch(storageActions.setIsWalking(!isWalking));
            }}>
            {isWalking ? <PauseCircle /> : <PlayCircle />}
          </Button>
          <Button onPress={handleFinish}>
            <PauseSquare />
          </Button>
        </RowContainer>
      </Controller>
      <Modal {...modalProps}>
        <CenterModalComponent>
          <SimpleToggleModal
            onConfirm={handleFinish}
            onConfirmButtonText="종료"
            onConfirmText="산책을 종료하시겠습니까?"
            onAbort={close}
          />
        </CenterModalComponent>
      </Modal>
    </>
  );
};

export default WalkMap;
