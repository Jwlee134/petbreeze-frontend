import React, { useEffect, useState } from "react";
import styled from "styled-components/native";

import Shield from "~/assets/svg/init/permission/shield.svg";
import Bell from "~/assets/svg/init/permission/bell.svg";
import Location from "~/assets/svg/init/permission/location.svg";
import Bluetooth from "~/assets/svg/init/permission/bluetooth.svg";
import Gallery from "~/assets/svg/init/permission/gallery.svg";
import {
  openSettings,
  PERMISSIONS,
  request,
  requestMultiple,
  requestNotifications,
} from "react-native-permissions";
import { useDispatch } from "react-redux";
import { rpWidth } from "~/styles";
import { storageActions } from "~/store/storage";
import { Alert, Animated } from "react-native";
import useAppState from "~/hooks/useAppState";
import { useAppSelector } from "~/store";
import MyText from "../../components/common/MyText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import palette from "~/styles/palette";
import SafeAreaContainer from "../../components/common/container/SafeAreaContainer";
import { PermissionsScreenNavigationProp } from "~/types/navigator";
import useAnimatedSequence from "~/hooks/useAnimatedSequence";

const TopContainer = styled(Animated.View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BottomContainer = styled(Animated.View)<{ width: number }>`
  flex: 1;
  width: ${({ width }) => `${width}px`};
  margin: 0 auto;
`;

const PermissionContainer = styled.View<{ isTop?: boolean }>`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ isTop }) => (isTop ? "0px" : `${rpWidth(18)}px`)};
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
  width: 100%;
`;

const ButtonView = styled(Animated.View)`
  width: 100%;
  height: 100%;
  align-items: center;
`;

const Permissions = ({
  navigation,
}: {
  navigation: PermissionsScreenNavigationProp;
}) => {
  const isPermissionAllowed = useAppSelector(
    state => state.storage.init.isPermissionAllowed,
  );
  const dispatch = useDispatch();
  const { appState } = useAppState();
  const { bottom } = useSafeAreaInsets();
  const [textWidth, setTextWidth] = useState(0);

  const [settingOpened, setSettingOpened] = useState(false);

  const [value1, value2, value3] = useAnimatedSequence({
    numOfValues: 3,
    useNativeDriverOnThird: false,
    secondDuration: 300,
  });

  const color = value3.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0, 0, 0, 0.3)", "white"],
  });

  const backgroundColor = value3.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0, 0, 0, 0.1)", palette.blue_7b_90],
  });

  const handleAllowRest = () => {
    requestMultiple([
      PERMISSIONS.IOS.LOCATION_ALWAYS,
      PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL,
      PERMISSIONS.IOS.PHOTO_LIBRARY,
      PERMISSIONS.IOS.CAMERA,
    ]).then(() => {
      dispatch(storageActions.setInit("permission"));
      navigation.replace("BleRootStackNav");
    });
  };

  const openSetting = () => {
    openSettings().then(() => {
      setTimeout(() => {
        setSettingOpened(true);
      }, 500);
    });
  };

  const handleNotification = () => {
    requestNotifications(["alert", "badge"]).then(({ status }) => {
      if (status === "granted") {
        handleAllowRest();
      }
      if (status === "blocked") {
        Alert.alert(
          "경고",
          "내 반려동물이 안심존을 벗어나도 알림을 받지 못하게 됩니다.",
          [
            { text: "괜찮습니다", onPress: handleAllowRest },
            { text: "권한 허용하기", onPress: openSetting },
          ],
        );
      }
    });
  };

  useEffect(() => {
    if (settingOpened && appState === "active" && !isPermissionAllowed) {
      handleAllowRest();
      setSettingOpened(false);
    }
  }, [settingOpened, appState, isPermissionAllowed]);

  return (
    <>
      <SafeAreaContainer>
        <TopContainer style={{ opacity: value1 }}>
          <Shield width={rpWidth(114)} height={rpWidth(114)} />
          <MyText
            fontSize={20}
            onLayout={e => setTextWidth(e.nativeEvent.layout.width)}
            style={{ textAlign: "center", marginTop: rpWidth(25) }}>
            어디개 앱 이용을 위해{"\n"}다음 권한의 허용이 필요합니다.
          </MyText>
        </TopContainer>
        <BottomContainer style={{ opacity: value2 }} width={textWidth}>
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
        <ButtonView style={{ backgroundColor }}>
          <MyText
            fontWeight="medium"
            style={{
              marginTop: rpWidth(19),
              color,
            }}>
            확인
          </MyText>
        </ButtonView>
      </Button>
    </>
  );
};

export default Permissions;
