import React from "react";
import styled from "styled-components/native";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";
import Device from "~/components/common/WalkDeviceListItem";
import { rpWidth } from "~/styles";
import {
  DeviceSettingListRouteProp,
  DeviceSettingScreenNavigationProp,
} from "~/types/navigator";

const Container = styled.ScrollView``;

const DeviceSettingList = ({
  navigation,
  route,
}: {
  navigation: DeviceSettingScreenNavigationProp;
  route: DeviceSettingListRouteProp;
}) => {
  const devices = route?.params?.data;

  return (
    <Container
      contentContainerStyle={{
        paddingTop: rpWidth(30),
        flexGrow: 1,
      }}>
      <SidePaddingContainer>
        {devices.map(device => (
          <Device
            lineWidth={2}
            circleWidth={70}
            isIconArrow
            key={device.id}
            data={device}
            onPress={() =>
              navigation.navigate("DeviceSetting", {
                data: device,
              })
            }
          />
        ))}
      </SidePaddingContainer>
    </Container>
  );
};

export default DeviceSettingList;
