import "react-native-gesture-handler";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import styled from "styled-components/native";

import Main from "./navigator/Main";

import { darkTheme, lightTheme } from "./styles/theme";
import { PersistGate } from "redux-persist/integration/react";
import { persister, store } from "./store";
import { Provider } from "react-redux";

import { Constants } from "react-native-unimodules";
console.log(Constants.systemFonts);

const Container = styled.SafeAreaView`
  flex: 1;
`;

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <NavigationContainer theme={lightTheme}>
          <Container>
            <Main />
          </Container>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
