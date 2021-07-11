import React from "react";
import { Linking, ScrollView } from "react-native";
import CategoryTitle from "~/components/common/CategoryTitle";
import ListItem from "~/components/common/ListItem";
import { MyPageScreenNavigationProp } from "~/types/navigator";
import useModal from "~/hooks/useModal";

import Modal from "react-native-modal";
import SimpleToggleModal from "~/components/modal/SimpleToggleModal";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";

const size = 22;

const MyPage = ({ navigation }: { navigation: MyPageScreenNavigationProp }) => {
  const dispatch = useDispatch();

  const { open, close, modalProps, CenterModalComponent } = useModal({
    type: "center",
  });

  return (
    <>
      <ScrollView>
        <CategoryTitle>디바이스 관리</CategoryTitle>
        <ListItem onPress={() => navigation.navigate("DeviceSetting")}>
          환경설정
        </ListItem>
        <ListItem onPress={() => navigation.navigate("PetProfile")}>
          반려동물 프로필
        </ListItem>
        <ListItem onPress={() => navigation.navigate("PassManagement")}>
          이용권 관리
        </ListItem>
        <ListItem
          onPress={() => {
            Linking.openURL("http://pf.kakao.com/_xbxlxkFK");
          }}
          isLastItem>
          고객센터
        </ListItem>
        <CategoryTitle>계정 관리</CategoryTitle>
        <ListItem onPress={() => navigation.navigate("NotificationSetting")}>
          알림 설정
        </ListItem>
        <ListItem onPress={open}>로그아웃</ListItem>
        <ListItem
          onPress={() => navigation.navigate("DeleteAccount")}
          isLastItem>
          탈퇴
        </ListItem>
        <CategoryTitle>나의 활동내역</CategoryTitle>
        <ListItem onPress={() => navigation.navigate("MyPost")}>
          내가 쓴 게시물
        </ListItem>
        <ListItem onPress={() => navigation.navigate("SavedPost")}>
          저장한 게시물
        </ListItem>
      </ScrollView>
      <Modal {...modalProps}>
        <CenterModalComponent>
          <SimpleToggleModal
            onConfirmText="정말 로그아웃하시겠습니까?"
            onConfirmButtonText="로그아웃"
            onConfirm={() => {
              close();
              setTimeout(() => {
                dispatch(storageActions.logout());
                navigation.navigate("Home");
              }, 400);
            }}
            onAbort={close}
          />
        </CenterModalComponent>
      </Modal>
    </>
  );
};

export default MyPage;
