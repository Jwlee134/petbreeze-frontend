import React, { memo } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import styled from "styled-components/native";
import palette from "~/styles/palette";
import { formatCreatedAt } from "~/utils";
import MyText from "../common/MyText";
import Arrow from "~/assets/svg/arrow/arrow-right-b2.svg";
import { Notification } from "~/api/user";
import { noAvatar } from "~/constants";
import { Device } from "~/api/device";
import { useNavigation } from "@react-navigation/native";
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

const NotificationItem = ({
  data,
  device,
  isLast,
}: {
  data: Notification;
  device: Device;
  isLast: boolean;
}) => {
  const navigation = useNavigation<NotificationScreenNavigationProp>();
  const showArrow = data.title.includes("산책을 끝냈어요");

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (!showArrow) return;
        navigation.navigate("WalkDetailDay", {
          deviceID: device.id,
          date: data.created_at,
          avatarUrl: device.profile_image || "",
        });
      }}>
      <Container isLast={isLast}>
        <Image
          source={
            device.profile_image ? { uri: device.profile_image } : noAvatar
          }
        />
        <TextContainer>
          <MyText>
            {(() => {
              const color = data.title.includes("안심존")
                ? palette.red_f0
                : undefined;
              const parts = data.title.split(
                new RegExp(`(${device.name})`, "gi"),
              );
              return parts.map((text, i) =>
                text === device.name ? (
                  <MyText color={color} fontSize={14} fontWeight="bold" key={i}>
                    {text}
                  </MyText>
                ) : (
                  <MyText color={color} fontSize={14} key={i}>
                    {text}
                  </MyText>
                ),
              );
            })()}
            {"    "}
            <View>
              <MyText
                style={{
                  marginBottom: -2,
                }}
                fontSize={12}
                color="rgba(0, 0, 0, 0.3)">
                {formatCreatedAt(data.created_at)}
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
