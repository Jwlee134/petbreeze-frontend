import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import BleManager from "react-native-ble-manager";

import Device from "~/assets/svg/device/device-charging.svg";
import Button from "~/components/common/Button";
import MyText from "~/components/common/MyText";
import SafeAreaContainer from "~/components/common/container/SafeAreaContainer";
import { ChargingCheckScreenNavigationProp } from "~/types/navigator";
import { bleActions } from "~/store/ble";
import permissionCheck from "~/utils/permissionCheck";
import { isAndroid } from "~/utils";
import { useAppSelector } from "~/store";
import { commonActions } from "~/store/common";

const TopContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

const BottomContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const ChargingCheck = ({
  navigation,
}: {
  navigation: ChargingCheckScreenNavigationProp;
}) => {
  const isBleManagerInitialized = useAppSelector(
    state => state.common.isBleManagerInitialized,
  );
  const dispatch = useDispatch();

  const initialize = async () => {
    if (!isBleManagerInitialized) {
      await BleManager.start({ showAlert: false });
      console.log("Module initialized");
      dispatch(commonActions.setIsBleManagerInitialized(true));
    }
    navigation.replace("BleWithoutHeaderStackNav");
    dispatch(bleActions.setStatus("scanning"));
  };

  const handlePress = async () => {
    try {
      await permissionCheck.bluetooth();
      if (isAndroid) {
        await permissionCheck.location();
        await permissionCheck.locationAlways();
      }
      initialize();
    } catch {}
  };

  return (
    <SafeAreaContainer>
      <TopContainer>
        <Device width={100} height={156} />
        <MyText
          fontSize={24}
          style={{
            marginTop: 56,
            textAlign: "center",
          }}>
          충전기를{"\n"}
          연결해주세요.
        </MyText>
      </TopContainer>
      <BottomContainer>
        <Button useCommonMarginBottom onPress={handlePress}>
          다음
        </Button>
      </BottomContainer>
    </SafeAreaContainer>
  );
};

export default ChargingCheck;
