import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, useColorScheme } from "react-native";

import Main from "./navigator";

import { Constants } from "react-native-unimodules";
console.log(Constants.systemFonts);

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
