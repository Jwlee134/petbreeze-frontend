import { Dimensions } from "react-native";
import { isAndroid } from "~/utils";

export const width = Dimensions.get("window").width;

export const height = Dimensions.get("window").height;

export const isTablet = width > 480;
const smallHeight = height < 667;

const figmaWidth = 375;
const figmaHeight = isAndroid ? 734 : 812;

export const rpHeight = (size: number) =>
  Math.round((size * height) / figmaHeight);

export const rpWidth = (size: number) => {
  if (smallHeight) {
    return rpHeight(size);
  }
  if (!isTablet) {
    return Math.round((size * width) / figmaWidth);
  } else {
    return rpHeight(size);
  }
};
