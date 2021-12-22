import { StyleProp, ViewStyle } from "react-native";

export const bottomSheetHandleHeight = 36;

export const centerModalOutTiming = 200;
export const bottomModalOutTiming = 400;

export const minSpace = 50;

export const mapButtonSize = 48;
export const textLoadingIndicatorSize = 36;

export const headerHeight = 48;
export const headerBackButtonWidth = 36;

export const hiddenButtonWidth = 78;

// 홈 맵, 산책 맵 공통
export const liveModeButtonStyle = (
  top: number,
  isHome = false,
): StyleProp<ViewStyle> => ({
  position: "absolute",
  right: 16,
  top: top + (isHome ? 18 : 74),
});
export const myLocationButtonStyle = (
  top: number,
  isHome = false,
): StyleProp<ViewStyle> => ({
  position: "absolute",
  right: 16,
  top: top + (isHome ? 84 : 140),
});
