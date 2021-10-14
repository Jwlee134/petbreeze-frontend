import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";

import { HomeScreenNavigationProp } from "~/types/navigator";

import DeviceList from "~/components/home/DeviceList";
import { DimensionsContext } from "~/context/DimensionsContext";
import MapButton from "~/components/common/MapButton";
import Map from "~/components/common/Map";
import NaverMapView, { Marker } from "react-native-nmap";
import Geolocation from "react-native-geolocation-service";
import { useIsFocused } from "@react-navigation/native";
import useAppState from "~/hooks/useAppState";
import { delta } from "~/constants";

const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const Home = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
  const { rpWidth } = useContext(DimensionsContext);
  const mapRef = useRef<NaverMapView>(null);
  const trackingId = useRef<number | null>(null);
  const isFocused = useIsFocused();
  const appState = useAppState();

  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });
  const [isCameraMoved, setIsCameraMoved] = useState(true);

  const animateToMyLocation = () => {
    mapRef.current?.animateToRegion({
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: delta,
      longitudeDelta: delta,
    });
    setIsCameraMoved(true);
  };

  const handleMyLocation = () => {
    setIsCameraMoved(false);
    if (trackingId.current !== null) {
      animateToMyLocation();
    } else {
      trackingId.current = Geolocation.watchPosition(
        ({ coords }) => {
          setCoords(coords);
        },
        err => {
          console.log(err);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 5,
        },
      );
    }
  };

  useEffect(() => {
    if (!isCameraMoved && coords.latitude) animateToMyLocation();
  }, [coords, isCameraMoved]);

  useEffect(() => {
    if (!isFocused || appState === "background") {
      if (trackingId.current !== null) {
        Geolocation.clearWatch(trackingId.current);
        trackingId.current = null;
        setCoords({ latitude: 0, longitude: 0 });
      }
    }
  }, [isFocused, appState]);

  return (
    <>
      <Container>
        <Map ref={mapRef}>
          {coords.latitude ? (
            <Marker
              coordinate={coords}
              image={require("~/assets/image/my-location-marker.png")}
              width={rpWidth(100)}
              height={rpWidth(100)}
              anchor={{ x: 0.5, y: 0.5 }}
            />
          ) : null}
        </Map>
        <DeviceList />
        <MapButton
          onPress={handleMyLocation}
          icon="myLocation"
          style={{
            marginBottom: rpWidth(157),
            alignSelf: "flex-end",
            marginRight: rpWidth(16),
          }}
        />
      </Container>
    </>
  );
};

export default Home;
