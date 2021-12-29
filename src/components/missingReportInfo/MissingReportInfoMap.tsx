import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import NaverMapView, { Marker } from "react-native-nmap";
import emergencyApi from "~/api/emergency";
import { DELTA } from "~/constants";
import Map from "../common/Map";

interface Props {
  bottom: number;
  emergencyKey: string;
}

const MissingReportInfoMap = ({ emergencyKey, bottom }: Props) => {
  const isFocused = useIsFocused();
  const { data: { coordinate: { coordinates = [] } = {} } = {} } =
    emergencyApi.useGetLocationQuery(emergencyKey, {
      skip: !emergencyKey || !isFocused,
      pollingInterval: 3000,
    });
  const mapRef = useRef<NaverMapView>(null);
  const [isMoved, setIsMoved] = useState(false);

  useEffect(() => {
    if (!mapRef.current || !coordinates[0] || !coordinates[1] || isMoved)
      return;
    mapRef.current.animateToRegion({
      latitude: coordinates[1],
      longitude: coordinates[0],
      latitudeDelta: DELTA,
      longitudeDelta: DELTA,
    });
    setIsMoved(true);
  }, [mapRef, coordinates]);

  return (
    <Map ref={mapRef} mapPadding={{ top: 0, bottom }}>
      {coordinates[0] && coordinates[1] ? (
        <Marker
          coordinate={{ latitude: coordinates[1], longitude: coordinates[0] }}
          image={require("~/assets/image/footprint-marker-red.png")}
          width={41}
          height={57}
          anchor={{ x: 0.5, y: 0.96 }}
        />
      ) : null}
    </Map>
  );
};

export default MissingReportInfoMap;
