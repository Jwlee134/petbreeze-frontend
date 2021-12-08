import React, { useContext } from "react";
import styled from "styled-components/native";
import CustomHeader from "~/components/navigator/CustomHeader";
import { InvitationCodeCheckScreenNavigationProp } from "~/types/navigator";
import Icon from "~/assets/svg/invitation-code.svg";
import { DimensionsContext } from "~/context/DimensionsContext";
import MyText from "~/components/common/MyText";
import Button from "~/components/common/Button";
import { View } from "react-native";

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const InvitationCodeCheck = ({
  navigation,
}: {
  navigation: InvitationCodeCheckScreenNavigationProp;
}) => {
  const { rpHeight } = useContext(DimensionsContext);

  const onNext = () => navigation.navigate("InvitationCodeForm");

  const onNoPress = () => navigation.navigate("NewDeviceCheck");

  return (
    <>
      <CustomHeader navigation={navigation} />
      <Container>
        <View>
          <Icon
            width={rpHeight(127)}
            height={rpHeight(22)}
            style={{ alignSelf: "center", marginTop: rpHeight(190) }}
          />
          <MyText
            fontSize={24}
            style={{ textAlign: "center", marginTop: rpHeight(64) }}>
            초대코드가{"\n"}있으신가요?
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
            onPress={onNoPress}>
            아니오
          </Button>
        </View>
      </Container>
    </>
  );
};

export default InvitationCodeCheck;
