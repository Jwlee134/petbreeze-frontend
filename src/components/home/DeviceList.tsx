import React, { useMemo, useState } from "react";
import styled, { css } from "styled-components/native";
import useModal from "~/hooks/useModal";
import { useAppSelector } from "~/store";
import DeviceAvatarCircle from "../common/DeviceAvatarCircle";
import Modal from "react-native-modal";
import IosStyleBottomModal from "../modal/IosStyleBottomModal";
import HomeBottomModal from "../modal/HomeBottomModal";
import { rpWidth } from "~/styles";
import { ScrollView } from "react-native";

interface IPressable {
  index?: number;
  deviceLength?: number;
}

const Pressable = styled.Pressable<IPressable>`
  ${({ index, deviceLength }) => {
    switch (deviceLength) {
      case 1:
        return css`
          position: absolute;
          bottom: 0;
          left: 50%;
          margin-left: -${rpWidth(45)}px;
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
      case 3:
        return css`
          position: absolute;
          bottom: 0;
          margin-left: -${rpWidth(45)}px;
          ${index === 0
            ? { left: "20%" }
            : index === 1
            ? { left: "50%" }
            : { left: "80%" }}
        `;
      default:
        return css`
          margin: 0px ${rpWidth(30)}px;
        `;
    }
  }}
  width: ${rpWidth(90)}px;
  border-radius: ${rpWidth(45)}px;
`;

const DeviceList = () => {
  const deviceList = useAppSelector(state => state.device);
  const { open, close, modalProps } = useModal();
  const [clickedId, setClickedId] = useState("");

  const device = useMemo(() => {
    return deviceList[deviceList.findIndex(device => device.id === clickedId)];
  }, [clickedId]);

  return (
    <>
      {deviceList.length < 4 ? (
        deviceList.map((device, i) => (
          <Pressable
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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            position: "absolute",
            bottom: 0,
            marginBottom: rpWidth(48),
          }}>
          {deviceList.map(device => (
            <Pressable
              key={device.id}
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
          ))}
        </ScrollView>
      )}
      <Modal {...modalProps({ type: "bottom" })}>
        <IosStyleBottomModal close={close}>
          <HomeBottomModal close={close} device={device} />
        </IosStyleBottomModal>
      </Modal>
    </>
  );
};

export default DeviceList;
