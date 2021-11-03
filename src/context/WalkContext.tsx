import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { StyleSheet } from "react-native";
import NaverMapView, { NaverMapViewProps } from "react-native-nmap";
import ViewShotComp from "react-native-view-shot";
import { useDispatch } from "react-redux";
import { Device } from "~/api/device";
import NaverMap from "~/components/common/Map";
import useDevice from "~/hooks/useDevice";
import { useAppSelector } from "~/store";
import { storageActions } from "~/store/storage";

interface IMap extends NaverMapViewProps {
  children: ReactNode;
}

interface IContext {
  mapRef: React.RefObject<NaverMapView>;
  Map: ({ children, ...props }: IMap) => JSX.Element;
  viewShotRef: React.RefObject<ViewShotComp>;
  ViewShot: ({ children }: { children: ReactNode }) => JSX.Element;
  deviceList: Device[];
}

const initialContext: IContext = {
  mapRef: { current: null },
  Map: () => <></>,
  viewShotRef: { current: null },
  ViewShot: () => <></>,
  deviceList: [],
};

export const WalkContext = createContext(initialContext);

const WalkContextProvider = ({ children }: { children: ReactNode }) => {
  const selectedIds = useAppSelector(
    state => state.storage.walk.selectedDeviceId,
  );
  const deviceList = useDevice();
  const dispatch = useDispatch();
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

  useEffect(() => {
    return () => {
      dispatch(storageActions.setWalk(null));
    };
  }, []);

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
      }}>
      {children}
    </WalkContext.Provider>
  );
};

export default WalkContextProvider;
