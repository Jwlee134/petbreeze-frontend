import { StyleProp, ViewStyle } from "react-native";

export const bottomSheetHandleHeight = 36;

export const centerModalOutTiming = 200;
export const bottomModalOutTiming = 400;

export const minSpace = 50;

export const mapButtonSize = 48;
export const textLoadingIndicatorSize = 36;

// 홈 맵, 산책 맵 공통
export const liveModeButtonStyle = (top: number): StyleProp<ViewStyle> => ({
  position: "absolute",
  right: 16,
  top: top + 74,
});
export const myLocationButtonStyle = (top: number): StyleProp<ViewStyle> => ({
  position: "absolute",
  right: 16,
  top: top + 140,
});
