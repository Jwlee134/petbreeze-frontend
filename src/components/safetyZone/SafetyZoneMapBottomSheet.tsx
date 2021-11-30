import React from "react";
import { KeyboardAvoidingView } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Shadow } from "react-native-shadow-2";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import Button from "~/components/common/Button";
import Input from "~/components/common/Input";
import { useAppSelector } from "~/store";
import { deviceSettingActions } from "~/store/deviceSetting";
import { isIos } from "~/utils";
import ScrollPicker from "../common/ScrollPicker";

const Container = styled(Animated.View)`
  background-color: white;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding-bottom: 32px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  padding: 0px 38px;
  margin-bottom: 13px;
`;

const InputContainer = styled.View`
  width: 43%;
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

const data = ["10m", "20m", "30m", "50m", "100m"];

const SafetyZoneMapBottomSheet = ({
  height,
  style,
}: {
  height: number;
  style: {
    transform: {
      translateY: number;
    }[];
  };
}) => {
  const {
    step2,
    draft: { name, radius },
    isSubmitting,
    fromDeviceSetting,
  } = useAppSelector(state => state.deviceSetting.safetyZone);
  const dispatch = useDispatch();
  const { bottom } = useSafeAreaInsets();

  const handleFinish = () => {
    dispatch(deviceSettingActions.setSafetyZone({ isSubmitting: true }));
  };

  const onNameChange = (text: string) => {
    dispatch(deviceSettingActions.setSafetyZone({ draft: { name: text } }));
  };

  const onValueChange = (value: string, index: number) => {
    dispatch(
      deviceSettingActions.setSafetyZone({
        draft: { radius: parseInt(data[index], 10) },
      }),
    );
  };

  return (
    <KeyboardAvoidingView
      pointerEvents={step2 ? undefined : "none"}
      behavior={isIos ? "padding" : undefined}
      keyboardVerticalOffset={-85 - bottom}>
      <Container style={[{ height }, style]}>
        <Shadow
          distance={20}
          startColor="rgba(0, 0, 0, 0.15)"
          sides={["top"]}
          radius={15}
          corners={["topLeft", "topRight"]}
          viewStyle={{ width: "100%" }}>
          <HandleContainer>
            <Handle />
          </HandleContainer>
        </Shadow>
        <RowContainer>
          <InputContainer style={{ marginRight: "13%" }}>
            <Input
              value={name}
              placeholder="안심존 이름"
              onChangeText={onNameChange}
            />
          </InputContainer>
          <InputContainer style={{ alignItems: "center" }}>
            <ScrollPicker
              data={data}
              selectedIndex={data.findIndex(item => item === `${radius}m`)}
              onValueChange={onValueChange}
              width={88}
              height={39}
            />
          </InputContainer>
        </RowContainer>
        <Button
          disabled={!name || !radius}
          isLoading={isSubmitting}
          onPress={handleFinish}>
          {fromDeviceSetting ? "확인" : "다음"}
        </Button>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default SafetyZoneMapBottomSheet;
