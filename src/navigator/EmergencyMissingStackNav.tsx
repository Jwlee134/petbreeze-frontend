import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import {
  createStackNavigator,
  StackCardInterpolationProps,
} from "@react-navigation/stack";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import deviceApi from "~/api/device";
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
  const [getMissingInfo, { data }] =
    deviceApi.useLazyGetEmergencyMissingQuery();

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
        deviceSettingActions.setProfile({
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
            <EmergencyMissingSecondPage
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
