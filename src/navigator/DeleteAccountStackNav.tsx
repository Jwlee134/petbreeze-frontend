import {
  createStackNavigator,
  StackCardInterpolationProps,
} from "@react-navigation/stack";
import React, { useContext } from "react";
import MyText from "~/components/common/MyText";
import { DimensionsContext } from "~/context/DimensionsContext";
import DeleteAccountFirstPage from "~/screens/deleteAccountStackNav/DeleteAccountFirstPage";
import DeleteAccountSecondPage from "~/screens/deleteAccountStackNav/DeleteAccountSecondPage";
import { DeleteAccountStackNavParamList } from "~/types/navigator";

const Stack = createStackNavigator<DeleteAccountStackNavParamList>();

const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const DeleteAccountStackNav = () => {
  const { rpWidth } = useContext(DimensionsContext);

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
