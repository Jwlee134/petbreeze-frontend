import "react-native-gesture-handler";

import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { lightTheme } from "./styles/theme";
import { PersistGate } from "redux-persist/integration/react";
import { persister, store } from "./store";
import { Provider } from "react-redux";

import { Settings } from "react-native-fbsdk-next";
import { SafeAreaProvider } from "react-native-safe-area-context";

import RootNav from "./navigator/RootNav";

import MQTT from "sp-react-native-mqtt";
import { View } from "react-native";
import MyText from "./components/common/MyText";

Settings.initializeSDK();

const App = () => {
  useEffect(() => {
    MQTT.createClient({
      uri: "mqtt://test.mosquitto.org:1883",
      clientId: "abcdefg",
    })
      .then(function (client) {
        client.on("message", function (msg) {
          console.log("mqtt.event.message", msg);
        });

        client.on("connect", function () {
          console.log("connected");
          client.subscribe("/petbreeze/", 0);
        });

        client.connect();
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return (
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
};

export default App;
