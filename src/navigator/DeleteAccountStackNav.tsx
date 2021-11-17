import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import {
  createStackNavigator,
  StackCardInterpolationProps,
} from "@react-navigation/stack";
import React, { useContext } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import MyText from "~/components/common/MyText";
import CustomHeader from "~/components/navigator/CustomHeader";
import { DimensionsContext } from "~/context/DimensionsContext";
import DeleteAccountFirstPage from "~/screens/deleteAccountStackNav/DeleteAccountFirstPage";
import DeleteAccountSecondPage from "~/screens/deleteAccountStackNav/DeleteAccountSecondPage";
import {
  DeleteAccountStackNavParamList,
  DeleteAccountStackNavScreenNavigationProp,
  DeleteAccountStackNavScreenRouteProp,
} from "~/types/navigator";

const Stack = createStackNavigator<DeleteAccountStackNavParamList>();

const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const DeleteAccountStackNav = ({
  navigation,
  route,
}: {
  navigation: DeleteAccountStackNavScreenNavigationProp;
  route: DeleteAccountStackNavScreenRouteProp;
}) => {
  const currentRouteName = getFocusedRouteNameFromRoute(route);
  const { rpWidth, rpHeight } = useContext(DimensionsContext);

  return (
    <>
      <CustomHeader
        navigation={navigation}
        onBackButtonPress={() => {
          if (currentRouteName === "DeleteAccountSecondPage") {
            navigation.replace("DeleteAccountFirstPage");
          } else {
            navigation.goBack();
          }
        }}>
        탈퇴하기
      </CustomHeader>
      <TouchableWithoutFeedback
        style={StyleSheet.absoluteFill}
        onPress={Keyboard.dismiss}>
        <View>
          <MyText
            style={{ marginTop: rpHeight(45), paddingLeft: rpWidth(32) }}
            fontWeight="medium"
            fontSize={20}>
            펫브리즈를 탈퇴하시나요?
          </MyText>
          <MyText
            style={{
              marginTop: rpHeight(10),
              paddingLeft: rpWidth(32),
              marginBottom: rpHeight(43),
            }}
            color="rgba(0, 0, 0, 0.5)"
            fontSize={14}>
            {currentRouteName === "DeleteAccountSecondPage"
              ? "탈퇴 전 아래 유의사항을 확인해주세요."
              : "탈퇴 이유를 말씀해주세요."}
          </MyText>
        </View>
      </TouchableWithoutFeedback>
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator: forFade,
          headerShown: false,
        }}>
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
