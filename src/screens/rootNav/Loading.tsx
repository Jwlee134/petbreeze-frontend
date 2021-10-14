import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import LoadingComponent from "~/components/common/Loading";
import { navigatorActions } from "~/store/navigator";
import { LoadingScreenProps } from "~/types/navigator";
import { isIos } from "~/utils";
import messaging from "@react-native-firebase/messaging";
import * as SecureStore from "expo-secure-store";
import { useAppSelector } from "~/store";
import userApi from "~/api/user";

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
  const dispatch = useDispatch();

  useEffect(() => {
    const saveTokens = async (
      token: string,
      firebaseToken: string,
      userID: number,
    ) => {
      await Promise.all([
        SecureStore.setItemAsync("token", token),
        SecureStore.setItemAsync("firebaseToken", firebaseToken),
        SecureStore.setItemAsync("userID", userID.toString()),
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
          console.log(data);
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
        await updateNickname(nickname).unwrap();

        dispatch(
          navigatorActions.setInitialRoute({
            initialLoggedInNavRouteName:
              isIos && !isPermissionAllowed ? "Permissions" : "BleRootStackNav",
          }),
        );
        navigation.replace("LoggedInNav");
      } catch (error) {
        console.log(error);
        navigation.replace("Auth");
      }
    };

    signUp();
  }, []);

  return <LoadingComponent loadingText="Loading" />;
};

export default Loading;
