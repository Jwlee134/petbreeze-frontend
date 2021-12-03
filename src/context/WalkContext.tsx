import React, { createContext, ReactNode, useCallback, useRef } from "react";
import { StyleSheet } from "react-native";
import NaverMapView, { NaverMapViewProps } from "react-native-nmap";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ViewShotComp from "react-native-view-shot";
import { useDispatch } from "react-redux";
import { Device } from "~/api/device";
import NaverMap from "~/components/common/Map";
import useDevice from "~/hooks/useDevice";
import { useAppSelector } from "~/store";
import { storageActions } from "~/store/storage";

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
  headerHeight: number;
  pause: () => void;
  resume: () => void;
}

const initialContext: Context = {
  mapRef: { current: null },
  Map: () => <></>,
  viewShotRef: { current: null },
  ViewShot: () => <></>,
  deviceList: [],
  stoppedSnapIndex: 0,
  headerHeight: 0,
  pause: () => {},
  resume: () => {},
};

export const WalkContext = createContext(initialContext);

const WalkContextProvider = ({ children }: { children: ReactNode }) => {
  const selectedIds = useAppSelector(
    state => state.storage.walk.selectedDeviceId,
  );
  const currentPauseTime = useAppSelector(
    state => state.storage.walk.currentPauseTime,
  );
  const deviceList = useDevice();
  const mapRef = useRef<NaverMapView>(null);
  const viewShotRef = useRef<ViewShotComp>(null);
  const { top, bottom } = useSafeAreaInsets();
  const dispatch = useDispatch();

  const stoppedSnapIndex = 179 + bottom;
  const headerHeight = top + 52;

  const ViewShot = useCallback(
    ({ children }: { children: ReactNode }) => (
      <ViewShotComp
        ref={viewShotRef}
        style={{
          ...(StyleSheet.absoluteFill as object),
          marginTop: headerHeight,
        }}>
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

  const pause = useCallback(() => {
    dispatch(
      storageActions.setWalk({
        isWalking: false,
        currentPauseTime: new Date().toISOString(),
      }),
    );
  }, []);

  const resume = useCallback(() => {
    dispatch(storageActions.setWalk({ isWalking: true }));
    dispatch(
      storageActions.setTotalPauseDuration(
        Math.floor((Date.now() - new Date(currentPauseTime).getTime()) / 1000),
      ),
    );
  }, [currentPauseTime]);

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
        headerHeight,
        pause,
        resume,
      }}>
      {children}
    </WalkContext.Provider>
  );
};

export default WalkContextProvider;
