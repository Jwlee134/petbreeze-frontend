import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import useDevice from "~/hooks/useDevice";
import { useAppSelector } from "~/store";
import MyText from "../common/MyText";
import Clip from "~/assets/svg/clip.svg";
import Clipboard from "@react-native-clipboard/clipboard";
import Toast from "react-native-toast-message";
import { Animated, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Container = styled(Animated.View)`
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: flex-end;
  padding-left: 37px;
`;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 17px;
`;

const SpaceBetweenContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  flex-shrink: 1;
`;

const Button = styled.TouchableOpacity`
  width: 76px;
  height: 52px;
  justify-content: center;
  align-items: center;
`;

const AddressBlock = () => {
  const deviceList = useDevice();
  const address = useAppSelector(state => state.common.home.address);
  const pressedID = useAppSelector(state => state.common.home.pressedID);
  const deviceCoord = useAppSelector(state => state.common.home.deviceCoord);
  const showDeviceLocation = useAppSelector(
    state => state.common.home.showDeviceLocation,
  );
  const areaRadius = useAppSelector(state => state.common.home.areaRadius);
  const { top } = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const value = useRef(new Animated.Value(0)).current;

  const translateY = value.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 0],
  });

  useEffect(() => {
    Animated.timing(value, {
      toValue: showDeviceLocation ? 1 : 0,
      useNativeDriver: true,
      duration: 200,
    }).start();
  }, [showDeviceLocation]);

  const onClipPress = () => {
    if (areaRadius) return;
    Clipboard.setString(address);
    Toast.show({
      type: "notification",
      text1: "클립보드에 복사되었습니다.",
    });
  };

  return (
    <Container
      style={{
        width,
        height: top + 52,
        transform: [{ translateY }],
      }}>
      {deviceList && pressedID && address && deviceCoord.time ? (
        <Wrapper>
          <Avatar
            source={{
              uri: deviceList[
                deviceList.findIndex(device => device.id === pressedID)
              ].profile_image,
            }}
          />
          <SpaceBetweenContainer>
            <View style={{ flexShrink: 1 }}>
              <MyText numberOfLines={1} fontSize={14} fontWeight="medium">
                {address}
              </MyText>
              <MyText color="rgba(0, 0, 0, 0.5)" fontSize={12}>
                {new Date(deviceCoord.time).getHours()}:
                {new Date(deviceCoord.time).getMinutes()}
              </MyText>
            </View>
            <Button onPress={onClipPress}>
              {!areaRadius ? <Clip /> : null}
            </Button>
          </SpaceBetweenContainer>
        </Wrapper>
      ) : null}
    </Container>
  );
};

export default AddressBlock;
