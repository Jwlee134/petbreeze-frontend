import React from "react";
import { ScrollView, useWindowDimensions } from "react-native";
import MyText from "~/components/common/MyText";
import styled from "styled-components/native";

import Setting from "~/assets/svg/myPage/setting.svg";
import Bell from "~/assets/svg/myPage/bell.svg";
import Tag from "~/assets/svg/myPage/name-tag.svg";
import { MyPageScreenNavigationProp } from "~/types/navigator";
import DeviceList from "~/components/myPage/DeviceList";
import useModal from "~/hooks/useModal";
import CommonCenterModal from "~/components/modal/CommonCenterModal";
import Divider from "~/components/common/Divider";
import * as SecureStore from "expo-secure-store";
import { centerModalOutTiming } from "~/styles/constants";
import { resetAll } from "~/utils";
import { secureItems } from "~/constants";
import useDevice from "~/hooks/useDevice";

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

  const onLogout = async () => {
    await Promise.all(
      Object.values(secureItems).map(item => SecureStore.deleteItemAsync(item)),
    );
    resetAll();
    close();
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Start" }],
      });
    }, centerModalOutTiming);
  };

  return (
    <>
      <ScrollView>
        <DeviceList deviceList={deviceList} />
        <Divider isHairline={false} style={{ marginVertical: 10 }} />
        <Button
          disabled={!deviceList?.length}
          onPress={() => {
            navigation.navigate("DeviceManagement");
          }}>
          <RowContainer style={{ opacity: !deviceList?.length ? 0.2 : 1 }}>
            <SvgContainer>
              <Setting width={19} height={20} />
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
              <Bell width={17} height={21} />
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
              <Tag width={12} height={19} />
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
        onRightButtonPress={onLogout}
        title="로그아웃 하시나요?"
      />
    </>
  );
};

export default MyPage;
