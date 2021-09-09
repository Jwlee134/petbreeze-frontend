import React from "react";
import { NotificationScreenNavigationProp } from "~/types/navigator";
import useModal from "~/hooks/useModal";

import Modal from "react-native-modal";
import NotificationModal from "~/components/modal/NotificationModal";
import { useLayoutEffect } from "react";
import HeaderRightButton from "~/components/common/button/HeaderRightButton";

const Notification = ({
  navigation,
}: {
  navigation: NotificationScreenNavigationProp;
}) => {
  /*   useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRightButton open={open} />,
    });
  }, []); */

  return <></>;
};

export default Notification;
