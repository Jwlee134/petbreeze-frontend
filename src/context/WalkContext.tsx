import React, { createContext, ReactNode, useCallback, useRef } from "react";
import { StyleSheet } from "react-native";
import NaverMapView, { NaverMapViewProps } from "react-native-nmap";
import ViewShot from "react-native-view-shot";
import ViewShotComp from "react-native-view-shot";
import NaverMap from "~/components/common/Map";
import { useAppSelector } from "~/store";
import { IDevice } from "~/store/device";

interface IMap extends NaverMapViewProps {
  children: ReactNode;
}

interface IContext {
  mapRef: React.RefObject<NaverMapView>;
  Map: ({ children, ...props }: IMap) => JSX.Element;
  viewShotRef: React.RefObject<ViewShot>;
  ViewShot: ({ children }: { children: ReactNode }) => JSX.Element;
  devices: IDevice[];
}

const initialContext: IContext = {
  mapRef: { current: null },
  Map: () => <></>,
  viewShotRef: { current: null },
  ViewShot: () => <></>,
  devices: [],
};

export const WalkContext = createContext(initialContext);

const WalkContextProvider = ({ children }: { children: ReactNode }) => {
  const selectedIds = useAppSelector(
    state => state.storage.walk.selectedDeviceId,
  );
  const devices = useAppSelector(state => state.device);

  const mapRef = useRef<NaverMapView>(null);
  const viewShotRef = useRef<ViewShotComp>(null);

  const ViewShot = useCallback(
    ({ children }: { children: ReactNode }) => (
      <ViewShotComp ref={viewShotRef} style={StyleSheet.absoluteFill as object}>
        {children}
      </ViewShotComp>
    ),
    [],
  );

  const Map = useCallback(
    ({ children, ...props }: IMap) => (
      <NaverMap ref={mapRef} {...props}>
        {children}
      </NaverMap>
    ),
    [],
  );

  return (
    <WalkContext.Provider
      value={{
        mapRef,
        Map,
        viewShotRef,
        ViewShot,
        devices: devices.filter(device =>
          selectedIds.some(id => device.id === id),
        ),
      }}>
      {children}
    </WalkContext.Provider>
  );
};

export default WalkContextProvider;
