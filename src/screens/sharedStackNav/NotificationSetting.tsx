import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import userApi from "~/api/user";
import Switch from "~/components/common/Switch";
import * as SecureStore from "expo-secure-store";
import MyText from "~/components/common/MyText";

import Shield from "~/assets/svg/myPage/shield.svg";
import Battery from "~/assets/svg/myPage/battery.svg";
import Pencil from "~/assets/svg/myPage/pencil-noti.svg";

const Container = styled.View`
  padding-top: 35px;
`;

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
  margin-bottom: ${({ isLast }) => (isLast ? 0 : 27.5)}px;
`;

const NotificationSetting = () => {
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

  return (
    <Container>
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
            <Pencil width={18} height={18} />
          </Svg>
          <MyText>산책 알림</MyText>
        </RowContainer>
        <Switch
          isOn={data?.walk_notification || false}
          onToggle={() => {
            if (!data) return;
            update({
              firebaseToken: token,
              body: {
                ...data,
                walk_notification: !data?.walk_notification,
              },
            });
          }}
        />
      </Item>
    </Container>
  );
};

export default NotificationSetting;
