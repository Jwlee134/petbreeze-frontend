import React, { useContext } from "react";
import { ScrollView } from "react-native";
import MyText from "~/components/common/MyText";
import styled from "styled-components/native";

import Setting from "~/assets/svg/myPage/setting.svg";
import Plus from "~/assets/svg/myPage/circle-plus.svg";
import Bell from "~/assets/svg/myPage/bell.svg";
import Arrow from "~/assets/svg/arrow/arrow-right-gray.svg";
import { MyPageScreenNavigationProp } from "~/types/navigator";
import DeviceList from "~/components/myPage/DeviceList";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import useModal from "~/hooks/useModal";
import Modal from "react-native-modal";
import CommonCenterModal from "~/components/modal/CommonCenterModal";
import Divider from "~/components/common/Divider";
import * as SecureStore from "expo-secure-store";
import { centerModalOutTiming } from "~/styles/constants";
import { resetAll } from "~/utils";
import { secureItems } from "~/constants";
import useDevice from "~/hooks/useDevice";

const Button = styled.TouchableOpacity<{ isLast?: boolean; rpWidth: RpWidth }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ rpWidth }) => `${rpWidth(13.5)}px 0px`};
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SvgContainer = styled.View<{ rpWidth: RpWidth }>`
  width: ${({ rpWidth }) => rpWidth(33)}px;
`;

const Section = styled.View<{ rpWidth: RpWidth }>`
  padding: ${({ rpWidth }) => `${rpWidth(29)}px ${rpWidth(32)}px`};
`;

const MyPage = ({ navigation }: { navigation: MyPageScreenNavigationProp }) => {
  const deviceList = useDevice();
  const { rpWidth } = useContext(DimensionsContext);
  const { open, close, modalProps } = useModal();

  return (
    <>
      <ScrollView>
        <DeviceList deviceList={deviceList} />
        <Divider isHairline={false} />
        <Section rpWidth={rpWidth}>
          <MyText
            style={{
              marginBottom: rpWidth(6.5),
            }}
            color="rgba(0, 0, 0, 0.3)"
            fontSize={14}>
            계정관리
          </MyText>
          <Button
            rpWidth={rpWidth}
            disabled={!deviceList?.length}
            onPress={() => {
              navigation.navigate("DeviceSettingList", {
                deviceList,
              });
            }}>
            <RowContainer style={{ opacity: !deviceList?.length ? 0.2 : 1 }}>
              <SvgContainer rpWidth={rpWidth}>
                <Setting width={rpWidth(19)} height={rpWidth(20)} />
              </SvgContainer>
              <MyText>기기설정</MyText>
            </RowContainer>
            <Arrow
              width={rpWidth(7)}
              height={rpWidth(12)}
              style={{ opacity: !deviceList?.length ? 0.5 : 1 }}
            />
          </Button>
          <Button
            rpWidth={rpWidth}
            onPress={() => {
              navigation.navigate("BleRootStackNav");
            }}>
            <RowContainer>
              <SvgContainer rpWidth={rpWidth}>
                <Plus width={rpWidth(17)} height={rpWidth(18)} />
              </SvgContainer>
              <MyText>기기등록</MyText>
            </RowContainer>
            <Arrow width={rpWidth(7)} height={rpWidth(12)} />
          </Button>
          <Button
            rpWidth={rpWidth}
            onPress={() => {
              navigation.navigate("NotificationSetting");
            }}>
            <RowContainer>
              <SvgContainer rpWidth={rpWidth}>
                <Bell width={rpWidth(17)} height={rpWidth(21)} />
              </SvgContainer>
              <MyText>알림설정</MyText>
            </RowContainer>
            <Arrow width={rpWidth(7)} height={rpWidth(12)} />
          </Button>
        </Section>
        <Divider isHairline={false} />
        <Section rpWidth={rpWidth}>
          <Button rpWidth={rpWidth} onPress={open} style={{ paddingTop: 0 }}>
            <MyText>로그아웃</MyText>
          </Button>
          <Button
            rpWidth={rpWidth}
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
