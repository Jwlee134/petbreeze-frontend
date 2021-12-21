import React, { useContext } from "react";
import { requestNotifications } from "react-native-permissions";
import { PermissionScreenProps } from "~/types/navigator";
import Button from "~/components/common/Button";
import CustomHeader from "~/components/navigator/CustomHeader";
import Bell from "~/assets/svg/permission/bell.svg";
import MyText from "~/components/common/MyText";
import styled from "styled-components/native";
import { DimensionsContext } from "~/context/DimensionsContext";
import { View } from "react-native";
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const Permission = ({
  navigation,
  route: { params: { isLogIn } = {} },
}: PermissionScreenProps) => {
  const value = useSharedValue(0);
  const opacity = useAnimatedStyle(() => {
    value.value = 1;
    return {
      opacity: withDelay(
        400,
        withTiming(value.value, { duration: 200, easing: Easing.linear }),
      ),
    };
  });
  const { rpHeight } = useContext(DimensionsContext);
  const dispatch = useDispatch();

  const handlePress = async () => {
    await requestNotifications(["alert", "badge"]);
    dispatch(storageActions.setInit({ isPermissionAllowed: true }));
    if (isLogIn) {
      navigation.replace("BottomTabNav");
    } else {
      navigation.navigate("AddDevice", { isOnboarding: true });
    }
  };

  return (
    <>
      <Container>
        <CustomHeader navigation={!isLogIn ? navigation : undefined} />
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
      </Container>
      <Container>
        <MyText
          style={{ marginTop: rpHeight(44), textAlign: "center" }}
          animatedStyle={opacity}
          color="rgba(0, 0, 0, 0.7)"
          fontSize={14}
          fontWeight="light">
          미허용시, 핵심 기능들이 제한될 수 있습니다.
        </MyText>
        <Button
          useCommonMarginBottom
          useBottomInset
          delay={800}
          onPress={handlePress}>
          다음
        </Button>
      </Container>
    </>
  );
};

export default Permission;
