import React, { useContext } from "react";
import { ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import MyText from "~/components/common/MyText";
import { useAppSelector } from "~/store";
import styled from "styled-components/native";

import Setting from "~/assets/svg/myPage/setting.svg";
import Plus from "~/assets/svg/myPage/circle-plus.svg";
import Bell from "~/assets/svg/myPage/bell.svg";
import People from "~/assets/svg/myPage/people.svg";
import Arrow from "~/assets/svg/arrow/arrow-right-gray.svg";
import { MyPageScreenNavigationProp } from "~/types/navigator";
import { storageActions } from "~/store/storage";
import { navigatorActions } from "~/store/navigator";
import DeviceList from "~/components/myPage/DeviceList";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import useModal from "~/hooks/useModal";
import Modal from "react-native-modal";
import CommonCenterModal from "~/components/modal/CommonCenterModal";
import Divider from "~/components/common/Divider";
import * as SecureStore from "expo-secure-store";
import { centerModalOutTiming } from "~/styles/constants";
import { resetAll } from "~/utils";

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
  const dispatch = useDispatch();
  const devices = useAppSelector(state => state.device);
  const { rpWidth } = useContext(DimensionsContext);
  const { open, close, modalProps } = useModal();

  return (
    <>
      <ScrollView>
        <DeviceList />
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
            disabled={!devices.length}
            onPress={() => {
              if (devices.length === 1) {
                navigation.navigate("DeviceSetting", {
                  data: devices[0],
                });
              } else {
                navigation.navigate("DeviceSettingList");
              }
            }}>
            <RowContainer style={{ opacity: !devices.length ? 0.2 : 1 }}>
              <SvgContainer rpWidth={rpWidth}>
                <Setting width={rpWidth(19)} height={rpWidth(20)} />
              </SvgContainer>
              <MyText>기기설정</MyText>
            </RowContainer>
            <Arrow
              width={rpWidth(7)}
              height={rpWidth(12)}
              style={{ opacity: !devices.length ? 0.5 : 1 }}
            />
          </Button>
          <Button
            rpWidth={rpWidth}
            onPress={() => {
              dispatch(
                storageActions.setDevice({
                  redirectionRouteName: "MyPage",
                }),
              );
              dispatch(
                navigatorActions.setInitialRoute({
                  initialBleWithHeaderStackNavRouteName: "ChargingCheck",
                }),
              );
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
          <Button rpWidth={rpWidth} isLast onPress={() => {}}>
            <RowContainer>
              <SvgContainer rpWidth={rpWidth}>
                <People width={rpWidth(20)} height={rpWidth(19)} />
              </SvgContainer>
              <MyText>가족관리</MyText>
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
            await SecureStore.deleteItemAsync("token");
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
