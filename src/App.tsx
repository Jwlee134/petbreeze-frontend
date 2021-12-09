import "react-native-gesture-handler";

import React from "react";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import { Settings } from "react-native-fbsdk-next";
import { SafeAreaProvider } from "react-native-safe-area-context";

import theme from "./styles/theme";
import { persister, store } from "./store";
import RootNav from "./navigator/RootNav";
import DimensionsContextProvider from "./context/DimensionsContext";
import { useFlipper } from "@react-navigation/devtools";

Settings.initializeSDK();

const App = () => {
  const navigationRef = useNavigationContainerRef();

  useFlipper(navigationRef);

  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <DimensionsContextProvider>
          <NavigationContainer ref={navigationRef} theme={theme}>
            <SafeAreaProvider>
              <RootNav />
            </SafeAreaProvider>
          </NavigationContainer>
        </DimensionsContextProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
