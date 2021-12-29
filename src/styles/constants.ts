import { StyleProp, ViewStyle } from "react-native";
import Animated, { Easing } from "react-native-reanimated";

export const BOTTOM_SHEET_HANDLE_HEIGHT = 36;

export const CENTER_MODAL_OUT_TIMING = 200;
export const BOTTOM_MODAL_OUT_TIMING = 400;

export const MIN_SPACE = 50;

export const MAP_BUTTON_SIZE = 48;
export const SMALL_LOADING_INDICATOR_SIZE = 36;

export const HEADER_HEIGHT = 48;
export const HEADER_BACK_BUTTON_WIDTH = 36;

export const HIDDEN_BUTTON_WIDTH = 78;

// 홈 맵, 산책 맵 공통
export const LIVE_MODE_BUTTON_STYLE = (
  top: number,
  isHome = false,
): StyleProp<ViewStyle> => ({
  position: "absolute",
  right: 16,
  top: top + (isHome ? 18 : 74),
});
export const MY_LOCATION_BUTTON_STYLE = (
  top: number,
  isHome = false,
): StyleProp<ViewStyle> => ({
  position: "absolute",
  right: 16,
  top: top + (isHome ? 84 : 140),
});

export const HOME_BOTTOM_SHEET_HEIGHT = 156;

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
