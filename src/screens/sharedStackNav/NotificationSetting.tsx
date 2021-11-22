import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import userApi, { NotificationSettings } from "~/api/user";
import Switch from "~/components/common/Switch";
import * as SecureStore from "expo-secure-store";
import MyText from "~/components/common/MyText";

import Shield from "~/assets/svg/myPage/shield.svg";
import Battery from "~/assets/svg/myPage/battery.svg";
import Wifi from "~/assets/svg/myPage/lost-wifi.svg";
import Pencil from "~/assets/svg/myPage/pencil-noti.svg";
import Check from "~/assets/svg/myPage/check.svg";
import Divider from "~/components/common/Divider";
import { useWindowDimensions } from "react-native";

const Container = styled.View``;

const Svg = styled.View`
  width: 46px;
  align-items: center;
  margin-left: 19px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Item = styled(RowContainer)<{ isLast?: boolean }>`
  justify-content: space-between;
  margin-bottom: ${({ isLast }) => (isLast ? 0 : 22)}px;
`;

const NotificationSetting = () => {
  const { width } = useWindowDimensions();
  const [token, setToken] = useState("");
  const { data } = userApi.useGetNofiticationSettingsQuery(token, {
    skip: !token.length,
  });
  const [update] = userApi.useUpdateNotificationSettingsMutation();

  useEffect(() => {
    SecureStore.getItemAsync("firebaseToken").then(token => {
      if (token) {
        setToken(token);
      }
    });
  }, []);

  const isEntireOn = (data && !Object.values(data).includes(false)) || false;

  return (
    <Container>
      <MyText
        style={{ marginLeft: 32, marginVertical: 25 }}
        fontSize={14}
        color="rgba(0, 0, 0, 0.3)">
        기기 알림
      </MyText>
      <Item>
        <RowContainer>
          <Svg>
            <Shield width={19} height={20} />
          </Svg>
          <MyText>안심존 이탈 알림</MyText>
        </RowContainer>
        <Switch
          isOn={data?.exit_notification || false}
          onToggle={() => {
            if (!data) return;
            update({
              firebaseToken: token,
              body: {
                ...data,
                exit_notification: !data?.exit_notification,
              },
            });
          }}
        />
      </Item>
      <Item>
        <RowContainer>
          <Svg>
            <Battery width={13} height={19} />
          </Svg>
          <MyText>배터리 부족 알림</MyText>
        </RowContainer>
        <Switch
          isOn={data?.low_battery_notification || false}
          onToggle={() => {
            if (!data) return;
            update({
              firebaseToken: token,
              body: {
                ...data,
                low_battery_notification: !data?.low_battery_notification,
              },
            });
          }}
        />
      </Item>
      <Item isLast>
        <RowContainer>
          <Svg>
            <Wifi width={20} height={15} />
          </Svg>
          <MyText>연결 끊김 알림</MyText>
        </RowContainer>
        <Switch
          isOn={data?.disconnect_notification || false}
          onToggle={() => {
            if (!data) return;
            update({
              firebaseToken: token,
              body: {
                ...data,
                disconnect_notification: !data?.disconnect_notification,
              },
            });
          }}
        />
      </Item>
      <MyText
        style={{
          marginLeft: 32,
          marginTop: 60,
          marginBottom: 25,
        }}
        fontSize={14}
        color="rgba(0, 0, 0, 0.3)">
        산책 알림
      </MyText>
      <Item>
        <RowContainer>
          <Svg>
            <Pencil width={18} height={18} />
          </Svg>
          <MyText>산책 시작 알림</MyText>
        </RowContainer>
        <Switch
          isOn={data?.start_walk_notification || false}
          onToggle={() => {
            if (!data) return;
            update({
              firebaseToken: token,
              body: {
                ...data,
                start_walk_notification: !data?.start_walk_notification,
              },
            });
          }}
        />
      </Item>
      <Item isLast>
        <RowContainer>
          <Svg>
            <Check width={17} height={12} />
          </Svg>
          <MyText>산책 종료 알림</MyText>
        </RowContainer>
        <Switch
          isOn={data?.stop_walk_notification || false}
          onToggle={() => {
            if (!data) return;
            update({
              firebaseToken: token,
              body: {
                ...data,
                stop_walk_notification: !data?.stop_walk_notification,
              },
            });
          }}
        />
      </Item>
      <Divider
        style={{
          width: width - 34,
          alignSelf: "center",
          marginVertical: 27,
        }}
      />
      <Item>
        <MyText style={{ marginLeft: 32 }} fontWeight="medium">
          전체 알림 설정
        </MyText>
        <Switch
          isOn={isEntireOn}
          onToggle={() => {
            if (!data) return;
            const body = { ...data };
            if (isEntireOn) {
              Object.keys(body).forEach(value => {
                body[value as keyof NotificationSettings] = false;
              });
            } else {
              Object.keys(body).forEach(value => {
                body[value as keyof NotificationSettings] = true;
              });
            }
            update({
              firebaseToken: token,
              body,
            });
          }}
        />
      </Item>
    </Container>
  );
};

export default NotificationSetting;
