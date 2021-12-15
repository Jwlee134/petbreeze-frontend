import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import deviceApi from "~/api/device";
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
  const [getMissingInfo, { data }] = deviceApi.useLazyGetMissingReportQuery();
  const missingReportFirstRef = useRef<MissingReportFirstGoBack>(null);
  const missingReportSecondRef = useRef<MissingReportSecondGoBack>(null);

  const {
    params: { name, avatar, deviceID, isModify },
  } = route;

  useEffect(() => {
    if (data) {
      const {
        emergency_key,
        contact_number,
        has_dog_tag,
        missing_datetime,
        missing_location,
        message,
        image1_thumbnail: one,
        image2_thumbnail: two,
        image3_thumbnail: three,
        image4_thumbnail: four,
      } = data;
      const photoArr = [one, two, three, four].filter(
        photo => photo !== null && photo.length !== 0,
      );
      dispatch(
        formActions.setState({
          emergencyKey: emergency_key,
          hasTag: has_dog_tag,
          phoneNumber: contact_number,
          lostPlace: missing_location,
          message,
          lostMonth: new Date(missing_datetime).getMonth() + 1,
          lostHour: new Date(missing_datetime).getHours(),
          lostDate: new Date(missing_datetime).getDate(),
          lostMinute: new Date(missing_datetime).getMinutes(),
          photos: photoArr,
        }),
      );
    }
  }, [data]);

  useEffect(() => {
    if (isModify) {
      getMissingInfo(deviceID);
    }
  }, [isModify]);

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
