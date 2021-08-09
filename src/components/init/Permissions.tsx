import React from "react";
import styled from "styled-components/native";

import Permission from "~/assets/svg/init/permission.svg";
import Bell from "~/assets/svg/init/bell.svg";
import Location from "~/assets/svg/init/location.svg";
import Bluetooth from "~/assets/svg/init/bluetooth-small.svg";
import Gallery from "~/assets/svg/init/gallery.svg";
import Button from "../common/Button";
import { View } from "react-native";
import {
  checkNotifications,
  openSettings,
  PERMISSIONS,
  requestMultiple,
  requestNotifications,
} from "react-native-permissions";
import { useDispatch } from "react-redux";
import { BigText, BottomContainer, Container, TopContainer } from "./Styles";
import { width } from "~/styles";
import { storageActions } from "~/store/storage";
import { commonActions } from "~/store/common";
import { Alert } from "react-native";
import { useState } from "react";
import useAppState from "~/hooks/useAppState";
import { useEffect } from "react";
import { useAppSelector } from "~/store";

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

const Permissions = () => {
  const isPermissionAllowed = useAppSelector(
    state => state.storage.init.isPermissionAllowed,
  );
  const dispatch = useDispatch();
  const { appState } = useAppState();

  const [settingOpened, setSettingOpened] = useState(false);

  const handleAllowRest = async () => {
    await requestMultiple([
      PERMISSIONS.IOS.LOCATION_ALWAYS,
      PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL,
      PERMISSIONS.IOS.PHOTO_LIBRARY,
    ]);
    dispatch(commonActions.setPage("next"));
    dispatch(storageActions.setInit("permission"));
  };

  const handleNotification = async () => {
    await requestNotifications(["alert", "badge"]);
    const { status } = await checkNotifications();
    if (status === "granted") {
      await handleAllowRest();
    }
    if (status === "blocked") {
      Alert.alert(
        "경고",
        "내 반려동물이 안심존을 벗어나도 알림을 받지 못하게 됩니다.",
        [
          {
            text: "괜찮습니다",
            onPress: handleAllowRest,
          },
          {
            text: "권한 허용",
            onPress: async () => {
              await openSettings();
              setTimeout(() => {
                setSettingOpened(true);
              }, 500);
            },
          },
        ],
      );
    }
  };

  useEffect(() => {
    if (settingOpened && appState === "active" && !isPermissionAllowed) {
      handleAllowRest();
    }
  }, [settingOpened, appState, isPermissionAllowed]);

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
                <SmallText>지도에 내 위치 표시 및 산책 기록</SmallText>
              </TextContainer>
            </LeftContainer>
          </PermissionContainer>
          <PermissionContainer>
            <LeftContainer>
              <Bluetooth />
              <TextContainer>
                <Text>블루투스</Text>
                <SmallText>디바이스 등록 및 펌웨어 업데이트에 사용</SmallText>
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
        <Button onPress={handleNotification} text="허용" />
      </BottomContainer>
    </Container>
  );
};

export default Permissions;
