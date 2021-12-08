import React, { useContext } from "react";
import styled from "styled-components/native";
import Device from "~/assets/svg/device/device.svg";
import Button from "~/components/common/Button";
import MyText from "~/components/common/MyText";
import { NewDeviceCheckScreenNavigationProp } from "~/types/navigator";
import { DimensionsContext } from "~/context/DimensionsContext";
import CustomHeader from "~/components/navigator/CustomHeader";
import { View } from "react-native";

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const NewDeviceCheck = ({
  navigation,
}: {
  navigation: NewDeviceCheckScreenNavigationProp;
}) => {
  const { rpHeight } = useContext(DimensionsContext);

  const onNext = () => navigation.navigate("BleRootStackNav");
  const onSkip = () =>
    navigation.reset({ index: 0, routes: [{ name: "BottomTabNav" }] });

  return (
    <>
      <CustomHeader navigation={navigation} />
      <Container>
        <View>
          <Device
            width={rpHeight(100)}
            height={rpHeight(156)}
            style={{ alignSelf: "center", marginTop: rpHeight(63) }}
          />
          <MyText
            fontSize={24}
            style={{ marginTop: rpHeight(57), textAlign: "center" }}>
            새로 등록할 디바이스가{"\n"}
            있으신가요?
          </MyText>
        </View>
        <View>
          <Button style={{ marginBottom: 12 }} onPress={onNext} delay={400}>
            네, 있습니다.
          </Button>
          <Button
            backgroundColor="transparent"
            fontColor="rgba(0, 0, 0, 0.5)"
            useCommonMarginBottom
            useBottomInset
            onPress={onSkip}>
            건너뛰기
          </Button>
        </View>
      </Container>
    </>
  );
};

export default NewDeviceCheck;
