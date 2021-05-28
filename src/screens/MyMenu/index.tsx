import React from "react";
import { ScrollView } from "react-native";
import CategoryTitle from "~/components/common/CategoryTitle";
import ListItem from "~/components/common/ListItem";
import SafeAreaContainer from "~/components/common/container/SafeAreaContainer";
import CustomHeader from "~/components/common/CustomHeader";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";
import { useAppSelector } from "~/store";
import { MyMenuScreenNavigationProp } from "~/types/navigator";
import AuthSelector from "../Shared/AuthSelector";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import useModal from "~/hooks/useModal";

import Modal from "react-native-modal";
import LogoutModal from "~/components/modal/LogoutModal";
import { useDispatch } from "react-redux";
import { userActions } from "~/store/user";

const size = 22;

const MyMenu = ({ navigation }: { navigation: MyMenuScreenNavigationProp }) => {
  const { isLoggedIn } = useAppSelector(state => state.user);

  const dispatch = useDispatch();

  const RightIcon = () => <Feather name="chevron-right" size={30} />;

  const { open, close, modalProps, CenterModalComponent } = useModal({
    type: "center",
  });

  if (!isLoggedIn) return <AuthSelector />;

  return (
    <>
      <SafeAreaContainer>
        <ScrollView style={{ height: "100%" }}>
          <CustomHeader size="small">My Menu</CustomHeader>
          <CategoryTitle>디바이스 관리</CategoryTitle>
          <SidePaddingContainer>
            <ListItem
              onPress={() => navigation.navigate("DeviceSettingStackNav")}
              LeftIcon={() => <Ionicons name="settings-sharp" size={size} />}
              RightIcon={() => <RightIcon />}>
              환경설정
            </ListItem>
            <ListItem
              onPress={() => navigation.navigate("PetProfile")}
              LeftIcon={() => <Ionicons name="person-outline" size={size} />}
              RightIcon={() => <RightIcon />}>
              반려동물 프로필
            </ListItem>
            <ListItem
              onPress={() => navigation.navigate("PassManagement")}
              LeftIcon={() => <Ionicons name="card-outline" size={size} />}
              RightIcon={() => <RightIcon />}>
              이용권 관리
            </ListItem>
            <ListItem
              onPress={() => navigation.navigate("ServiceCenter")}
              LeftIcon={() => (
                <Ionicons name="chatbox-ellipses-outline" size={size} />
              )}
              RightIcon={() => <RightIcon />}
              isLastItem>
              고객센터
            </ListItem>
          </SidePaddingContainer>
          <CategoryTitle>계정 관리</CategoryTitle>
          <SidePaddingContainer>
            <ListItem
              onPress={() => navigation.navigate("NotificationSetting")}
              LeftIcon={() => (
                <MaterialCommunityIcons name="bell-outline" size={size} />
              )}
              RightIcon={() => <RightIcon />}>
              알림 설정
            </ListItem>
            <ListItem
              onPress={open}
              LeftIcon={() => (
                <Ionicons name="remove-circle-outline" size={size} />
              )}
              RightIcon={() => <RightIcon />}>
              로그아웃
            </ListItem>
            <ListItem
              onPress={() => navigation.navigate("DeleteAccount")}
              LeftIcon={() => (
                <Ionicons name="close-circle-outline" size={size} />
              )}
              RightIcon={() => <RightIcon />}
              isLastItem>
              탈퇴
            </ListItem>
          </SidePaddingContainer>
          <CategoryTitle>나의 활동내역</CategoryTitle>
          <SidePaddingContainer>
            <ListItem
              onPress={() => navigation.navigate("MyPost")}
              LeftIcon={() => (
                <MaterialCommunityIcons name="pencil" size={size} />
              )}
              RightIcon={() => <RightIcon />}>
              내가 쓴 게시물
            </ListItem>
            <ListItem
              onPress={() => navigation.navigate("SavedPost")}
              LeftIcon={() => (
                <MaterialCommunityIcons name="heart" size={size} />
              )}
              RightIcon={() => <RightIcon />}
              isLastItem>
              저장한 게시물
            </ListItem>
          </SidePaddingContainer>
        </ScrollView>
      </SafeAreaContainer>
      <Modal {...modalProps}>
        <CenterModalComponent>
          <LogoutModal
            onLogout={() => {
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

export default MyMenu;
