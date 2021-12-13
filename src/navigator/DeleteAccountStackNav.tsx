import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useRef } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import MyText from "~/components/common/MyText";
import CustomHeader from "~/components/navigator/CustomHeader";
import DeleteAccountFirstPage, {
  DeleteAccountFirstGoBack,
} from "~/screens/deleteAccountStackNav/DeleteAccountFirstPage";
import DeleteAccountSecondPage, {
  DeleteAccountSecondGoBack,
} from "~/screens/deleteAccountStackNav/DeleteAccountSecondPage";
import {
  DeleteAccountStackNavParamList,
  DeleteAccountStackNavScreenRouteProp,
} from "~/types/navigator";

const Stack = createNativeStackNavigator<DeleteAccountStackNavParamList>();

const DeleteAccountStackNav = ({
  route,
}: {
  route: DeleteAccountStackNavScreenRouteProp;
}) => {
  const currentRouteName = getFocusedRouteNameFromRoute(route);
  const deleteAccountFirstRef = useRef<DeleteAccountFirstGoBack>(null);
  const deleteAccountSecondRef = useRef<DeleteAccountSecondGoBack>(null);

  return (
    <>
      <CustomHeader
        title="탈퇴하기"
        onBackButtonPress={() => {
          if (currentRouteName === "DeleteAccountSecondPage") {
            deleteAccountSecondRef.current?.goBack();
          } else {
            deleteAccountFirstRef.current?.goBack();
          }
        }}
      />
      <TouchableWithoutFeedback
        style={StyleSheet.absoluteFill}
        onPress={Keyboard.dismiss}>
        <View>
          <MyText
            style={{ marginTop: 45, paddingLeft: 32 }}
            fontWeight="medium"
            fontSize={20}>
            펫브리즈를 탈퇴하시나요?
          </MyText>
          <MyText
            style={{
              marginTop: 10,
              paddingLeft: 32,
              marginBottom: 43,
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
        screenOptions={{ headerShown: false, animation: "fade" }}>
        <Stack.Screen name="DeleteAccountFirstPage">
          {({ navigation }) => (
            <DeleteAccountFirstPage
              ref={deleteAccountFirstRef}
              navigation={navigation}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="DeleteAccountSecondPage">
          {({ navigation }) => (
            <DeleteAccountSecondPage
              ref={deleteAccountSecondRef}
              navigation={navigation}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </>
  );
};

export default DeleteAccountStackNav;
