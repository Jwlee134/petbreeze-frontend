import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { DeviceSettingScreenNavigationProp } from "~/types/navigator";

const Container = styled.View``;

const DeviceSetting = ({
  navigation,
}: {
  navigation: DeviceSettingScreenNavigationProp;
}) => {
  return (
    <Container>
      <Text>DeviceSetting</Text>
      <TouchableOpacity onPress={() => navigation.navigate("DeviceList")}>
        <Text>기기 목록</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("LocationCollectInterval")}>
        <Text>위치정보 수집주기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("SafetyZoneSetting")}>
        <Text>안심존 설정</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("WifiSSID")}>
        <Text>WIFI SSID</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default DeviceSetting;
