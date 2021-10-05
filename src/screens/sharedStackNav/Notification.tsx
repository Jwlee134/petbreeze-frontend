import React, { useContext } from "react";
import { NotificationScreenNavigationProp } from "~/types/navigator";
import styled, { css } from "styled-components/native";

import notifications from "~/assets/notification.json";
import Empty from "~/components/notification/Empty";
import MyText from "~/components/common/MyText";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import { Animated } from "react-native";
import Divider from "~/components/common/Divider";
import NotificationItem from "~/components/notification/NotificationItem";

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
  const { rpWidth } = useContext(DimensionsContext);

  return notifications.length ? (
    <Container>
      <CategoryTitle rpWidth={rpWidth}>
        <MyText fontWeight="medium" fontSize={18}>
          새로운 알림
        </MyText>
      </CategoryTitle>
      {notifications
        .filter(notif => !notif.read)
        .map((notif, i) => (
          <NotificationItem key={i} data={notif} />
        ))}
      <Divider />
      <CategoryTitle rpWidth={rpWidth}>
        <MyText fontWeight="medium" fontSize={18}>
          이번주
        </MyText>
      </CategoryTitle>
      {notifications
        .filter(notif => notif.read)
        .map((notif, i) => (
          <NotificationItem key={i} data={notif} />
        ))}
    </Container>
  ) : (
    <Empty />
  );
};

export default Notification;
