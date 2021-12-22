import React, { useEffect } from "react";
import styled from "styled-components/native";

import Empty from "~/components/notification/Empty";
import MyText from "~/components/common/MyText";
import Divider from "~/components/common/Divider";
import NotificationItem from "~/components/notification/NotificationItem";
import userApi from "~/api/user";
import { useIsFocused } from "@react-navigation/native";
import useDevice from "~/hooks/useDevice";
import useAppState from "~/hooks/useAppState";
import { FlatList, View } from "react-native";
import LoadingIndicator from "~/components/lottie/LoadingIndicator";
import { store } from "~/store";

const CategoryTitle = styled.View`
  margin-top: 25px;
  margin-left: 41px;
  margin-bottom: 20px;
`;

const Notification = () => {
  const deviceList = useDevice();
  const { data, refetch } = userApi.useGetNotificationsQuery();
  const [postRead] = userApi.useReadNotificationsMutation();
  const isFocused = useIsFocused();
  const appState = useAppState();
  const newNotifs = data?.filter(notif => notif.is_new) || [];

  useEffect(() => {
    if (!data) return;
    const handleRead = async () => {
      if (newNotifs.length) {
        postRead(newNotifs.map(notif => notif.id));
      }
    };
    handleRead();
  }, [data]);

  useEffect(() => {
    if (appState === "active" || isFocused) refetch();
    if (!isFocused && newNotifs.length) {
      store.dispatch(
        userApi.util.updateQueryData("getNotifications", undefined, draft => {
          newNotifs.forEach(newNotif => {
            draft[draft.findIndex(notif => notif.id === newNotif.id)].is_new =
              false;
          });
        }),
      );
    }
  }, [appState, isFocused]);

  if (!data)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LoadingIndicator size={80} />
      </View>
    );
  if (!deviceList.length || !data.length) return <Empty />;

  const newNotif = data.filter(notif => notif.is_new);
  const thisWeek = data.filter(notif => !notif.is_new);

  return (
    <FlatList
      data={thisWeek}
      ListHeaderComponent={() => (
        <>
          {newNotif.length ? (
            <>
              <CategoryTitle>
                <MyText fontWeight="medium" fontSize={18} color="#333333">
                  새로운 알림
                </MyText>
              </CategoryTitle>
              {newNotif.map((notif, i) => (
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
                  isLast={i === newNotif.length - 1}
                />
              ))}
              {thisWeek.length ? <Divider /> : null}
            </>
          ) : null}
          {thisWeek.length ? (
            <CategoryTitle>
              <MyText fontWeight="medium" fontSize={18} color="#333333">
                이번주
              </MyText>
            </CategoryTitle>
          ) : null}
        </>
      )}
      keyExtractor={item => `${item.id}`}
      renderItem={({ item, index }) => (
        <NotificationItem
          key={item.id}
          data={item}
          device={
            deviceList[
              deviceList.findIndex(
                device => device.id === item.related_device_id,
              )
            ]
          }
          isLast={index === thisWeek.length - 1}
        />
      )}
    />
  );
};

export default Notification;
