import React, { useContext, useEffect, useRef } from "react";
import { NotificationScreenNavigationProp } from "~/types/navigator";
import styled, { css } from "styled-components/native";

import Empty from "~/components/notification/Empty";
import MyText from "~/components/common/MyText";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import Divider from "~/components/common/Divider";
import NotificationItem from "~/components/notification/NotificationItem";
import userApi from "~/api/user";
import { useIsFocused } from "@react-navigation/native";
import { store, useAppSelector } from "~/store";
import { PatchCollection } from "@reduxjs/toolkit/dist/query/core/buildThunks";
import { useDispatch } from "react-redux";
import { queryActions } from "~/store/query";

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
  const { data, refetch } = userApi.useGetNotificationsQuery();
  const { data: numOfNewNotif } =
    userApi.endpoints.getNumOfNewNotifications.useQueryState();
  const [postRead] = userApi.useReadNotificationsMutation();
  const { rpWidth } = useContext(DimensionsContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!data) return;
    const handleRead = async () => {
      const newNotifs = data.filter(notif => notif.is_new);
      if (newNotifs.length) {
        try {
          await postRead(newNotifs.map(notif => notif.id)).unwrap();
          store.dispatch(
            userApi.util.invalidateTags([{ type: "Notification", id: "NEW" }]),
          );
        } catch (error) {
          console.log(error);
        }
      }
    };
    handleRead();
  }, [data]);

  useEffect(() => {
    if (isFocused && numOfNewNotif !== undefined && numOfNewNotif > 0)
      refetch();
  }, [isFocused, numOfNewNotif]);

  if (!data) return null;

  if (data.length) {
    return (
      <Container>
        <CategoryTitle rpWidth={rpWidth}>
          <MyText fontWeight="medium" fontSize={18}>
            새로운 알림
          </MyText>
        </CategoryTitle>
        {data
          .filter(notif => notif.is_new)
          .map(notif => (
            <NotificationItem key={notif.id} data={notif} />
          ))}
        <Divider />
        <CategoryTitle rpWidth={rpWidth}>
          <MyText fontWeight="medium" fontSize={18}>
            이번주
          </MyText>
        </CategoryTitle>
        {data
          .filter(notif => !notif.is_new)
          .map(notif => (
            <NotificationItem key={notif.id} data={notif} />
          ))}
      </Container>
    );
  }

  return <Empty />;
};

export default Notification;
