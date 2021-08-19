import React from "react";
import styled from "styled-components/native";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";
import Device from "~/components/common/Device";
import { rpWidth } from "~/styles";

const Container = styled.ScrollView``;

const DeviceSettingList = ({ navigation, route }) => {
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
