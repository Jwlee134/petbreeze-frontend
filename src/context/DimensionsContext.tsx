import React, { createContext, ReactNode } from "react";
import { Dimensions } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { isAndroid } from "~/utils";

export type RpHeight = (size: number) => number;

interface Context {
  rpHeight: RpHeight;
}

const initialContext: Context = {
  rpHeight: () => 0,
};

export const DimensionsContext = createContext(initialContext);

const { height } = Dimensions.get("window");

const DimensionsContextProvider = ({ children }: { children: ReactNode }) => {
  const figmaHeight = isAndroid ? 734 : isIphoneX() ? 812 : 778;
  const smallHeight = height < 720;

  const rpHeight = (size: number) =>
    smallHeight ? Math.floor((size * height) / figmaHeight) : size;

  return (
    <DimensionsContext.Provider value={{ rpHeight }}>
      {children}
    </DimensionsContext.Provider>
  );
};

export default DimensionsContextProvider;
