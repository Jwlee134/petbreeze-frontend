import React, { useContext } from "react";
import { requestNotifications } from "react-native-permissions";
import { PermissionScreenNavigationProp } from "~/types/navigator";
import Button from "~/components/common/Button";
import CustomHeader from "~/components/navigator/CustomHeader";
import Bell from "~/assets/svg/bell.svg";
import MyText from "~/components/common/MyText";
import styled from "styled-components/native";
import { View } from "react-native";
import { DimensionsContext } from "~/context/DimensionsContext";

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const Permission = ({
  navigation,
}: {
  navigation: PermissionScreenNavigationProp;
}) => {
  const { rpHeight } = useContext(DimensionsContext);
  const handlePress = async () => {
    await requestNotifications(["alert", "badge"]);
    navigation.navigate("InvitationCodeCheck");
  };

  return (
    <>
      <CustomHeader navigation={navigation} />
      <Container>
        <View>
          <Bell
            width={rpHeight(105)}
            height={rpHeight(121)}
            style={{ alignSelf: "center", marginTop: rpHeight(106) }}
          />
          <MyText
            fontSize={24}
            style={{ textAlign: "center", marginVertical: rpHeight(48) }}>
            푸시 알림을{"\n"}허용해주세요.
          </MyText>
          <MyText
            style={{ textAlign: "center" }}
            color="rgba(0, 0, 0, 0.7)"
            fontWeight="light"
            fontSize={14}>
            미허용시, 핵심 기능들이 제한될 수 있습니다.
          </MyText>
        </View>
        <Button
          useCommonMarginBottom
          useBottomInset
          delay={400}
          onPress={handlePress}>
          확인
        </Button>
      </Container>
    </>
  );
};

export default Permission;
