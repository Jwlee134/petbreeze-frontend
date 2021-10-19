import { store } from "~/store";
import { navigatorActions } from "~/store/navigator";

export default () => {
  const {
    init: { isPermissionAllowed },
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
  } else {
    store.dispatch(
      navigatorActions.setInitialRoute({
        initialLoggedInNavRouteName: "BottomTabNav",
        initialBottomTabNavRouteName: "HomeTab",
      }),
    );
  }
};
