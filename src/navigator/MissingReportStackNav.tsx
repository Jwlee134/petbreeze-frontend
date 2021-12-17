import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import CustomHeader from "~/components/navigator/CustomHeader";
import MissingReportFirstPage, {
  MissingReportFirstGoBack,
} from "~/screens/missingReportStackNav/MissingReportFirstPage";
import MissingReportSecondPage, {
  MissingReportSecondGoBack,
} from "~/screens/missingReportStackNav/MissingReportSecondPage";
import { formActions } from "~/store/form";
import {
  MissingReportStackNavParamList,
  MissingReportStackNavScreenRouteProp,
} from "~/types/navigator";

const Stack = createStackNavigator<MissingReportStackNavParamList>();

const MissingReportStackNav = ({
  route,
}: {
  route: MissingReportStackNavScreenRouteProp;
}) => {
  const currentRouteName = getFocusedRouteNameFromRoute(route);
  const dispatch = useDispatch();
  const missingReportFirstRef = useRef<MissingReportFirstGoBack>(null);
  const missingReportSecondRef = useRef<MissingReportSecondGoBack>(null);

  const {
    params: { name, avatar, deviceID, isModify },
  } = route;

  useEffect(() => {
    return () => {
      dispatch(formActions.setState(null));
    };
  }, []);

  return (
    <>
      <CustomHeader
        title="실종신고"
        currentPage={currentRouteName === "MissingReportSecondPage" ? 2 : 1}
        onBackButtonPress={() => {
          if (currentRouteName === "MissingReportSecondPage") {
            missingReportSecondRef.current?.goBack();
          } else {
            missingReportFirstRef.current?.goBack();
          }
        }}
        totalPage={2}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: { opacity: current.progress },
          }),
        }}>
        <Stack.Screen name="MissingReportFirstPage">
          {props => (
            <MissingReportFirstPage
              name={name}
              avatar={avatar}
              ref={missingReportFirstRef}
              {...props}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="MissingReportSecondPage">
          {props => (
            <MissingReportSecondPage
              ref={missingReportSecondRef}
              name={name}
              avatar={avatar}
              deviceID={deviceID}
              isModify={isModify}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </>
  );
};

export default MissingReportStackNav;
