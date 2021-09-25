import React, { useContext } from "react";
import styled from "styled-components/native";
import Button from "~/components/common/Button";
import SafeAreaContainer from "~/components/common/container/SafeAreaContainer";
import MyText from "~/components/common/MyText";
import { DimensionsContext } from "~/context/DimensionsContext";
import palette from "~/styles/palette";
import setInitialRoute from "~/utils/setInitialRoute";

const DeviceAlert = ({ navigation, route }) => {
  const { rpWidth } = useContext(DimensionsContext);

  const handlePress = () => {
    setInitialRoute();
    navigation.replace("LoggedInNav");
  };

  return (
    <SafeAreaContainer style={{ justifyContent: "space-between" }}>
      <MyText
        style={{
          textAlign: "center",
          marginTop: rpWidth(53),
          marginBottom: rpWidth(43),
        }}
        fontWeight="medium"
        fontSize={20}
        color={palette.blue_7b}>
        앗 ! 연결이 끊어졌어요.
      </MyText>
      <Button useCommonMarginBottom onPress={handlePress}>
        확인
      </Button>
    </SafeAreaContainer>
  );
};

export default DeviceAlert;
