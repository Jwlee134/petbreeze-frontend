import React, { useContext } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import Button from "~/components/common/Button";
import GradientContainer from "~/components/common/container/GradientContainer";
import MyText from "~/components/common/MyText";
import { bleActions } from "~/store/ble";
import { ScanningFailScreenNavigationProp } from "~/types/navigator";
import Exclamation from "~/assets/svg/exclamation/exclamation-mark-white.svg";
import ParagraphWithCheckCircle from "~/components/ble/ParagraphWithCheckCircle";
import { useAppSelector } from "~/store";
import { DimensionsContext } from "~/context/DimensionsContext";

const TopContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

const BottomContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const ScanningFail = ({
  navigation,
}: {
  navigation: ScanningFailScreenNavigationProp;
}) => {
  const { top } = useSafeAreaInsets();
  const dispatch = useDispatch();
  const isInitialized = useAppSelector(
    state => state.storage.init.isInitialized,
  );
  const { rpWidth } = useContext(DimensionsContext);

  return (
    <GradientContainer>
      <TopContainer>
        <View style={{ alignItems: "center" }}>
          <MyText
            fontWeight="medium"
            fontSize={24}
            color="white"
            style={{
              marginTop: top + rpWidth(99),
              textAlign: "center",
              marginBottom: rpWidth(44),
            }}>
            연결 실패{"\n"}확인해주세요.
          </MyText>
          <Exclamation width={rpWidth(12)} height={rpWidth(58)} />
        </View>
      </TopContainer>
      <BottomContainer>
        <View>
          <ParagraphWithCheckCircle isWhiteBackground={false}>
            디바이스에 파란불이 들어오나요?
          </ParagraphWithCheckCircle>
          <ParagraphWithCheckCircle isWhiteBackground={false}>
            디바이스가 가까이에 있나요?
          </ParagraphWithCheckCircle>
          <ParagraphWithCheckCircle isWhiteBackground={false}>
            디바이스의 블루투스가 켜져있나요?
          </ParagraphWithCheckCircle>
        </View>
        <View>
          <Button
            onPress={() => {
              navigation.replace("Scanning");
              dispatch(bleActions.setStatus("scanning"));
            }}
            backgroundColor="rgba(255, 255, 255, 0.3)"
            style={{
              marginBottom: rpWidth(12),
            }}>
            다시 시도
          </Button>
          <Button
            onPress={() => navigation.replace("BleWithHeaderStackNav")}
            useCommonMarginBottom
            useBottomInset
            backgroundColor="transparent"
            fontColor="rgba(255, 255, 255, 0.5)">
            중단
          </Button>
        </View>
      </BottomContainer>
    </GradientContainer>
  );
};

export default ScanningFail;
