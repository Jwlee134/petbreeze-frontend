import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import deviceApi from "~/api/device";
import CustomHeader from "~/components/navigator/CustomHeader";
import EmergencyMissingFirstPage, {
  EmergencyMissingFirstGoBack,
} from "~/screens/emergencyMissingStackNav/EmergencyMissingFirstPage";
import EmergencyMissingSecondPage, {
  EmergencyMissingSecondGoBack,
} from "~/screens/emergencyMissingStackNav/EmergencyMissingSecondPage";
import { formActions } from "~/store/form";
import {
  EmergencyMissingStackNavParamList,
  EmergencyMissingStackNavScreenRouteProp,
} from "~/types/navigator";

const Stack = createNativeStackNavigator<EmergencyMissingStackNavParamList>();

const EmergencyMissingStackNav = ({
  route,
}: {
  route: EmergencyMissingStackNavScreenRouteProp;
}) => {
  const currentRouteName = getFocusedRouteNameFromRoute(route);
  const dispatch = useDispatch();
  const [getMissingInfo, { data }] =
    deviceApi.useLazyGetEmergencyMissingQuery();
  const emergencyMissingFirstRef = useRef<EmergencyMissingFirstGoBack>(null);
  const emergencyMissingSecondRef = useRef<EmergencyMissingSecondGoBack>(null);

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
        currentPage={currentRouteName === "EmergencyMissingSecondPage" ? 2 : 1}
        onBackButtonPress={() => {
          if (currentRouteName === "EmergencyMissingSecondPage") {
            emergencyMissingSecondRef.current?.goBack();
          } else {
            emergencyMissingFirstRef.current?.goBack();
          }
        }}
        totalPage={2}
      />
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: "fade" }}>
        <Stack.Screen name="EmergencyMissingFirstPage">
          {props => (
            <EmergencyMissingFirstPage
              name={name}
              avatar={avatar}
              ref={emergencyMissingFirstRef}
              {...props}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="EmergencyMissingSecondPage">
          {props => (
            <EmergencyMissingSecondPage
              ref={emergencyMissingSecondRef}
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

export default EmergencyMissingStackNav;
