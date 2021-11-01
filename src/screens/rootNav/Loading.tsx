import React, { useEffect } from "react";
import LoadingComponent from "~/components/common/Loading";
import { LoadingScreenProps } from "~/types/navigator";
import { isIos } from "~/utils";
import messaging from "@react-native-firebase/messaging";
import * as SecureStore from "expo-secure-store";
import { useAppSelector } from "~/store";
import userApi from "~/api/user";
import { secureItems } from "~/constants";

const Loading = ({
  navigation,
  route: {
    params: { token, userID, nickname },
  },
}: LoadingScreenProps) => {
  const { isPermissionAllowed } = useAppSelector(state => state.storage.init);
  const [postFacebookUser] = userApi.useFacebookLoginMutation();
  const [postKakaoUser] = userApi.useKakaoLoginMutation();
  const [updateNickname] = userApi.useUpdateNicknameMutation();

  useEffect(() => {
    const saveTokens = async (
      token: string,
      firebaseToken: string,
      userID: number,
    ) => {
      await Promise.all([
        SecureStore.setItemAsync(secureItems.token, token),
        SecureStore.setItemAsync(secureItems.firebaseToken, firebaseToken),
        SecureStore.setItemAsync(secureItems.userID, userID.toString()),
      ]);
    };

    const signUp = async () => {
      try {
        const firebaseToken = await messaging().getToken();
        if (userID) {
          const data = await postFacebookUser({
            accessToken: token,
            firebaseToken,
            userID,
          }).unwrap();
          console.log(data.key, firebaseToken, data.user_id);
          await saveTokens(data.key, firebaseToken, data.user_id);
        } else {
          const { key, user_id } = await postKakaoUser({
            accessToken: token,
            firebaseToken,
          }).unwrap();
          console.log(key, firebaseToken, user_id);
          await saveTokens(key, firebaseToken, user_id);
        }
      } catch {
        navigation.replace("Auth");
        return;
      }
      await updateNickname(nickname);

      navigation.replace("LoggedInNav", {
        initialRouteName:
          isIos && !isPermissionAllowed ? "Permissions" : "BleRootStackNav",
        initialBleWithHeaderStackNavRouteName: "DeviceCheck",
      });
    };

    signUp();
  }, []);

  return <LoadingComponent loadingText="Loading" />;
};

export default Loading;
