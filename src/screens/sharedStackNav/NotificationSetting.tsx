import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components/native";
import userApi, { NotificationSettings } from "~/api/user";
import Switch from "~/components/common/Switch";
import * as SecureStore from "expo-secure-store";
import MyText from "~/components/common/MyText";

import Shield from "~/assets/svg/myPage/shield.svg";
import Battery from "~/assets/svg/myPage/battery.svg";
import Wifi from "~/assets/svg/myPage/lost-wifi.svg";
import Pencil from "~/assets/svg/myPage/pencil-noti.svg";
import Check from "~/assets/svg/myPage/check.svg";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import Divider from "~/components/common/Divider";

const Container = styled.View``;

const Svg = styled.View<{ rpWidth: RpWidth }>`
  width: ${({ rpWidth }) => rpWidth(46)}px;
  align-items: center;
  margin-left: ${({ rpWidth }) => rpWidth(19)}px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Item = styled(RowContainer)<{ rpWidth: RpWidth; isLast?: boolean }>`
  justify-content: space-between;
  ${({ rpWidth, isLast }) => css`
    margin-bottom: ${isLast ? 0 : rpWidth(22)}px;
  `}
`;

const NotificationSetting = () => {
  const { rpWidth, width } = useContext(DimensionsContext);
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
        style={{ marginLeft: rpWidth(32), marginVertical: rpWidth(25) }}
        fontSize={14}
        color="rgba(0, 0, 0, 0.3)">
        기기 알림
      </MyText>
      <Item rpWidth={rpWidth}>
        <RowContainer>
          <Svg rpWidth={rpWidth}>
            <Shield width={rpWidth(19)} height={rpWidth(20)} />
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
      <Item rpWidth={rpWidth}>
        <RowContainer>
          <Svg rpWidth={rpWidth}>
            <Battery width={rpWidth(13)} height={rpWidth(19)} />
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
      <Item rpWidth={rpWidth} isLast>
        <RowContainer>
          <Svg rpWidth={rpWidth}>
            <Wifi width={rpWidth(20)} height={rpWidth(15)} />
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
          marginLeft: rpWidth(32),
          marginTop: rpWidth(60),
          marginBottom: rpWidth(25),
        }}
        fontSize={14}
        color="rgba(0, 0, 0, 0.3)">
        산책 알림
      </MyText>
      <Item rpWidth={rpWidth}>
        <RowContainer>
          <Svg rpWidth={rpWidth}>
            <Pencil width={rpWidth(18)} height={rpWidth(18)} />
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
      <Item rpWidth={rpWidth} isLast>
        <RowContainer>
          <Svg rpWidth={rpWidth}>
            <Check width={rpWidth(17)} height={rpWidth(12)} />
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
          width: width - rpWidth(34),
          alignSelf: "center",
          marginVertical: rpWidth(27),
        }}
      />
      <Item rpWidth={rpWidth}>
        <MyText style={{ marginLeft: rpWidth(32) }} fontWeight="medium">
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
