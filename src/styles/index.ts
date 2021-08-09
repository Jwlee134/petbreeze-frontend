import { Dimensions } from "react-native";
import { isAndroid } from "~/utils";

export const width = Dimensions.get("window").width;

export const height = Dimensions.get("window").height;

const figmaWidth = 450;
const figmaHeight = isAndroid ? 880.8 : 974.4;

export const rpWidth = (size: number) =>
  Math.round((size * width) / figmaWidth);

export const rpHeight = (size: number) =>
  Math.round((size * height) / figmaHeight);
