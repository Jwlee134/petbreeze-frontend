import React, { memo, useCallback } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import styled from "styled-components/native";
import palette from "~/styles/palette";
import { formatCreatedAt, consonantResponder } from "~/utils";
import MyText from "../common/MyText";
import Arrow from "~/assets/svg/arrow/arrow-right-b2.svg";
import { Notification, NotificationCode } from "~/api/user";
import { noAvatar, noName } from "~/constants";
import { Device } from "~/api/device";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NotificationScreenNavigationProp } from "~/types/navigator";

const Container = styled.View<{ isLast: boolean }>`
  padding: 0 32px;
  flex-direction: row;
  height: 70px;
  align-items: center;
  margin-bottom: ${({ isLast }) => (isLast ? 20 : 0)}px;
`;

const Image = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 17px;
`;

const TextContainer = styled.View`
  padding-right: 32px;
  flex: 1;
`;

interface Props {
  data: Notification;
  device: Device;
  isLast: boolean;
}

const NotificationItem = ({ data, device, isLast }: Props) => {
  const navigation = useNavigation<NotificationScreenNavigationProp>();
  const showArrow = data.notification_type_code === NotificationCode.FinishWalk;
  const isFocused = useIsFocused();

  const createdAt = useCallback(
    () => formatCreatedAt(data.created_at),
    [isFocused],
  );

  const onPress = () => {
    if (!showArrow) return;
    navigation.navigate("WalkDetailDay", {
      deviceID: device.id,
      date: data.created_at,
      avatarUrl: device.profile_image || "",
      name: device.name,
    });
  };

  const renderText = () => {
    switch (data.notification_type_code) {
      case NotificationCode.LowBattery:
        return (
          <>
            <MyText fontSize={14} fontWeight="bold">
              {device.name}
            </MyText>
            <MyText fontSize={14}>
              {consonantResponder(device.name)}의 배터리가{" "}
              {data.battery_level || 0}% 남았어요!
            </MyText>
          </>
        );
      case NotificationCode.ExitArea:
        return (
          <>
            <MyText color={palette.red_f0} fontSize={14} fontWeight="bold">
              {device.name}
            </MyText>
            <MyText color={palette.red_f0} fontSize={14}>
              {consonantResponder(device.name)}가 안심존을 벗어났어요!
            </MyText>
          </>
        );
      case NotificationCode.ComeBackArea:
        return (
          <>
            <MyText fontSize={14} fontWeight="bold">
              {device.name}
            </MyText>
            <MyText fontSize={14}>
              {consonantResponder(device.name)}가 안심존에 돌아왔어요!
            </MyText>
          </>
        );
      case NotificationCode.StartWalk:
        return (
          <>
            <MyText fontSize={14} fontWeight="bold">
              {device.name}
            </MyText>
            <MyText fontSize={14}>{consonantResponder(device.name)}가 </MyText>
            <MyText fontSize={14} fontWeight="bold">
              {data.walk_handler_nickname}
            </MyText>
            <MyText fontSize={14}>
              {consonantResponder(data.walk_handler_nickname || noName)}랑
              산책을 시작했어요!
            </MyText>
          </>
        );
      case NotificationCode.FinishWalk:
        return (
          <>
            <MyText fontSize={14} fontWeight="bold">
              {device.name}
            </MyText>
            <MyText fontSize={14}>{consonantResponder(device.name)}가 </MyText>
            <MyText fontSize={14} fontWeight="bold">
              {data.walk_handler_nickname}
            </MyText>
            <MyText fontSize={14}>
              {consonantResponder(data.walk_handler_nickname || noName)}
              와의 산책을 끝냈어요!
            </MyText>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container isLast={isLast}>
        <Image
          source={
            device.profile_image ? { uri: device.profile_image } : noAvatar
          }
        />
        <TextContainer>
          <MyText>
            {renderText()}
            {"    "}
            <View>
              <MyText
                style={{ marginBottom: -2 }}
                fontSize={12}
                color="rgba(0, 0, 0, 0.3)">
                {createdAt()}
              </MyText>
            </View>
          </MyText>
        </TextContainer>
        {showArrow ? <Arrow width={7} height={12} /> : null}
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default memo(NotificationItem);
