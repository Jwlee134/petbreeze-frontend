import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAppSelector } from "~/store";
import { Animated } from "react-native";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import HomeAvatar from "./HomeAvatar";
import Modal from "react-native-modal";
import useModal from "~/hooks/useModal";
import IosStyleBottomModal from "../modal/IosStyleBottomModal";
import HomeBottomModal from "../modal/HomeBottomModal";
import styled from "styled-components/native";
import MyText from "../common/MyText";
import palette from "~/styles/palette";
import useDevice from "~/hooks/useDevice";
import { noName } from "~/constants";

const Address = styled(Animated.View)<{ rpWidth: RpWidth }>`
  height: ${({ rpWidth }) => rpWidth(41)}px;
  background-color: ${palette.blue_7b_80};
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  justify-content: center;
  align-items: center;
`;

const DeviceList = () => {
  const deviceList = useDevice();
  const address = useAppSelector(state => state.common.home.address);
  const value = useRef(new Animated.Value(0)).current;

  const { rpWidth, width, isTablet } = useContext(DimensionsContext);

  const { open, close, modalProps } = useModal();
  const [clickedId, setClickedId] = useState(0);

  const device = deviceList?.length
    ? deviceList[deviceList.findIndex(device => device.id === clickedId)]
    : null;

  const onAvatarLongPress = useCallback((id: number) => {
    setClickedId(id);
    open();
  }, []);

  const translateYAvatar = value.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -rpWidth(41)],
  });

  const translateY = value.interpolate({
    inputRange: [0, 1],
    outputRange: [rpWidth(41), 0],
  });

  useEffect(() => {
    Animated.timing(value, {
      toValue: address ? 1 : 0,
      useNativeDriver: true,
      duration: 200,
    }).start();
  }, [address]);

  if (!deviceList || !deviceList.length) return null;

  return (
    <>
      {deviceList.length < 4 ? (
        deviceList.map((device, i) => (
          <HomeAvatar
            key={device.id}
            device={device}
            index={i}
            length={deviceList.length}
            onAvatarLongPress={onAvatarLongPress}
            style={{
              transform: [{ translateY: translateYAvatar }],
            }}
          />
        ))
      ) : (
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            position: "absolute",
            bottom: 0,
            marginBottom: rpWidth(30),
            height: rpWidth(95),
            transform: [{ translateY: translateYAvatar }],
          }}
          contentContainerStyle={{
            minWidth: isTablet ? 0 : width,
            ...(isTablet &&
              deviceList.length < 6 && {
                paddingLeft: rpWidth(10),
              }),
            paddingHorizontal: !isTablet
              ? width * 0.15
              : deviceList.length > 5
              ? width * 0.09
              : 0,
            alignItems: "center",
          }}>
          {deviceList.map((device, i) => (
            <HomeAvatar
              key={device.id}
              device={device}
              index={i}
              length={deviceList.length}
              onAvatarLongPress={onAvatarLongPress}
            />
          ))}
        </Animated.ScrollView>
      )}
      <Modal {...modalProps({ type: "bottom" })}>
        {device ? (
          <IosStyleBottomModal title={device.name || noName} close={close}>
            <HomeBottomModal close={close} device={device} />
          </IosStyleBottomModal>
        ) : (
          <></>
        )}
      </Modal>
      <Address rpWidth={rpWidth} style={{ transform: [{ translateY }] }}>
        <MyText fontWeight="medium" fontSize={14} color="white">
          {address}
        </MyText>
      </Address>
    </>
  );
};

export default memo(DeviceList);
