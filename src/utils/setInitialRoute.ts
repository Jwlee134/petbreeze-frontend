import { store } from "~/store";
import { navigatorActions } from "~/store/navigator";

export default () => {
  const {
    init: { isPermissionAllowed, isInitialized },
    device: { isDeviceRegistered, isSafetyZoneRegistered, isProfileRegistered },
    walk: { coords },
  } = store.getState().storage;
  if (!isPermissionAllowed) {
    store.dispatch(
      navigatorActions.setInitialRoute({
        initialLoggedInNavRouteName: "Permissions",
      }),
    );
  } else if (coords.length) {
    store.dispatch(
      navigatorActions.setInitialRoute({
        initialLoggedInNavRouteName: "WalkMap",
      }),
    );
  } else if (isDeviceRegistered) {
    if (!isSafetyZoneRegistered) {
      store.dispatch(
        navigatorActions.setInitialRoute({
          initialLoggedInNavRouteName: "BleRootStackNav",
          initialBleWithHeaderStackNavRouteName: "PreSafetyZone",
        }),
      );
    } else if (!isProfileRegistered) {
      store.dispatch(
        navigatorActions.setInitialRoute({
          initialLoggedInNavRouteName: "BleRootStackNav",
          initialBleWithHeaderStackNavRouteName: "RegisterProfileFirst",
        }),
      );
    }
  } else if (!isInitialized) {
    store.dispatch(
      navigatorActions.setInitialRoute({
        initialLoggedInNavRouteName: "BleRootStackNav",
      }),
    );
  } else {
    store.dispatch(
      navigatorActions.setInitialRoute({
        initialLoggedInNavRouteName: "BottomTabNav",
        initialBottomTabNavRouteName: "HomeTab",
      }),
    );
  }
};
