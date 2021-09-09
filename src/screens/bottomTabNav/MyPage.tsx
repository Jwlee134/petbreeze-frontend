import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import MyText from "~/components/common/MyText";
import { useAppSelector } from "~/store";
import styled from "styled-components/native";

import Setting from "~/assets/svg/myPage/setting.svg";
import Plus from "~/assets/svg/myPage/circle-plus.svg";
import Bell from "~/assets/svg/myPage/bell.svg";
import People from "~/assets/svg/myPage/people.svg";
import Arrow from "~/assets/svg/arrow/arrow-right-gray.svg";
import { rpWidth } from "~/styles";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";
import DeviceAvatarCircle from "~/components/common/DeviceAvatarCircle";
import useModal from "~/hooks/useModal";
import Modal from "react-native-modal";
import LogoutModal from "~/components/modal/LogoutModal";
import { MyPageScreenNavigationProp } from "~/types/navigator";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Button = styled.TouchableOpacity<{ isLast?: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ isLast }) => (isLast ? 0 : rpWidth(16))}px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SvgContainer = styled.View`
  width: ${rpWidth(33)}px;
`;

const Section = styled.View`
  padding: ${rpWidth(35)}px ${rpWidth(32)}px;
`;

const Divider = styled.View`
  width: 100%;
  height: ${StyleSheet.hairlineWidth}px;
  background-color: rgba(0, 0, 0, 0.3);
`;

const MyPage = ({ navigation }: { navigation: MyPageScreenNavigationProp }) => {
  const dispatch = useDispatch();
  const devices = useAppSelector(state => state.device);
  const { open, close, modalProps } = useModal();

  return (
    <>
      <ScrollView>
        {devices.map(device => (
          <DeviceAvatarCircle key={device.id} />
        ))}
        <Section>
          <MyText
            style={{
              marginBottom: rpWidth(23),
            }}
            fontWeight="medium">
            계정관리
          </MyText>
          <Button
            onPress={() => {
              if (devices.length === 1) {
                navigation.navigate("DeviceSetting", {
                  data: devices[0],
                });
              } else {
                navigation.navigate("DeviceSettingList", {
                  data: devices,
                });
              }
            }}>
            <RowContainer>
              <SvgContainer>
                <Setting width={rpWidth(19)} height={rpWidth(20)} />
              </SvgContainer>
              <MyText>기기설정</MyText>
            </RowContainer>
            <Arrow width={rpWidth(9)} height={rpWidth(15)} />
          </Button>
          <Button onPress={() => {}}>
            <RowContainer>
              <SvgContainer>
                <Plus width={rpWidth(19)} height={rpWidth(18)} />
              </SvgContainer>
              <MyText>기기등록</MyText>
            </RowContainer>
            <Arrow width={rpWidth(9)} height={rpWidth(15)} />
          </Button>
          <Button onPress={() => {}}>
            <RowContainer>
              <SvgContainer>
                <Bell width={rpWidth(19)} height={rpWidth(21)} />
              </SvgContainer>
              <MyText>알림설정</MyText>
            </RowContainer>
            <Arrow width={rpWidth(9)} height={rpWidth(15)} />
          </Button>
          <Button isLast onPress={() => {}}>
            <RowContainer>
              <SvgContainer>
                <People width={rpWidth(20)} height={rpWidth(19)} />
              </SvgContainer>
              <MyText>가족관리</MyText>
            </RowContainer>
            <Arrow width={rpWidth(9)} height={rpWidth(15)} />
          </Button>
        </Section>
        <SidePaddingContainer>
          <Divider />
        </SidePaddingContainer>
        <Section>
          <Button onPress={open}>
            <MyText>로그아웃</MyText>
          </Button>
          <Button onPress={() => navigation.navigate("DeleteAccount")}>
            <MyText color="rgba(0, 0, 0, 0.3)">탈퇴하기</MyText>
          </Button>
          <Button isLast onPress={() => AsyncStorage.clear()}>
            <MyText color="rgba(0, 0, 0, 0.3)">데이터 삭제</MyText>
          </Button>
        </Section>
      </ScrollView>
      <Modal {...modalProps({ type: "center" })}>
        <LogoutModal close={close} />
      </Modal>
    </>
  );
};

export default MyPage;
