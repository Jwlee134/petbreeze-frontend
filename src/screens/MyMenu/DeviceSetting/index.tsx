import React from "react";
import styled from "styled-components/native";
import ListItem from "~/components/common/ListItem";
import { DeviceSettingScreenNavigationProp } from "~/types/navigator";
import { ScrollView } from "react-native";

const Text = styled.Text`
  font-size: 16px;
`;

const DeviceSetting = ({
  navigation,
}: {
  navigation: DeviceSettingScreenNavigationProp;
}) => {
  return (
    <ScrollView>
      <ListItem
        onPress={() => navigation.navigate("DeviceList")}
        RightIcon={() => (
          <Text style={{ textDecorationLine: "underline" }}>관리</Text>
        )}>
        기기 목록
      </ListItem>
      <ListItem
        onPress={() => navigation.navigate("LocationCollectInterval")}
        RightIcon={() => (
          <Text style={{ textDecorationLine: "underline" }}>설정</Text>
        )}>
        위치정보 수집주기
      </ListItem>
      <ListItem
        onPress={() => navigation.navigate("SafetyZoneSetting")}
        RightIcon={() => (
          <Text style={{ textDecorationLine: "underline" }}>등록</Text>
        )}>
        안심존 설정
      </ListItem>
      <ListItem
        onPress={() => navigation.navigate("WifiSSID")}
        RightIcon={() => (
          <Text style={{ textDecorationLine: "underline" }}>등록</Text>
        )}>
        WIFI SSID
      </ListItem>
      <ListItem>배터리 잔량</ListItem>
      <ListItem RightIcon={() => <Text>1.0.0.</Text>}>앱 버전</ListItem>
      <ListItem>펌웨어 버전</ListItem>
    </ScrollView>
  );
};

export default DeviceSetting;
