import React, { ForwardedRef, forwardRef, ReactNode } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import NaverMapView, { NaverMapViewProps } from "react-native-nmap";

export interface Props extends NaverMapViewProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  isPositionAbsolute?: boolean;
}

const Map = forwardRef(
  (
    { children, style, isPositionAbsolute = true, ...props }: Props,
    ref: ForwardedRef<NaverMapView>,
  ) => {
    return (
      <NaverMapView
        ref={ref}
        style={{
          ...(isPositionAbsolute && (StyleSheet.absoluteFill as object)),
          ...(style as object),
        }}
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
