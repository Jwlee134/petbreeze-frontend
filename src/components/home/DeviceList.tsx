import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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
  const devices = useAppSelector(state => state.device);
  const address = useAppSelector(state => state.common.home.address);
  const value = useRef(new Animated.Value(0)).current;

  const { rpWidth, width, isTablet } = useContext(DimensionsContext);

  const { open, close, modalProps } = useModal();
  const [clickedId, setClickedId] = useState("");

  const device = useMemo(
    () => devices[devices.findIndex(device => device.id === clickedId)],
    [clickedId],
  );

  const onAvatarLongPress = useCallback((id: string) => {
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

  return (
    <>
      {devices.length < 4 ? (
        devices.map((device, i) => (
          <HomeAvatar
            key={device.id}
            device={device}
            index={i}
            length={devices.length}
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
              devices.length < 6 && {
                paddingLeft: rpWidth(10),
              }),
            paddingHorizontal: !isTablet
              ? width * 0.15
              : devices.length > 5
              ? width * 0.09
              : 0,
            alignItems: "center",
          }}>
          {devices.map((device, i) => (
            <HomeAvatar
              key={device.id}
              device={device}
              index={i}
              length={devices.length}
              onAvatarLongPress={onAvatarLongPress}
            />
          ))}
        </Animated.ScrollView>
      )}
      <Modal {...modalProps({ type: "bottom" })}>
        <IosStyleBottomModal title={device?.name} close={close}>
          <HomeBottomModal close={close} device={device} />
        </IosStyleBottomModal>
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
