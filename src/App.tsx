import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Settings } from "react-native-fbsdk-next";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { persister, store } from "./store";
import RootNav from "./navigator/RootNav";
import DimensionsContextProvider from "./context/DimensionsContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from "react-native-exception-handler";
import crashlytics from "./utils/crashlytics";

Settings.initializeSDK();

setJSExceptionHandler(error => {
  crashlytics.recordError(error);
});

setNativeExceptionHandler(
  message => {
    const error = new Error(message);
    crashlytics.recordError(error);
  },
  true,
  true,
);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <DimensionsContextProvider>
          <SafeAreaProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <RootNav />
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </DimensionsContextProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
