import React, { useContext, useMemo, useState } from "react";
import styled, { css } from "styled-components/native";
import useModal from "~/hooks/useModal";
import { useAppSelector } from "~/store";
import DeviceAvatarCircle from "../common/DeviceAvatarCircle";
import Modal from "react-native-modal";
import IosStyleBottomModal from "../modal/IosStyleBottomModal";
import HomeBottomModal from "../modal/HomeBottomModal";
import { ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";

interface IPressable {
  index?: number;
  deviceLength?: number;
  rpWidth: RpWidth;
}

const Pressable = styled.Pressable<IPressable>`
  ${({ index, deviceLength, rpWidth }) => {
    switch (deviceLength) {
      case 1:
        return css`
          position: absolute;
          bottom: 0;
          align-self: center;
          margin-bottom: ${rpWidth(24)}px;
        `;
      case 2:
        return css`
          position: absolute;
          bottom: 0;
          margin-left: -${rpWidth(45)}px;
          ${index === 0
            ? {
                left: "33%",
              }
            : {
                left: "66%",
              }}
        `;
      default:
        return css`
          margin: 0px ${rpWidth(8)}px;
        `;
    }
  }}
`;

const DeviceList = () => {
  const deviceList = useAppSelector(state => state.device);
  const { open, close, modalProps } = useModal();
  const [clickedId, setClickedId] = useState("");
  const { rpWidth, width } = useContext(DimensionsContext);

  const device = useMemo(() => {
    return deviceList[deviceList.findIndex(device => device.id === clickedId)];
  }, [clickedId]);

  return (
    <>
      {deviceList.length < 3 ? (
        deviceList.map((device, i) => (
          <Pressable
            rpWidth={rpWidth}
            key={device.id}
            index={i}
            deviceLength={deviceList.length}
            onLongPress={() => {
              setClickedId(device.id);
              open();
            }}>
            <DeviceAvatarCircle
              circleWidth={90}
              lineWidth={7}
              battery={device.battery}
            />
          </Pressable>
        ))
      ) : (
        <>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              position: "absolute",
              bottom: 0,
              marginBottom: rpWidth(36),
            }}
            contentContainerStyle={{
              width: width - rpWidth(80),
            }}>
            {deviceList.map((device, i) => (
              <Pressable
                rpWidth={rpWidth}
                key={device.id}
                style={{
                  ...(i === 0 && { marginLeft: rpWidth(16) }),
                }}
                onLongPress={() => {
                  setClickedId(device.id);
                  open();
                }}>
                <DeviceAvatarCircle
                  circleWidth={70}
                  lineWidth={5}
                  battery={device.battery}
                />
              </Pressable>
            ))}
          </ScrollView>
        </>
      )}
      <Modal {...modalProps({ type: "bottom" })}>
        <IosStyleBottomModal
          title={device?.name}
          titleHeight={rpWidth(41)}
          close={close}>
          <HomeBottomModal close={close} device={device} />
        </IosStyleBottomModal>
      </Modal>
    </>
  );
};

export default DeviceList;
