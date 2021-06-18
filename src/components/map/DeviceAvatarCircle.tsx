import React from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components/native";
import { useAppSelector } from "~/store";
import { deviceActions } from "~/store/device";

interface IContainerProps {
  selected: boolean;
  numOfDevices?: number;
  index?: number;
  isScrollable?: boolean;
  isFirst?: boolean;
}

const width = Dimensions.get("screen").width;

const getStyles = (selected: boolean, numOfDevices: number, index: number) => {
  if (numOfDevices === 1) {
    return css`
      left: ${width / 2 - (selected ? 30.5 : 27.5)}px;
    `;
  }
  if (numOfDevices === 2) {
    if (index === 0) {
      return css`
        left: ${width * (1 / 3) - (selected ? 35.5 : 27.5)}px;
      `;
    } else {
      return css`
        left: ${width * (2 / 3) - (selected ? 35.5 : 27.5)}px;
      `;
    }
  }
  if (numOfDevices === 3) {
    if (index === 0) {
      return css`
        left: ${width * (1 / 4) - (selected ? 35.5 : 27.5)}px;
      `;
    } else if (index === 1) {
      return css`
        left: ${width * (2 / 4) - (selected ? 35.5 : 27.5)}px;
      `;
    } else {
      return css`
        left: ${width * (3 / 4) - (selected ? 35.5 : 27.5)}px;
      `;
    }
  }
};

const DeviceAvatarContainer = styled.TouchableOpacity<IContainerProps>`
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 27.5px;
  margin-bottom: 35px;
  ${({ isScrollable, selected }) =>
    !isScrollable
      ? css`
          position: absolute;
          bottom: 0px;
        `
      : css`
          margin-right: ${selected ? "27px" : "35px"};
          margin-top: ${selected ? "0px" : "8px"};
          margin-left: ${selected ? "-8px" : "0px"};
        `};
  ${({ selected, isScrollable }) =>
    selected &&
    css`
      width: 71px;
      height: 71px;
      border-radius: 35.5px;
      background-color: rgba(110, 65, 226, 0.46);
      margin-bottom: 27px;
    `};
  ${({ isFirst, selected }) =>
    isFirst &&
    css`
      margin-left: ${selected ? "27px" : "35px"};
    `};
  ${({ selected, numOfDevices, index }) => {
    if (numOfDevices !== undefined && index !== undefined)
      return getStyles(selected, numOfDevices, index);
  }};
`;

const DeviceAvatar = styled.Image`
  width: 55px;
  height: 55px;
  border-radius: 27.5px;
`;

const DeviceAvatarCircle = () => {
  const devices = useAppSelector(state => state.device);
  const dispatch = useDispatch();

  const handlePress = (id: number) => {
    dispatch(deviceActions.setSelected(id));
  };

  if (devices.length < 4) {
    return (
      <View>
        {devices.map((device, index) => (
          <DeviceAvatarContainer
            onPress={() => {
              if (!device.selected) handlePress(device.id);
            }}
            numOfDevices={devices.length}
            key={index}
            index={index}
            activeOpacity={0.5}
            selected={device.selected}>
            <DeviceAvatar source={require("~/assets/image/test.jpg")} />
          </DeviceAvatarContainer>
        ))}
      </View>
    );
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ position: "absolute", bottom: 0 }}
      contentContainerStyle={{
        flexGrow: 1,
        flexDirection: "row",
        justifyContent: "space-between",
      }}>
      {devices.map((device, index) => (
        <DeviceAvatarContainer
          key={index}
          selected={device.selected}
          isScrollable
          isFirst={index === 0}
          activeOpacity={0.7}>
          <DeviceAvatar source={require("~/assets/image/test.jpg")} />
        </DeviceAvatarContainer>
      ))}
    </ScrollView>
  );
};

export default DeviceAvatarCircle;
