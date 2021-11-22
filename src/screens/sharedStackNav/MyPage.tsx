import React from "react";
import { ScrollView } from "react-native";
import MyText from "~/components/common/MyText";
import styled from "styled-components/native";

import Setting from "~/assets/svg/myPage/setting.svg";
import Plus from "~/assets/svg/myPage/circle-plus.svg";
import Bell from "~/assets/svg/myPage/bell.svg";
import Arrow from "~/assets/svg/arrow/arrow-right-gray.svg";
import Tag from "~/assets/svg/myPage/name-tag.svg";
import { MyPageScreenNavigationProp } from "~/types/navigator";
import DeviceList from "~/components/myPage/DeviceList";
import useModal from "~/hooks/useModal";
import Modal from "react-native-modal";
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
  padding: 13.5px 0;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SvgContainer = styled.View`
  width: 49px;
  align-items: center;
`;

const Section = styled.View`
  padding: 29px 32px 32px 17px;
`;

const MyPage = ({ navigation }: { navigation: MyPageScreenNavigationProp }) => {
  const deviceList = useDevice();
  const { open, close, modalProps } = useModal();

  return (
    <>
      <ScrollView>
        <DeviceList deviceList={deviceList} />
        <Divider isHairline={false} />
        <Section>
          <MyText
            style={{
              marginBottom: 6.5,
              paddingLeft: 15,
            }}
            color="rgba(0, 0, 0, 0.3)"
            fontSize={14}>
            계정관리
          </MyText>
          <Button
            disabled={!deviceList?.length}
            onPress={() => {
              navigation.navigate("DeviceSettingList");
            }}>
            <RowContainer style={{ opacity: !deviceList?.length ? 0.2 : 1 }}>
              <SvgContainer>
                <Setting width={19} height={20} />
              </SvgContainer>
              <MyText>기기설정</MyText>
            </RowContainer>
            <Arrow
              width={7}
              height={12}
              style={{ opacity: !deviceList?.length ? 0.5 : 1 }}
            />
          </Button>
          <Button
            onPress={() => {
              navigation.navigate("BleRootStackNav");
            }}>
            <RowContainer>
              <SvgContainer>
                <Plus width={17} height={18} />
              </SvgContainer>
              <MyText>기기등록</MyText>
            </RowContainer>
            <Arrow width={7} height={12} />
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
            <Arrow width={7} height={12} />
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
            <Arrow width={7} height={12} />
          </Button>
        </Section>
        <Divider isHairline={false} />
        <Section>
          <Button onPress={open} style={{ paddingTop: 0, paddingLeft: 15 }}>
            <MyText>로그아웃</MyText>
          </Button>
          <Button
            style={{ paddingLeft: 15 }}
            onPress={() => navigation.navigate("DeleteAccountStackNav")}>
            <MyText color="rgba(0, 0, 0, 0.3)">탈퇴하기</MyText>
          </Button>
        </Section>
      </ScrollView>
      <Modal {...modalProps({ type: "center" })}>
        <CommonCenterModal
          close={close}
          rightButtonText="로그아웃"
          onRightButtonPress={async () => {
            await Promise.all(
              Object.values(secureItems).map(item =>
                SecureStore.deleteItemAsync(item),
              ),
            );
            resetAll();
            close();
            setTimeout(() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "Start" }],
              });
            }, centerModalOutTiming);
          }}
          title="로그아웃 하시나요?"
        />
      </Modal>
    </>
  );
};

export default MyPage;
