import React from "react";
import { useAppSelector } from "~/store";
import { NotificationScreenNavigationProp } from "~/types/navigator";
import AuthSelector from "../Shared/AuthSelector";
import Ionicons from "react-native-vector-icons/Ionicons";
import SafeAreaContainer from "~/components/common/SafeAreaContainer";
import ScreenHeader from "~/components/common/ScreenHeader";
import useModal from "~/hooks/useModal";

import Modal from "react-native-modal";
import NotificationModal from "~/components/modal/NotificationModal";

const Notification = ({
  navigation,
}: {
  navigation: NotificationScreenNavigationProp;
}) => {
  const { isLoggedIn } = useAppSelector(state => state.user);

  const { open, modalProps, CenterModalComponent } = useModal({
    type: "center",
  });

  if (!isLoggedIn) return <AuthSelector />;

  return (
    <>
      <SafeAreaContainer>
        <ScreenHeader
          RightIcon={() => (
            <Ionicons
              name="information-circle-outline"
              size={26}
              onPress={open}
            />
          )}
          size="small">
          알림
        </ScreenHeader>
      </SafeAreaContainer>
      <Modal {...modalProps}>
        <CenterModalComponent headerTitle="알림">
          <NotificationModal />
        </CenterModalComponent>
      </Modal>
    </>
  );
};

export default Notification;
