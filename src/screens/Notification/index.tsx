import React from "react";
import { NotificationScreenNavigationProp } from "~/types/navigator";
import useModal from "~/hooks/useModal";

import Modal from "react-native-modal";
import NotificationModal from "~/components/modal/NotificationModal";
import NothingToShowContainer from "~/components/common/container/NothingToShowContainer";
import { useLayoutEffect } from "react";
import HeaderRightButton from "~/components/common/button/HeaderRightButton";

const Notification = ({
  navigation,
}: {
  navigation: NotificationScreenNavigationProp;
}) => {
  const { open, modalProps, CenterModalComponent } = useModal({
    type: "center",
  });

  /*   useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRightButton open={open} />,
    });
  }, []); */

  return (
    <>
      <Modal {...modalProps}>
        <CenterModalComponent headerTitle="알림">
          <NotificationModal />
        </CenterModalComponent>
      </Modal>
    </>
  );
};

export default Notification;
