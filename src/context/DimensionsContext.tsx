import React, { createContext, ReactNode } from "react";
import { useWindowDimensions } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { isAndroid } from "~/utils";

export type RpWidth = (size: number, preventRpHeight?: boolean) => number;
export type RpHeight = (size: number) => number;

interface Context {
  width: number;
  height: number;
  rpWidth: RpWidth;
  rpHeight: RpHeight;
  isTablet: boolean;
}

const initialContext: Context = {
  width: 0,
  height: 0,
  rpWidth: () => 0,
  rpHeight: () => 0,
  isTablet: false,
};

export const DimensionsContext = createContext(initialContext);

const DimensionsContextProvider = ({ children }: { children: ReactNode }) => {
  const { width, height } = useWindowDimensions();

  const figmaWidth = 375;
  const figmaHeight = isAndroid ? 734 : isIphoneX() ? 812 : 778;
  const isTablet = width > 480;

  const rpHeight = (size: number) => Math.floor((size * height) / figmaHeight);

  const rpWidth = (size: number, preventRpHeight = false) => {
    if (!preventRpHeight && isTablet) {
      return rpHeight(size);
    }
    return Math.floor((size * width) / figmaWidth);
  };

  return (
    <DimensionsContext.Provider
      value={{ width, height, rpWidth, rpHeight, isTablet }}>
      {children}
    </DimensionsContext.Provider>
  );
};

export default DimensionsContextProvider;
