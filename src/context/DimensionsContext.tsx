import React, { createContext, ReactNode } from "react";
import { Dimensions, useWindowDimensions } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { isAndroid } from "~/utils";

export type RpHeight = (size: number, forceApply?: boolean) => number;

interface Context {
  rpHeight: RpHeight;
  isTablet: boolean;
  width: number;
}

const initialContext: Context = {
  rpHeight: () => 0,
  isTablet: false,
  width: 0,
};

export const DimensionsContext = createContext(initialContext);

const { height } = Dimensions.get("window");

const DimensionsContextProvider = ({ children }: { children: ReactNode }) => {
  const { width } = useWindowDimensions();
  const figmaHeight = isAndroid ? 734 : isIphoneX() ? 812 : 778;
  const smallHeight = height < 720;
  const isTablet = width > 480;

  const rpHeight = (size: number, forceApply = false) =>
    smallHeight || forceApply ? (size * height) / figmaHeight : size;

  return (
    <DimensionsContext.Provider value={{ rpHeight, isTablet, width }}>
      {children}
    </DimensionsContext.Provider>
  );
};

export default DimensionsContextProvider;
