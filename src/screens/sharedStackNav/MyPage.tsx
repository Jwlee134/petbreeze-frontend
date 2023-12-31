import React, { useState } from "react";
import { ScrollView, useWindowDimensions } from "react-native";
import MyText from "~/components/common/MyText";
import styled from "styled-components/native";
import Setting from "~/assets/svg/myPage/setting.svg";
import Bell from "~/assets/svg/myPage/bell.svg";
import Tag from "~/assets/svg/myPage/name-tag-black.svg";
import { MyPageScreenNavigationProp } from "~/types/navigator";
import MyPageDeviceList from "~/components/myPage/MyPageDeviceList";
import useModal from "~/hooks/useModal";
import CommonCenterModal from "~/components/modal/CommonCenterModal";
import Divider from "~/components/common/Divider";
import * as SecureStore from "expo-secure-store";
import { CENTER_MODAL_OUT_TIMING } from "~/styles/constants";
import { resetAll } from "~/utils";
import { SECURE_ITEMS } from "~/constants";
import useDevice from "~/hooks/useDevice";
import userApi from "~/api/user";

const Button = styled.TouchableOpacity<{ isLast?: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 54px;
  padding-right: 32px;
  padding-left: 17px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SvgContainer = styled.View`
  width: 49px;
  align-items: center;
`;

const MyPage = ({ navigation }: { navigation: MyPageScreenNavigationProp }) => {
  const deviceList = useDevice();
  const { open, close, modalProps } = useModal();
  const { width } = useWindowDimensions();
  const [logout] = userApi.useLogoutMutation();
  const [isLoading, setIsLoading] = useState(false);

  const onLogout = async () => {
    try {
      setIsLoading(true);
      const fbToken = await SecureStore.getItemAsync(
        SECURE_ITEMS.FIREBASE_TOKEN,
      );
      await logout(fbToken as string).unwrap();
      resetAll();
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Start" }],
        });
      }, CENTER_MODAL_OUT_TIMING);
      close();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ScrollView>
        <MyPageDeviceList deviceList={deviceList} />
        <Divider isHairline={false} style={{ marginBottom: 10 }} />
        <Button
          disabled={!deviceList?.length}
          onPress={() => {
            navigation.navigate("DeviceManagement");
          }}>
          <RowContainer style={{ opacity: !deviceList?.length ? 0.2 : 1 }}>
            <SvgContainer>
              <Setting />
            </SvgContainer>
            <MyText>기기관리</MyText>
          </RowContainer>
        </Button>
        <Button
          onPress={() => {
            navigation.navigate("NotificationSetting");
          }}>
          <RowContainer>
            <SvgContainer>
              <Bell />
            </SvgContainer>
            <MyText>알림설정</MyText>
          </RowContainer>
        </Button>
        <Button
          onPress={() => {
            navigation.navigate("UpdateNickname");
          }}>
          <RowContainer>
            <SvgContainer>
              <Tag />
            </SvgContainer>
            <MyText>이름변경</MyText>
          </RowContainer>
        </Button>
        <Divider
          style={{ width: width - 34, alignSelf: "center", marginVertical: 10 }}
        />
        <Button onPress={open} style={{ height: 42, paddingLeft: 32 }}>
          <MyText fontWeight="medium">로그아웃</MyText>
        </Button>
        <Button
          style={{ height: 42, paddingLeft: 32, marginBottom: 10 }}
          onPress={() => navigation.navigate("DeleteAccountStackNav")}>
          <MyText color="rgba(0, 0, 0, 0.3)">탈퇴하기</MyText>
        </Button>
      </ScrollView>
      <CommonCenterModal
        close={close}
        modalProps={modalProps}
        rightButtonText="로그아웃"
        isLoading={isLoading}
        onRightButtonPress={onLogout}
        title="로그아웃 하시나요?"
      />
    </>
  );
};

export default MyPage;
