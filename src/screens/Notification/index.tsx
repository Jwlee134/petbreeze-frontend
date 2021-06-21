import React from "react";
import { useAppSelector } from "~/store";
import { NotificationScreenNavigationProp } from "~/types/navigator";
import AuthSelector from "../Shared/AuthSelector";
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
  const { isLoggedIn } = useAppSelector(state => state.user);

  const { open, modalProps, CenterModalComponent } = useModal({
    type: "center",
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRightButton open={open} />,
    });
  }, []);

  if (!isLoggedIn) return <AuthSelector />;

  return (
    <>
      <NothingToShowContainer style={{ fontSize: 20 }}>
        수신된 알림이 없어요!{"\n"}관심있는 게시물을 저장하고{"\n"}
        업데이트 알림을 받아보세요.
      </NothingToShowContainer>
      <Modal {...modalProps}>
        <CenterModalComponent headerTitle="알림">
          <NotificationModal />
        </CenterModalComponent>
      </Modal>
    </>
  );
};

export default Notification;
