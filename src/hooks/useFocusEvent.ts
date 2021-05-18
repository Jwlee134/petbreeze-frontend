import { useNavigation, useRoute } from "@react-navigation/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { commonActions } from "~/store/common";

const useFocusEvent = ({ isHomeTab = false } = {}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (isHomeTab) {
        dispatch(
          commonActions.setCurrentHomeTab(route.name as "Lost" | "Witnessed"),
        );
      } else {
        dispatch(commonActions.setCurrentRouteName(route.name));
      }
    });
    return unsubscribe;
  }, [navigation]);
};

export default useFocusEvent;
