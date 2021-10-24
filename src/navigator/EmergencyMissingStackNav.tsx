import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import {
  createStackNavigator,
  StackCardInterpolationProps,
} from "@react-navigation/stack";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import CustomHeader from "~/components/navigator/CustomHeader";
import EmergencyMissingFirstPage from "~/screens/emergencyMissingStackNav/EmergencyMissingFirstPage";
import EmergencyMissingSecondPage from "~/screens/emergencyMissingStackNav/EmergencyMissingSecondPage";
import { deviceSettingActions } from "~/store/deviceSetting";
import {
  EmergencyMissingStackNavParamList,
  EmergencyMissingStackNavScreenNavigationProp,
  EmergencyMissingStackNavScreenRouteProp,
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
}: {
  navigation: EmergencyMissingStackNavScreenNavigationProp;
  route: EmergencyMissingStackNavScreenRouteProp;
}) => {
  const currentRouteName = getFocusedRouteNameFromRoute(route);
  const dispatch = useDispatch();

  const {
    params: { name, avatar, deviceID },
  } = route;

  useEffect(() => {
    return () => {
      dispatch(deviceSettingActions.setProfile(null));
    };
  }, []);

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
        <Stack.Screen name="EmergencyMissingFirstPage">
          {props => (
            <EmergencyMissingFirstPage name={name} avatar={avatar} {...props} />
          )}
        </Stack.Screen>
        <Stack.Screen name="EmergencyMissingSecondPage">
          {props => (
            <EmergencyMissingSecondPage deviceID={deviceID} {...props} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </>
  );
};

export default EmergencyMissingStackNav;
