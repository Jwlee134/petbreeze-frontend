import React, { useContext } from "react";
import styled from "styled-components/native";
import Device from "~/assets/svg/device/device-charging.svg";
import Button from "~/components/common/Button";
import MyText from "~/components/common/MyText";
import { useAppSelector } from "~/store";
import { ChargingCheckScreenNavigationProp } from "~/types/navigator";
import { commonActions } from "~/store/common";
import { bleActions } from "~/store/ble";
import permissionCheck from "~/utils/permissionCheck";
import BleManager from "react-native-ble-manager";
import { useDispatch } from "react-redux";
import { DimensionsContext } from "~/context/DimensionsContext";
import { IS_ANDROID } from "~/constants";

const TopContainer = styled.View`
  flex: 1;
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
  const { rpHeight } = useContext(DimensionsContext);
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
      if (IS_ANDROID) {
        await permissionCheck.location();
        await permissionCheck.locationAlways();
      }
      initialize();
    } catch {}
  };

  return (
    <>
      <TopContainer>
        <Device
          width={rpHeight(100)}
          height={rpHeight(156)}
          style={{ alignSelf: "center" }}
        />
        <MyText
          fontSize={24}
          style={{ marginTop: rpHeight(44), textAlign: "center" }}>
          충전기에{"\n"}
          연결해주세요.
        </MyText>
      </TopContainer>
      <BottomContainer>
        <Button useCommonMarginBottom useBottomInset onPress={handlePress}>
          다음
        </Button>
      </BottomContainer>
    </>
  );
};

export default ChargingCheck;
