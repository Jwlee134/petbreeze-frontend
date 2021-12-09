import React, { useContext } from "react";
import { Animated, View } from "react-native";
import styled from "styled-components/native";
import Button from "~/components/common/Button";
import { DimensionsContext } from "~/context/DimensionsContext";
import useAnimatedSequence from "~/hooks/useAnimatedSequence";
import { AddDeviceScreenNavigationProp } from "~/types/navigator";
import Device from "~/assets/svg/device/device.svg";
import CustomHeader from "~/components/navigator/CustomHeader";
import MyText from "~/components/common/MyText";

const TopContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const BottomContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const AddDevice = ({
  navigation,
}: {
  navigation: AddDeviceScreenNavigationProp;
}) => {
  const [value1] = useAnimatedSequence({ numOfValues: 1 });
  const { rpHeight } = useContext(DimensionsContext);

  const handleNewDevice = () => navigation.navigate("BleRootStackNav");

  const handleInvitationCode = () => navigation.navigate("InvitationCodeForm");

  const handleSkip = () =>
    navigation.reset({ index: 0, routes: [{ name: "BottomTabNav" }] });

  return (
    <>
      <TopContainer>
        <CustomHeader navigation={navigation} />
        <View>
          <Device
            width={rpHeight(100)}
            height={rpHeight(156)}
            style={{ alignSelf: "center" }}
          />
          <MyText
            fontSize={24}
            style={{ textAlign: "center", marginTop: rpHeight(44) }}>
            디바이스를{"\n"}추가해주세요.
          </MyText>
        </View>
      </TopContainer>
      <BottomContainer>
        <MyText
          style={{
            marginTop: rpHeight(44),
            opacity: value1,
            textAlign: "center",
          }}
          color="rgba(0, 0, 0, 0.7)"
          fontSize={14}
          fontWeight="light">
          이미 등록된 디바이스는 유저가 보내준{"\n"}초대코드에 의해서만
          추가등록이 가능합니다.
        </MyText>
        <Animated.View style={{ opacity: value1 }}>
          <Button style={{ marginBottom: 9 }} onPress={handleNewDevice}>
            새로 등록하기
          </Button>
          <Button style={{ marginBottom: 9 }} onPress={handleInvitationCode}>
            초대코드로 등록하기
          </Button>
          <Button
            backgroundColor="transparent"
            fontColor="rgba(0, 0, 0, 0.5)"
            useBottomInset
            useCommonMarginBottom
            onPress={handleSkip}>
            건너뛰기
          </Button>
        </Animated.View>
      </BottomContainer>
    </>
  );
};

export default AddDevice;
