import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";

const MyPage = () => {
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <TouchableOpacity>
        <Text onPress={() => dispatch(storageActions.logout())}>로그아웃</Text>
      </TouchableOpacity>
      {/* <CategoryTitle>디바이스 관리</CategoryTitle>
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
        </ListItem> */}
    </ScrollView>
  );
};

export default MyPage;
