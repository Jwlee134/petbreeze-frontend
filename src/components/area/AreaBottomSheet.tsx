import React from "react";
import { KeyboardAvoidingView } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Shadow } from "react-native-shadow-2";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import Button from "~/components/common/Button";
import { useAppSelector } from "~/store";
import { deviceSettingActions } from "~/store/deviceSetting";
import { isIos } from "~/utils";
import AreaInputs from "./AreaInputs";

const Container = styled(Animated.View)`
  background-color: white;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding-bottom: 32px;
`;

const HandleContainer = styled.View`
  height: 36px;
  align-items: center;
`;

const Handle = styled.View`
  width: 29px;
  height: 3px;
  margin-top: 8px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 100px;
`;

interface Props {
  height: number;
  style: {
    transform: {
      translateY: number;
    }[];
  };
}

const AreaBottomSheet = ({ height, style }: Props) => {
  const step2 = useAppSelector(state => state.deviceSetting.area.step2);
  const name = useAppSelector(state => state.deviceSetting.draft.area.name);
  const radius = useAppSelector(state => state.deviceSetting.draft.area.radius);
  const isSubmitting = useAppSelector(
    state => state.deviceSetting.area.isSubmitting,
  );

  const dispatch = useDispatch();
  const { bottom } = useSafeAreaInsets();

  const handleFinish = () => {
    dispatch(deviceSettingActions.setArea({ isSubmitting: true }));
  };

  return (
    <KeyboardAvoidingView
      pointerEvents={step2 ? undefined : "none"}
      behavior={isIos ? "padding" : undefined}
      keyboardVerticalOffset={-85 - bottom}>
      <Container style={[{ height }, style]}>
        <Shadow
          distance={15}
          startColor="rgba(0, 0, 0, 0.05)"
          sides={["top"]}
          radius={15}
          corners={["topLeft", "topRight"]}
          viewStyle={{ width: "100%" }}>
          <HandleContainer>
            <Handle />
          </HandleContainer>
        </Shadow>
        <AreaInputs style={{ marginBottom: 13 }} />
        <Button
          disabled={!name || !radius}
          isLoading={isSubmitting}
          onPress={handleFinish}>
          다음
        </Button>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default AreaBottomSheet;
