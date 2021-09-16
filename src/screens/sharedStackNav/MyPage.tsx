import React from "react";
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
import { rpWidth } from "~/styles";
import { MyPageScreenNavigationProp } from "~/types/navigator";
import { storageActions } from "~/store/storage";
import { navigatorActions } from "~/store/navigator";
import DeviceList from "~/components/myPage/DeviceList";

const Button = styled.TouchableOpacity<{ isLast?: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${rpWidth(13.5)}px 0;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SvgContainer = styled.View`
  width: ${rpWidth(33)}px;
`;

const Section = styled.View`
  padding: ${rpWidth(29)}px ${rpWidth(32)}px;
`;

const Divider = styled.View`
  width: 100%;
  height: ${rpWidth(4)}px;
  background-color: rgba(0, 0, 0, 0.03);
`;

const MyPage = ({ navigation }: { navigation: MyPageScreenNavigationProp }) => {
  const dispatch = useDispatch();
  const devices = useAppSelector(state => state.device);

  return (
    <ScrollView>
      <DeviceList />
      <Divider />
      <Section>
        <MyText
          style={{
            marginBottom: rpWidth(6.5),
          }}
          color="rgba(0, 0, 0, 0.3)"
          fontSize={14}>
          계정관리
        </MyText>
        <Button
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
            <SvgContainer>
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
          onPress={() => {
            dispatch(storageActions.setRedirectionRouteName("MyPage"));
            dispatch(
              navigatorActions.setInitialRoute({
                initialBleWithHeaderStackNavRouteName: "ChargingCheck",
              }),
            );
            navigation.navigate("BleRootStackNav");
          }}>
          <RowContainer>
            <SvgContainer>
              <Plus width={rpWidth(17)} height={rpWidth(18)} />
            </SvgContainer>
            <MyText>기기등록</MyText>
          </RowContainer>
          <Arrow width={rpWidth(7)} height={rpWidth(12)} />
        </Button>
        <Button onPress={() => {}}>
          <RowContainer>
            <SvgContainer>
              <Bell width={rpWidth(17)} height={rpWidth(21)} />
            </SvgContainer>
            <MyText>알림설정</MyText>
          </RowContainer>
          <Arrow width={rpWidth(7)} height={rpWidth(12)} />
        </Button>
        <Button isLast onPress={() => {}}>
          <RowContainer>
            <SvgContainer>
              <People width={rpWidth(20)} height={rpWidth(19)} />
            </SvgContainer>
            <MyText>가족관리</MyText>
          </RowContainer>
          <Arrow width={rpWidth(7)} height={rpWidth(12)} />
        </Button>
      </Section>
    </ScrollView>
  );
};

export default MyPage;
