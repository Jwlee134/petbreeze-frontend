import React, { useContext, useEffect } from "react";
import { NotificationScreenNavigationProp } from "~/types/navigator";
import styled, { css } from "styled-components/native";

import Empty from "~/components/notification/Empty";
import MyText from "~/components/common/MyText";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import Divider from "~/components/common/Divider";
import NotificationItem from "~/components/notification/NotificationItem";
import userApi from "~/api/user";
import { useIsFocused } from "@react-navigation/native";
import useDevice from "~/hooks/useDevice";
import useAppState from "~/hooks/useAppState";

const Container = styled.ScrollView`
  flex: 1;
`;

const CategoryTitle = styled.View<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    margin-top: ${rpWidth(25)}px;
    margin-left: ${rpWidth(41)}px;
    margin-bottom: ${rpWidth(30)}px;
  `}
`;

const Notification = ({
  navigation,
}: {
  navigation: NotificationScreenNavigationProp;
}) => {
  const deviceList = useDevice();
  const { data, refetch } = userApi.useGetNotificationsQuery();
  const [postRead] = userApi.useReadNotificationsMutation();
  const { rpWidth } = useContext(DimensionsContext);
  const isFocused = useIsFocused();
  const appState = useAppState();

  useEffect(() => {
    if (!data) return;
    const handleRead = async () => {
      const newNotifs = data.filter(notif => notif.is_new);
      if (newNotifs.length) {
        postRead(newNotifs.map(notif => notif.id));
      }
    };
    handleRead();
  }, [data]);

  useEffect(() => {
    if (isFocused) refetch();
  }, [isFocused]);

  useEffect(() => {
    if (appState === "active") refetch();
  }, [appState]);

  if (!data || !deviceList) return null;

  const newNotif = data.filter(notif => notif.is_new);
  const thisWeek = data.filter(notif => !notif.is_new);

  if (data.length && deviceList.length) {
    return (
      <Container>
        {newNotif.length ? (
          <>
            <CategoryTitle rpWidth={rpWidth}>
              <MyText fontWeight="medium" fontSize={18}>
                새로운 알림
              </MyText>
            </CategoryTitle>
            {newNotif.map(notif => (
              <NotificationItem
                key={notif.id}
                data={notif}
                device={
                  deviceList[
                    deviceList.findIndex(
                      device => device.id === notif.related_device_id,
                    )
                  ]
                }
              />
            ))}
            <Divider />
          </>
        ) : null}
        {thisWeek.length ? (
          <>
            <CategoryTitle rpWidth={rpWidth}>
              <MyText fontWeight="medium" fontSize={18}>
                이번주
              </MyText>
            </CategoryTitle>
            {thisWeek.map(notif => (
              <NotificationItem
                key={notif.id}
                data={notif}
                device={
                  deviceList[
                    deviceList.findIndex(
                      device => device.id === notif.related_device_id,
                    )
                  ]
                }
              />
            ))}
          </>
        ) : null}
      </Container>
    );
  }

  return <Empty />;
};

export default Notification;
