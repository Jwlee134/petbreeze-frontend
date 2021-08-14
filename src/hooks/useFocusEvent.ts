import { useNavigation, useRoute } from "@react-navigation/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { commonActions } from "~/store/common";

const useFocusEvent = ({ isTab = false } = {}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (isTab) {
        dispatch(commonActions.setCurrentTabName(route.name));
      } else {
        dispatch(commonActions.setCurrentRouteName(route.name));
      }
    });
    return unsubscribe;
  }, [navigation]);
};

export default useFocusEvent;
