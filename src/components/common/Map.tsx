import React, { ForwardedRef, forwardRef, ReactNode } from "react";
import { StyleSheet } from "react-native";
import NaverMapView, { NaverMapViewProps } from "react-native-nmap";

export interface Props extends NaverMapViewProps {
  children?: ReactNode;
}

const Map = forwardRef(
  ({ children, ...props }: Props, ref: ForwardedRef<NaverMapView>) => {
    return (
      <NaverMapView
        ref={ref}
        style={StyleSheet.absoluteFill}
        zoomControl={false}
        tiltGesturesEnabled={false}
        useTextureView
        {...props}>
        {children || null}
      </NaverMapView>
    );
  },
);

export default Map;
