import { useNavigation } from "@react-navigation/core";
import React, { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styled, { css } from "styled-components/native";
import { useAppSelector } from "~/store";
import { MyPageScreenNavigationProp } from "~/types/navigator";
import DeviceAvatarCircle from "../common/DeviceAvatarCircle";
import MyText from "../common/MyText";
import Footprint from "~/assets/svg/tab/footprint-outline.svg";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";
import { navigatorActions } from "~/store/navigator";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";

const DeviceContainer = styled.ScrollView<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    padding-top: ${rpWidth(25)}px;
    padding-bottom: ${rpWidth(21)}px;
  `}
`;

const AvatarButton = styled.TouchableOpacity`
  align-items: center;
`;

const Svg = styled.View<{ rpWidth: RpWidth }>`
  background-color: rgba(0, 0, 0, 0.03);
  justify-content: center;
  align-items: center;
  ${({ rpWidth }) => css`
    width: ${rpWidth(70)}px;
    height: ${rpWidth(70)}px;
    border-radius: ${rpWidth(35)}px;
    margin-top: ${rpWidth(25)}px;
    margin-bottom: ${rpWidth(15)}px;
  `}
`;

const DeviceList = () => {
  const devices = useAppSelector(state => state.device);
  const navigation = useNavigation<MyPageScreenNavigationProp>();
  const dispatch = useDispatch();
  const { rpWidth, width } = useContext(DimensionsContext);

  return (
    <View>
      {devices.length ? (
        <>
          {devices.length > 3 ? (
            <LinearGradient
              pointerEvents="none"
              colors={["#FFFFFF", "#FFFFFF00"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                position: "absolute",
                left: 0,
                width: rpWidth(70),
                height: "100%",
                zIndex: 1,
              }}
            />
          ) : null}
          <DeviceContainer
            rpWidth={rpWidth}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              ...(devices.length < 4
                ? {
                    flexGrow: 1,
                    justifyContent: "center",
                  }
                : {
                    paddingHorizontal: width * 0.25,
                  }),
            }}>
            {devices.map((device, i) => (
              <AvatarButton
                style={{
                  marginHorizontal: width * 0.07,
                  ...(i === 0 && { marginLeft: 0 }),
                  ...(i === devices.length - 1 && { marginRight: 0 }),
                }}
                onPress={() => {
                  navigation.navigate("DeviceSetting", {
                    data: device,
                  });
                }}
                key={device.id}>
                <DeviceAvatarCircle preventRpHeight />
                <MyText style={{ marginTop: rpWidth(15) }}>
                  {device.name}
                </MyText>
              </AvatarButton>
            ))}
          </DeviceContainer>
          {devices.length > 3 ? (
            <LinearGradient
              pointerEvents="none"
              colors={["#FFFFFF00", "#FFFFFF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                position: "absolute",
                right: 0,
                width: rpWidth(70),
                height: "100%",
                zIndex: 1,
              }}
            />
          ) : null}
        </>
      ) : (
        <TouchableOpacity
          onPress={() => {
            dispatch(
              storageActions.setDevice({
                redirectionRouteName: "MyPage",
              }),
            );
            dispatch(
              navigatorActions.setInitialRoute({
                initialBleWithHeaderStackNavRouteName: "ChargingCheck",
              }),
            );
            navigation.navigate("BleRootStackNav");
          }}
          style={{ alignItems: "center" }}>
          <Svg rpWidth={rpWidth}>
            <Footprint width={rpWidth(44)} height={rpWidth(42)} opacity={0.3} />
          </Svg>
          <MyText
            style={{ marginBottom: rpWidth(21) }}
            fontWeight="light"
            color="rgba(0, 0, 0, 0.3)">
            디바이스를 등록해주세요
          </MyText>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DeviceList;
