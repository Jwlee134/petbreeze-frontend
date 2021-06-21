import React from "react";
import { Linking, ScrollView } from "react-native";
import CategoryTitle from "~/components/common/CategoryTitle";
import ListItem from "~/components/common/ListItem";
import { useAppSelector } from "~/store";
import { MyPageScreenNavigationProp } from "~/types/navigator";
import AuthSelector from "../Shared/AuthSelector";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import useModal from "~/hooks/useModal";

import Modal from "react-native-modal";
import SimpleToggleModal from "~/components/modal/SimpleToggleModal";
import { useDispatch } from "react-redux";
import { userActions } from "~/store/user";

const size = 22;

const MyPage = ({ navigation }: { navigation: MyPageScreenNavigationProp }) => {
  const { isLoggedIn } = useAppSelector(state => state.user);

  const dispatch = useDispatch();

  const { open, close, modalProps, CenterModalComponent } = useModal({
    type: "center",
  });

  if (!isLoggedIn) return <AuthSelector />;

  return (
    <>
      <ScrollView>
        <CategoryTitle>디바이스 관리</CategoryTitle>
        <ListItem
          onPress={() => navigation.navigate("DeviceSetting")}
          LeftIcon={() => <Ionicons name="settings-sharp" size={size} />}>
          환경설정
        </ListItem>
        <ListItem
          onPress={() => navigation.navigate("PetProfile")}
          LeftIcon={() => <Ionicons name="person-outline" size={size} />}>
          반려동물 프로필
        </ListItem>
        <ListItem
          onPress={() => navigation.navigate("PassManagement")}
          LeftIcon={() => <Ionicons name="card-outline" size={size} />}>
          이용권 관리
        </ListItem>
        <ListItem
          onPress={() => {
            Linking.openURL("http://pf.kakao.com/_xbxlxkFK");
          }}
          LeftIcon={() => (
            <Ionicons name="chatbox-ellipses-outline" size={size} />
          )}
          isLastItem>
          고객센터
        </ListItem>
        <CategoryTitle>계정 관리</CategoryTitle>
        <ListItem
          onPress={() => navigation.navigate("NotificationSetting")}
          LeftIcon={() => (
            <MaterialCommunityIcons name="bell-outline" size={size} />
          )}>
          알림 설정
        </ListItem>
        <ListItem
          onPress={open}
          LeftIcon={() => (
            <Ionicons name="remove-circle-outline" size={size} />
          )}>
          로그아웃
        </ListItem>
        <ListItem
          onPress={() => navigation.navigate("DeleteAccount")}
          LeftIcon={() => <Ionicons name="close-circle-outline" size={size} />}
          isLastItem>
          탈퇴
        </ListItem>
        <CategoryTitle>나의 활동내역</CategoryTitle>
        <ListItem
          onPress={() => navigation.navigate("MyPost")}
          LeftIcon={() => <MaterialCommunityIcons name="pencil" size={size} />}>
          내가 쓴 게시물
        </ListItem>
        <ListItem
          onPress={() => navigation.navigate("SavedPost")}
          LeftIcon={() => <MaterialCommunityIcons name="heart" size={size} />}>
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
                dispatch(userActions.logout());
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
