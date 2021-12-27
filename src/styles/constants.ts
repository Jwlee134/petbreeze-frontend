import { StyleProp, ViewStyle } from "react-native";
import Animated, { Easing } from "react-native-reanimated";

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

export const homeBottomSheetHeight = 156;

const ANIMATION_EASING: Animated.EasingFunction = Easing.out(Easing.exp);
const ANIMATION_DURATION = 250;
export const ANIMATION_CONFIGS_IOS = {
  damping: 500,
  stiffness: 1000,
  mass: 3,
  overshootClamping: true,
  restDisplacementThreshold: 10,
  restSpeedThreshold: 10,
};
export const ANIMATION_CONFIGS_ANDROID = {
  duration: ANIMATION_DURATION,
  easing: ANIMATION_EASING,
};
