import React, { useContext, useMemo, useState } from "react";
import styled, { css } from "styled-components/native";
import useModal from "~/hooks/useModal";
import { useAppSelector } from "~/store";
import AnimatedCircularProgress from "../common/AnimatedCircularProgress";
import Modal from "react-native-modal";
import IosStyleBottomModal from "../modal/IosStyleBottomModal";
import HomeBottomModal from "../modal/HomeBottomModal";
import { ScrollView } from "react-native";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";

interface IPressable {
  index?: number;
  deviceLength?: number;
  rpWidth: RpWidth;
}

const Pressable = styled.Pressable<IPressable>`
  position: absolute;
  bottom: ${({ rpWidth }) => rpWidth(40)}px;
  ${({ index, deviceLength, rpWidth }) => {
    switch (deviceLength) {
      case 1:
        return css`
          align-self: center;
        `;
      case 2:
        return css`
          margin-left: -${rpWidth(45)}px;
          ${index === 0 ? { left: "33%" } : { left: "66%" }}
        `;
      case 3:
        return css`
          align-self: center;
          ${index === 0
            ? { left: "15%" }
            : index === 1
            ? {}
            : { right: "15%" }};
        `;
      default:
        return css`
          position: relative;
          bottom: 0;
          margin: 0px ${rpWidth(10)}px;
        `;
    }
  }}
`;

const DeviceList = () => {
  const deviceList = useAppSelector(state => state.device);
  const { open, close, modalProps } = useModal();
  const [clickedId, setClickedId] = useState("");
  const { rpWidth, width, isTablet } = useContext(DimensionsContext);

  const device = useMemo(() => {
    return deviceList[deviceList.findIndex(device => device.id === clickedId)];
  }, [clickedId]);

  return (
    <>
      {deviceList.length < 4 ? (
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
            <AnimatedCircularProgress
              circleWidth={deviceList.length > 2 ? 70 : 90}
              lineWidth={deviceList.length > 2 ? 5 : 7}
              battery={device.battery}
              highlightOnEmergency={device.emergency}
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
            marginBottom: rpWidth(30),
            height: rpWidth(95),
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
          {deviceList.map(device => (
            <Pressable
              rpWidth={rpWidth}
              key={device.id}
              onLongPress={() => {
                setClickedId(device.id);
                open();
              }}>
              <AnimatedCircularProgress
                preventRpHeight
                circleWidth={70}
                lineWidth={5}
                battery={device.battery}
                highlightOnEmergency={device.emergency}
              />
            </Pressable>
          ))}
        </ScrollView>
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
