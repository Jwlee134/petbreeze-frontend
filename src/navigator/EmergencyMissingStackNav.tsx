import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import {
  createStackNavigator,
  StackCardInterpolationProps,
} from "@react-navigation/stack";
import React from "react";
import CustomHeader from "~/components/navigator/CustomHeader";
import EmergencyMissingFirstPage from "~/screens/emergencyMissingStackNav/EmergencyMissingFirstPage";
import EmergencyMissingSecondPage from "~/screens/emergencyMissingStackNav/EmergencyMissingSecondPage";
import {
  EmergencyMissingStackNavParamList,
  EmergencyMissingStackNavScreenProps,
} from "~/types/navigator";

const Stack = createStackNavigator<EmergencyMissingStackNavParamList>();

const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const EmergencyMissingStackNav = ({
  navigation,
  route,
}: EmergencyMissingStackNavScreenProps) => {
  const currentRouteName = getFocusedRouteNameFromRoute(route);

  return (
    <>
      <CustomHeader
        navigation={navigation}
        currentPage={currentRouteName === "EmergencyMissingSecondPage" ? 2 : 1}
        onBackButtonPress={() => {
          if (currentRouteName === "EmergencyMissingSecondPage") {
            navigation.replace("EmergencyMissingFirstPage");
          } else {
            navigation.goBack();
          }
        }}
        totalPage={2}>
        긴급실종
      </CustomHeader>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: forFade,
        }}>
        <Stack.Screen
          name="EmergencyMissingFirstPage"
          initialParams={{ device: route.params.data }}
          component={EmergencyMissingFirstPage}
        />
        <Stack.Screen
          name="EmergencyMissingSecondPage"
          component={EmergencyMissingSecondPage}
        />
      </Stack.Navigator>
    </>
  );
};

export default EmergencyMissingStackNav;
