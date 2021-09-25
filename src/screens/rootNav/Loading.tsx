import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import LoadingComponent from "~/components/common/Loading";
import { navigatorActions } from "~/store/navigator";
import { LoadingScreenProps } from "~/types/navigator";
import { isIos } from "~/utils";
import messaging from "@react-native-firebase/messaging";

const Loading = ({
  navigation,
  route: {
    params: { previousRouteName },
  },
}: LoadingScreenProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (previousRouteName === "Auth") {
      messaging()
        .getToken()
        .then(token => {
          console.log(token);
          dispatch(
            navigatorActions.setInitialRoute({
              initialLoggedInNavRouteName: isIos
                ? "Permissions"
                : "BleRootStackNav",
            }),
          );
          navigation.replace("LoggedInNav");
        });
    }
  }, []);

  return <LoadingComponent loadingText="Loading" />;
};

export default Loading;
