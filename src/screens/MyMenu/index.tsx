import React from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { useAppSelector } from "~/store";
import { MyMenuScreenNavigationProp } from "~/types/navigator";
import AuthSelector from "../Shared/AuthSelector";

const Container = styled.View``;

const MyMenu = ({ navigation }: { navigation: MyMenuScreenNavigationProp }) => {
  const { isLoggedIn } = useAppSelector(state => state.user);

  if (!isLoggedIn) return <AuthSelector />;

  return (
    <Container>
      <Text>MyMenu</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("DeviceSettingStackNav")}>
        <Text>기기 환경설정</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("PetProfile")}>
        <Text>반려동물 프로필</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("PassManagement")}>
        <Text>이용권 관리</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("ServiceCenter")}>
        <Text>고객센터</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("NotificationSetting")}>
        <Text>알림 설정</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>로그아웃</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("DeleteAccount")}>
        <Text>탈퇴하기</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("MyPost")}>
        <Text>내가 쓴 게시물</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SavedPost")}>
        <Text>저장한 게시물</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default MyMenu;
