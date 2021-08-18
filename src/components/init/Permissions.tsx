import React, { useEffect, useState } from "react";
import styled from "styled-components/native";

import Shield from "~/assets/svg/init/permission/shield.svg";
import Bell from "~/assets/svg/init/permission/bell.svg";
import Location from "~/assets/svg/init/permission/location.svg";
import Bluetooth from "~/assets/svg/init/permission/bluetooth.svg";
import Gallery from "~/assets/svg/init/permission/gallery.svg";
import {
  checkNotifications,
  openSettings,
  PERMISSIONS,
  requestMultiple,
  requestNotifications,
} from "react-native-permissions";
import { useDispatch } from "react-redux";
import { rpHeight, rpWidth, width } from "~/styles";
import { storageActions } from "~/store/storage";
import { Alert } from "react-native";
import useAppState from "~/hooks/useAppState";
import { useAppSelector } from "~/store";
import MyText from "../common/MyText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import palette from "~/styles/palette";
import SafeAreaContainer from "../common/container/SafeAreaContainer";

const TopContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BottomContainer = styled.View<{ width: number }>`
  flex: 1;
  width: ${({ width }) => `${width}px`};
  margin: 0 auto;
`;

const PermissionContainer = styled.View<{ isTop?: boolean }>`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ isTop }) => (isTop ? "0px" : `${rpHeight(18)}px`)};
`;

const SvgContainer = styled.View`
  width: ${rpWidth(32)}px;
  align-items: center;
`;

const TextContainer = styled.View`
  margin-left: ${rpWidth(20)}px;
  justify-content: center;
`;

const Button = styled.TouchableOpacity`
  background-color: ${palette.blue_7b};
  width: 100%;
  align-items: center;
`;

const Permissions = ({
  handlePreRender,
  next,
}: {
  handlePreRender: () => void;
  next: () => void;
}) => {
  const isPermissionAllowed = useAppSelector(
    state => state.storage.init.isPermissionAllowed,
  );
  const dispatch = useDispatch();
  const { appState } = useAppState();
  const { bottom } = useSafeAreaInsets();
  const [textWidth, setTextWidth] = useState(0);

  const [settingOpened, setSettingOpened] = useState(false);

  const handleAllowRest = async () => {
    await requestMultiple([
      PERMISSIONS.IOS.LOCATION_ALWAYS,
      PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL,
      PERMISSIONS.IOS.PHOTO_LIBRARY,
    ]).finally(() => {
      next();
      dispatch(storageActions.setInit("permission"));
    });
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

  useEffect(() => {
    handlePreRender();
  }, []);

  return (
    <>
      <SafeAreaContainer>
        <TopContainer>
          <Shield width={rpWidth(114)} height={rpHeight(114)} />
          <MyText
            fontSize={20}
            onLayout={e => setTextWidth(e.nativeEvent.layout.width)}
            style={{ textAlign: "center", marginTop: rpHeight(25) }}>
            어디개 앱 이용을 위해{"\n"}다음 권한의 허용이 필요합니다.
          </MyText>
        </TopContainer>
        <BottomContainer width={textWidth}>
          <PermissionContainer isTop>
            <SvgContainer>
              <Bell width={rpWidth(24)} height={rpWidth(27)} />
            </SvgContainer>
            <TextContainer>
              <MyText fontWeight="medium" fontSize={16}>
                알림
              </MyText>
              <MyText
                fontWeight="light"
                fontSize={14}
                color="rgba(0, 0, 0, 0.5)">
                안심존 이탈 시 푸시알림
              </MyText>
            </TextContainer>
          </PermissionContainer>
          <PermissionContainer>
            <SvgContainer>
              <Location width={rpWidth(21)} height={rpWidth(30)} />
            </SvgContainer>
            <TextContainer>
              <MyText fontWeight="medium" fontSize={16}>
                위치
              </MyText>
              <MyText
                fontWeight="light"
                fontSize={14}
                color="rgba(0, 0, 0, 0.5)">
                지도에 내 위치 표시
              </MyText>
            </TextContainer>
          </PermissionContainer>
          <PermissionContainer>
            <SvgContainer>
              <Bluetooth width={rpWidth(22)} height={rpWidth(29)} />
            </SvgContainer>
            <TextContainer>
              <MyText fontWeight="medium" fontSize={16}>
                블루투스
              </MyText>
              <MyText
                fontWeight="light"
                fontSize={14}
                color="rgba(0, 0, 0, 0.5)">
                디바이스와 상호작용
              </MyText>
            </TextContainer>
          </PermissionContainer>
          <PermissionContainer>
            <SvgContainer>
              <Gallery width={rpWidth(23)} height={rpWidth(23)} />
            </SvgContainer>
            <TextContainer>
              <MyText fontWeight="medium" fontSize={16}>
                갤러리
              </MyText>
              <MyText
                fontWeight="light"
                fontSize={14}
                color="rgba(0, 0, 0, 0.5)">
                반려동물 프로필 사진 설정
              </MyText>
            </TextContainer>
          </PermissionContainer>
        </BottomContainer>
      </SafeAreaContainer>
      <Button
        style={{
          height: rpWidth(66) + bottom,
        }}
        onPress={handleNotification}>
        <MyText
          color="white"
          fontWeight="medium"
          style={{
            marginTop: rpWidth(19),
          }}>
          확인
        </MyText>
      </Button>
    </>
  );
};

export default React.memo(Permissions);
