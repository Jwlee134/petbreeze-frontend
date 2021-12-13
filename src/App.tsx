import React, { useMemo } from "react";
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
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Toast, { BaseToast, BaseToastProps } from "react-native-toast-message";
import toastStyle, { ToastType } from "./styles/toast";

Settings.initializeSDK();

const App = () => {
  const navigationRef = useNavigationContainerRef();
  const toastConfig = useMemo(
    () => ({
      notification: ({ ...rest }: BaseToastProps) => (
        <BaseToast {...rest} {...toastStyle(ToastType.Notification)} />
      ),
      error: ({ ...rest }: BaseToastProps) => (
        <BaseToast {...rest} {...toastStyle(ToastType.Error)} />
      ),
    }),
    [],
  );

  useFlipper(navigationRef);

  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <DimensionsContextProvider>
          <NavigationContainer ref={navigationRef} theme={theme}>
            <SafeAreaProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <RootNav />
              </GestureHandlerRootView>
            </SafeAreaProvider>
          </NavigationContainer>
          <Toast config={toastConfig} />
        </DimensionsContextProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
