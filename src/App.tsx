import "react-native-gesture-handler";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import { Settings } from "react-native-fbsdk-next";
import { SafeAreaProvider } from "react-native-safe-area-context";

import theme from "./styles/theme";
import { persister, store } from "./store";
import RootNav from "./navigator/RootNav";
import DimensionsContextProvider from "./context/DimensionsContext";

Settings.initializeSDK();

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persister}>
      <DimensionsContextProvider>
        <NavigationContainer theme={theme}>
          <SafeAreaProvider>
            <RootNav />
          </SafeAreaProvider>
        </NavigationContainer>
      </DimensionsContextProvider>
    </PersistGate>
  </Provider>
);

export default App;
