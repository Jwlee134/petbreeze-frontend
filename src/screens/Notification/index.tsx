import React from "react";
import { useAppSelector } from "~/store";
import styled from "styled-components/native";
import { NotificationScreenNavigationProp } from "~/types/navigator";
import AuthSelector from "../Shared/AuthSelector";
import Ionicons from "react-native-vector-icons/Ionicons";
import useModal from "~/hooks/useModal";

import Modal from "react-native-modal";
import NotificationModal from "~/components/modal/NotificationModal";
import palette from "~/styles/palette";
import NothingToShowContainer from "~/components/common/container/NothingToShowContainer";
import { useLayoutEffect } from "react";
import { TouchableOpacity } from "react-native";

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 25 }} onPress={open}>
          <Ionicons name="information-circle-outline" size={26} />
        </TouchableOpacity>
      ),
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
