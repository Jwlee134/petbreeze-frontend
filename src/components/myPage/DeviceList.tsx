import { useNavigation } from "@react-navigation/core";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components/native";
import { useAppSelector } from "~/store";
import { isTablet, rpWidth } from "~/styles";
import { MyPageScreenNavigationProp } from "~/types/navigator";
import DeviceAvatarCircle from "../common/DeviceAvatarCircle";
import MyText from "../common/MyText";
import Footprint from "~/assets/svg/tab/footprint-outline.svg";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";
import { navigatorActions } from "~/store/navigator";

const DeviceContainer = styled.ScrollView`
  padding-top: ${rpWidth(25)}px;
  padding-bottom: ${rpWidth(21)}px;
`;

const AvatarButton = styled.TouchableOpacity`
  align-items: center;
  margin: 0 ${rpWidth(25)}px;
`;

const Svg = styled.View`
  background-color: rgba(0, 0, 0, 0.03);
  width: ${rpWidth(70)}px;
  height: ${rpWidth(70)}px;
  border-radius: ${rpWidth(35)}px;
  justify-content: center;
  align-items: center;
  margin-top: ${rpWidth(25)}px;
  margin-bottom: ${rpWidth(15)}px;
`;

const DeviceList = () => {
  const devices = useAppSelector(state => state.device);
  const navigation = useNavigation<MyPageScreenNavigationProp>();
  const dispatch = useDispatch();

  return (
    <View>
      {devices.length ? (
        <>
          {devices.length > (isTablet ? 4 : 3) ? (
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
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              ...(devices.length < (isTablet ? 5 : 4)
                ? {
                    flexGrow: 1,
                    justifyContent: "center",
                  }
                : {
                    paddingHorizontal: "18%",
                  }),
            }}>
            {devices.map(device => (
              <AvatarButton
                onPress={() => {
                  navigation.navigate("DeviceSetting", {
                    data: device,
                  });
                }}
                key={device.id}>
                <DeviceAvatarCircle />
                <MyText style={{ marginTop: rpWidth(15) }}>
                  {device.name}
                </MyText>
              </AvatarButton>
            ))}
          </DeviceContainer>
          {devices.length > (isTablet ? 4 : 3) ? (
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
            dispatch(storageActions.setRedirectionRouteName("MyPage"));
            dispatch(
              navigatorActions.setInitialRoute({
                initialBleWithHeaderStackNavRouteName: "ChargingCheck",
              }),
            );
            navigation.navigate("BleRootStackNav");
          }}
          style={{ alignItems: "center" }}>
          <Svg>
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
