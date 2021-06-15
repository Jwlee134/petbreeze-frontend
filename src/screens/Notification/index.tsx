import React from "react";
import { useAppSelector } from "~/store";
import styled from "styled-components/native";
import { NotificationScreenNavigationProp } from "~/types/navigator";
import AuthSelector from "../Shared/AuthSelector";
import Ionicons from "react-native-vector-icons/Ionicons";
import SafeAreaContainer from "~/components/common/container/SafeAreaContainer";
import CustomHeader from "~/components/common/CustomHeader";
import useModal from "~/hooks/useModal";

import Modal from "react-native-modal";
import NotificationModal from "~/components/modal/NotificationModal";
import palette from "~/styles/palette";
import NothingToShowContainer from "~/components/common/container/NothingToShowContainer";

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 20px;
  text-align: center;
  line-height: 25px;
`;

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
          size="small"
          style={{ borderBottomWidth: 1, borderBottomColor: palette.gray_e5 }}>
          알림
        </CustomHeader>
        <NothingToShowContainer style={{ fontSize: 20 }}>
          수신된 알림이 없어요!{"\n"}관심있는 게시물을 저장하고{"\n"}
          업데이트 알림을 받아보세요.
        </NothingToShowContainer>
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
