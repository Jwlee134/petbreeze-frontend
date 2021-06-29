import "react-native-gesture-handler";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar, useColorScheme } from "react-native";

import Main from "./navigator/Main";

import { darkTheme, lightTheme } from "./styles/theme";
import { PersistGate } from "redux-persist/integration/react";
import { persister, store } from "./store";
import { Provider } from "react-redux";

import { Settings } from "react-native-fbsdk-next";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "./NotificationHandler";

Settings.initializeSDK();

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <NavigationContainer theme={lightTheme}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
          />
          <SafeAreaProvider>
            <Main />
          </SafeAreaProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
