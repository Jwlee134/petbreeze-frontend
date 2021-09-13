import { Dimensions } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { isAndroid } from "~/utils";

export const width = Dimensions.get("window").width;

export const height = Dimensions.get("window").height;

export const isTablet = width > 480;
const smallHeight = height < 700;
const figmaWidth = 375;
const figmaHeight = isAndroid ? 734 : isIphoneX() ? 812 : 778;

export const rpHeight = (size: number) =>
  Math.round((size * height) / figmaHeight);

export const rpWidth = (size: number) => {
  if (smallHeight || isTablet) {
    return rpHeight(size);
  }
  return Math.round((size * width) / figmaWidth);
};
