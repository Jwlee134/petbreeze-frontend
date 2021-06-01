import React from "react";
import { useAppSelector } from "~/store";
import { NotificationScreenNavigationProp } from "~/types/navigator";
import AuthSelector from "../Shared/AuthSelector";
import Ionicons from "react-native-vector-icons/Ionicons";
import SafeAreaContainer from "~/components/common/container/SafeAreaContainer";
import CustomHeader from "~/components/common/CustomHeader";
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
        <CustomHeader
          RightIcon={() => (
            <Ionicons name="information-circle-outline" size={26} />
          )}
          RightIconOnPress={open}
          size="small">
          알림
        </CustomHeader>
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
