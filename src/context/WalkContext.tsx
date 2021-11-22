import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
} from "react";
import { StyleSheet } from "react-native";
import NaverMapView, { NaverMapViewProps } from "react-native-nmap";
import ViewShotComp from "react-native-view-shot";
import { Device } from "~/api/device";
import NaverMap from "~/components/common/Map";
import useDevice from "~/hooks/useDevice";
import { useAppSelector } from "~/store";
import { DimensionsContext } from "./DimensionsContext";

interface MapProps extends NaverMapViewProps {
  children: ReactNode;
}

interface Context {
  mapRef: React.RefObject<NaverMapView>;
  Map: ({ children, ...props }: MapProps) => JSX.Element;
  viewShotRef: React.RefObject<ViewShotComp>;
  ViewShot: ({ children }: { children: ReactNode }) => JSX.Element;
  deviceList: Device[];
  stoppedSnapIndex: number;
}

const initialContext: Context = {
  mapRef: { current: null },
  Map: () => <></>,
  viewShotRef: { current: null },
  ViewShot: () => <></>,
  deviceList: [],
  stoppedSnapIndex: 0,
};

export const WalkContext = createContext(initialContext);

const WalkContextProvider = ({ children }: { children: ReactNode }) => {
  const { rpWidth } = useContext(DimensionsContext);
  const selectedIds = useAppSelector(
    state => state.storage.walk.selectedDeviceId,
  );
  const deviceList = useDevice();
  const mapRef = useRef<NaverMapView>(null);
  const viewShotRef = useRef<ViewShotComp>(null);

  const stoppedSnapIndex = rpWidth(316);

  const ViewShot = useCallback(
    ({ children }: { children: ReactNode }) => (
      <ViewShotComp ref={viewShotRef} style={StyleSheet.absoluteFill as object}>
        {children}
      </ViewShotComp>
    ),
    [],
  );

  const Map = useCallback(
    ({ children, ...props }: MapProps) => (
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
        deviceList:
          deviceList?.filter(device =>
            selectedIds.some(id => device.id === id),
          ) || [],
        stoppedSnapIndex,
      }}>
      {children}
    </WalkContext.Provider>
  );
};

export default WalkContextProvider;
