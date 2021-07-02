import "react-native-gesture-handler";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { lightTheme } from "./styles/theme";
import { PersistGate } from "redux-persist/integration/react";
import { persister, store } from "./store";
import { Provider } from "react-redux";

import { Settings } from "react-native-fbsdk-next";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "./NotificationHandler";
import RootNav from "./navigator/RootNav";

Settings.initializeSDK();

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persister}>
      <NavigationContainer theme={lightTheme}>
        <SafeAreaProvider>
          <RootNav />
        </SafeAreaProvider>
      </NavigationContainer>
    </PersistGate>
  </Provider>
);

export default App;
