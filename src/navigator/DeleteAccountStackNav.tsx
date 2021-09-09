import {
  createStackNavigator,
  StackCardInterpolationProps,
} from "@react-navigation/stack";
import React from "react";
import MyText from "~/components/common/MyText";
import DeleteAccountFirstPage from "~/screens/deleteAccountStackNav/DeleteAccountFirstPage";
import DeleteAccountSecondPage from "~/screens/deleteAccountStackNav/DeleteAccountSecondPage";
import { rpWidth } from "~/styles";

const Stack = createStackNavigator();

const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const DeleteAccountStackNav = () => {
  return (
    <>
      <MyText
        style={{ marginTop: rpWidth(45), paddingLeft: rpWidth(32) }}
        fontWeight="medium"
        fontSize={20}>
        어디개를 탈퇴하시나요?
      </MyText>
      <Stack.Navigator
        screenOptions={{ cardStyleInterpolator: forFade, headerShown: false }}>
        <Stack.Screen
          name="DeleteAccountFirstPage"
          component={DeleteAccountFirstPage}
        />
        <Stack.Screen
          name="DeleteAccountSecondPage"
          component={DeleteAccountSecondPage}
        />
      </Stack.Navigator>
    </>
  );
};

export default DeleteAccountStackNav;
