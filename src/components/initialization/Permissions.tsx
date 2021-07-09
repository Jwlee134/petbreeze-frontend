import React from "react";
import styled from "styled-components/native";

import Permission from "~/assets/svg/initialization/permission.svg";
import Bell from "~/assets/svg/initialization/bell.svg";
import Location from "~/assets/svg/initialization/location.svg";
import Bluetooth from "~/assets/svg/initialization/bluetooth-small.svg";
import Gallery from "~/assets/svg/initialization/gallery.svg";
import Button from "../common/Button";
import { View } from "react-native";
import {
  PERMISSIONS,
  requestMultiple,
  requestNotifications,
} from "react-native-permissions";
import { useDispatch } from "react-redux";
import { BigText, BottomContainer, Container, TopContainer } from "./Styles";
import { width } from "~/styles";

const PermissionContainer = styled.View<{ isTop?: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${width - 48}px;
  margin-top: ${({ isTop }) => (isTop ? "0px" : "14px")};
`;

const LeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TextContainer = styled.View`
  justify-content: space-between;
  margin-left: 16px;
`;

const Text = styled.Text`
  font-size: 16px;
  margin-bottom: 3px;
`;

const SmallText = styled.Text`
  opacity: 0.5;
`;

const Permissions = ({ handleNext }: { handleNext: () => void }) => {
  const dispatch = useDispatch();

  const handleAllow = () => {
    requestNotifications(["alert", "badge"]).then(() => {
      requestMultiple([
        PERMISSIONS.IOS.LOCATION_ALWAYS,
        PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL,
        PERMISSIONS.IOS.PHOTO_LIBRARY,
      ]).finally(() => {
        handleNext();
      });
    });
  };

  return (
    <Container>
      <TopContainer>
        <Permission />
        <BigText>아래의 권한들을{"\n"}허용해주세요.</BigText>
      </TopContainer>
      <BottomContainer>
        <View>
          <PermissionContainer isTop>
            <LeftContainer>
              <Bell />
              <TextContainer>
                <Text>알림</Text>
                <SmallText>안심존 이탈 시 푸시알림</SmallText>
              </TextContainer>
            </LeftContainer>
          </PermissionContainer>
          <PermissionContainer>
            <LeftContainer>
              <Location />
              <TextContainer>
                <Text>위치</Text>
                <SmallText>지도에 내 위치를 표시</SmallText>
              </TextContainer>
            </LeftContainer>
          </PermissionContainer>
          <PermissionContainer>
            <LeftContainer>
              <Bluetooth />
              <TextContainer>
                <Text>블루투스</Text>
                <SmallText>디바이스와 상호작용</SmallText>
              </TextContainer>
            </LeftContainer>
          </PermissionContainer>
          <PermissionContainer>
            <LeftContainer>
              <Gallery />
              <TextContainer>
                <Text>사진</Text>
                <SmallText>반려동물 프로필 사진 설정</SmallText>
              </TextContainer>
            </LeftContainer>
          </PermissionContainer>
        </View>
        <Button onPress={handleAllow} text="허용" />
      </BottomContainer>
    </Container>
  );
};

export default Permissions;
