import React, { useState, useEffect } from "react";
import useMap from "~/hooks/useMap";
import { WalkMapScreenNavigationProp } from "~/types/navigator";
import styled, { css } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useLocationTracking from "~/hooks/useLocationTracking";
import { useAppSelector } from "~/store";
import Marker from "~/components/map/Marker";
import palette from "~/styles/palette";
import { Polyline } from "react-native-maps";
import useModal from "~/hooks/useModal";
import Modal from "react-native-modal";

import Camera from "~/assets/svg/camera.svg";
import PauseCircle from "~/assets/svg/pause-circle.svg";
import PlayCircle from "~/assets/svg/play-circle.svg";
import SimpleToggleModal from "~/components/modal/SimpleToggleModal";

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

const WalkMap = ({
  navigation,
}: {
  navigation: WalkMapScreenNavigationProp;
}) => {
  const { latitude, longitude } = useAppSelector(state => state.map.myCoords);
  const { bottom } = useSafeAreaInsets();
  const { Map, mapRef } = useMap();
  const { startTracking, clearTracking } = useLocationTracking();
  const { open, close, modalProps, CenterModalComponent } = useModal({
    type: "center",
  });

  const [path, setPath] = useState<{ latitude: number; longitude: number }[]>(
    [],
  );
  const [isWalking, setIsWalking] = useState(true);
  const [meter, setMeter] = useState(0);
  const [time, setTime] = useState(0);

  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    if (!mapRef.current || !latitude || !longitude) return;
    console.log(latitude, longitude);
    const arr = [...path];
    arr.push({ latitude, longitude });
    setPath(arr);
    mapRef.current.animateCamera({
      center: {
        latitude,
        longitude,
      },
      zoom: 18,
    });
  }, [mapRef, latitude, longitude]);

  useEffect(() => {
    if (path.length < 2) return;
    console.log(path.map(coord => [coord.latitude, coord.longitude]));
    setMeter((path.length - 1) * 10);
  }, [path]);

  useEffect(() => {
    let stopwatch: NodeJS.Timeout;
    if (isWalking) {
      startTracking();
      stopwatch = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      clearTracking();
      clearInterval(stopwatch);
    };
  }, [isWalking]);

  useEffect(() => {
    setStartTime(new Date());
  }, []);

  const hour = Math.floor(time / 3600) % 60;
  const min = Math.floor(time / 60) % 60;
  const sec = Math.floor(time) % 60;

  const handleFinish = async () => {
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
      <Map>
        {path.length > 0 && (
          <Polyline
            coordinates={path}
            strokeWidth={7}
            strokeColor={palette.blue_34}
          />
        )}
        <Marker coordinate={{ latitude, longitude }} color="green" />
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
          <Button isTransparent onPress={() => setIsWalking(prev => !prev)}>
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
