import React, { useContext } from "react";
import { requestNotifications } from "react-native-permissions";
import { PermissionScreenNavigationProp } from "~/types/navigator";
import Button from "~/components/common/Button";
import CustomHeader from "~/components/navigator/CustomHeader";
import Bell from "~/assets/svg/bell.svg";
import MyText from "~/components/common/MyText";
import styled from "styled-components/native";
import { DimensionsContext } from "~/context/DimensionsContext";
import { View } from "react-native";
import useAnimatedSequence from "~/hooks/useAnimatedSequence";

const TopContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const BottomContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const Permission = ({
  navigation,
}: {
  navigation: PermissionScreenNavigationProp;
}) => {
  const [value1] = useAnimatedSequence({ numOfValues: 1 });
  const { rpHeight } = useContext(DimensionsContext);
  const handlePress = async () => {
    await requestNotifications(["alert", "badge"]);
    navigation.navigate("AddDevice", { isOnboarding: true });
  };

  return (
    <>
      <TopContainer>
        <CustomHeader navigation={navigation} />
        <View>
          <Bell
            width={rpHeight(105)}
            height={rpHeight(121)}
            style={{ alignSelf: "center" }}
          />
          <MyText
            fontSize={24}
            style={{ textAlign: "center", marginTop: rpHeight(59) }}>
            푸시 알림을{"\n"}허용해주세요.
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
          미허용시, 핵심 기능들이 제한될 수 있습니다.
        </MyText>
        <Button
          useCommonMarginBottom
          useBottomInset
          delay={600}
          onPress={handlePress}>
          다음
        </Button>
      </BottomContainer>
    </>
  );
};

export default Permission;
