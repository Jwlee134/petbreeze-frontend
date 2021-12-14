import React, { useRef } from "react";
import PreArea from "~/screens/bleWithHeaderStackNav/PreArea";
import RegisterProfileFirst, {
  RegisterProfileFirstGoBack,
} from "~/screens/bleWithHeaderStackNav/RegisterProfileFirst";
import {
  BleWithHeaderStackNavParamList,
  BleWithHeaderStackNavScreenNavigationProp,
  BleWithHeaderStackNavScreenRouteProp,
} from "~/types/navigator";
import ChargingCheck from "~/screens/bleWithHeaderStackNav/ChargingCheck";
import CustomHeader from "~/components/navigator/CustomHeader";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import RegisterProfileSecond, {
  RegisterProfileSecondGoBack,
} from "~/screens/bleWithHeaderStackNav/RegisterProfileSecond";
import PreWiFiForm from "~/screens/bleWithHeaderStackNav/PreWiFiForm";
import WiFiForm, {
  WiFiFormGoBack,
} from "~/screens/bleWithHeaderStackNav/WiFiForm";
import { headerHeight } from "~/styles/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator<BleWithHeaderStackNavParamList>();

const BleWithHeaderStackNav = ({
  navigation,
  route,
}: {
  navigation: BleWithHeaderStackNavScreenNavigationProp;
  route: BleWithHeaderStackNavScreenRouteProp;
}) => {
  const { top } = useSafeAreaInsets();
  const routeName =
    getFocusedRouteNameFromRoute(route) || route.params?.initialRouteName;
  const wifiFormRef = useRef<WiFiFormGoBack>(null);
  const registerProfileFirstRef = useRef<RegisterProfileFirstGoBack>(null);
  const registerProfileSecondRef = useRef<RegisterProfileSecondGoBack>(null);

  return (
    <>
      <CustomHeader
        containerStyle={{ position: "absolute", zIndex: 1 }}
        pageIndicatorStyle={{
          position: "absolute",
          zIndex: 1,
          top: headerHeight + top,
        }}
        currentPage={
          routeName === "PreArea"
            ? 1
            : routeName?.includes("WiFi")
            ? 2
            : routeName === "RegisterProfileFirst"
            ? 3
            : routeName === "RegisterProfileSecond"
            ? 4
            : undefined
        }
        totalPage={4}
        onBackButtonPress={() => {
          if (routeName === "WiFiForm") {
            wifiFormRef.current?.goBack();
          } else if (routeName === "RegisterProfileSecond") {
            registerProfileSecondRef.current?.goBack();
          } else if (routeName === "RegisterProfileFirst") {
            registerProfileFirstRef.current?.goBack();
          } else {
            navigation.goBack();
          }
        }}
      />
      <Stack.Navigator
        initialRouteName={route.params?.initialRouteName}
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: { opacity: current.progress },
          }),
        }}>
        <Stack.Screen name="ChargingCheck" component={ChargingCheck} />
        <Stack.Screen name="PreArea" component={PreArea} />
        <Stack.Screen name="PreWiFiForm" component={PreWiFiForm} />
        <Stack.Screen name="WiFiForm">
          {({ navigation }) => (
            <WiFiForm navigation={navigation} ref={wifiFormRef} />
          )}
        </Stack.Screen>
        <Stack.Screen name="RegisterProfileFirst">
          {({ navigation }) => (
            <RegisterProfileFirst
              navigation={navigation}
              ref={registerProfileFirstRef}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="RegisterProfileSecond">
          {({ navigation }) => (
            <RegisterProfileSecond
              navigation={navigation}
              ref={registerProfileSecondRef}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </>
  );
};

export default BleWithHeaderStackNav;
