import React, { useContext } from "react";
import { KeyboardAvoidingView } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components/native";
import Button from "~/components/common/Button";
import Input from "~/components/common/Input";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import { useAppSelector } from "~/store";
import { deviceSettingActions } from "~/store/deviceSetting";
import { isIos } from "~/utils";
import ShadowContainer from "../common/container/ShadowContainer";
import ScrollPicker from "../common/ScrollPicker";

const Container = styled(Animated.View)<{ rpWidth: RpWidth }>`
  background-color: white;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding-bottom: ${({ rpWidth }) => rpWidth(32)}px;
`;

const RowContainer = styled.View<{ rpWidth: RpWidth }>`
  flex-direction: row;
  ${({ rpWidth }) => css`
    padding: 0px ${rpWidth(38)}px;
    margin-bottom: ${rpWidth(13)}px;
  `}
`;

const InputContainer = styled.View`
  width: 43%;
`;

const HandleContainer = styled.View<{ rpWidth: RpWidth }>`
  height: ${({ rpWidth }) => rpWidth(36)}px;
  align-items: center;
`;

const Handle = styled.View<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    width: ${rpWidth(29)}px;
    height: ${rpWidth(3)}px;
    margin-top: ${rpWidth(8)}px;
  `}
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
  const { rpWidth } = useContext(DimensionsContext);

  const {
    step2,
    draft: { name, radius },
    isSubmitting,
    fromDeviceSetting,
  } = useAppSelector(state => state.deviceSetting.safetyZone);
  const dispatch = useDispatch();
  const { bottom } = useSafeAreaInsets();

  const handleFinish = () => {
    dispatch(
      deviceSettingActions.setSafetyZone({
        isSubmitting: true,
      }),
    );
  };

  return (
    <KeyboardAvoidingView
      pointerEvents={step2 ? undefined : "none"}
      behavior={isIos ? "padding" : undefined}
      keyboardVerticalOffset={-rpWidth(85) - bottom}>
      <ShadowContainer shadowOpacity={0.15} shadowRadius={10}>
        <Container rpWidth={rpWidth} style={[{ height }, style]}>
          <HandleContainer rpWidth={rpWidth}>
            <Handle rpWidth={rpWidth} />
          </HandleContainer>
          <RowContainer rpWidth={rpWidth}>
            <InputContainer style={{ marginRight: "13%" }}>
              <Input
                value={name}
                placeholder="안심존 이름"
                onChangeText={text =>
                  dispatch(
                    deviceSettingActions.setSafetyZone({
                      draft: { name: text },
                    }),
                  )
                }
              />
            </InputContainer>
            <InputContainer style={{ alignItems: "center" }}>
              <ScrollPicker
                data={data}
                onChange={index =>
                  dispatch(
                    deviceSettingActions.setSafetyZone({
                      draft: { radius: parseInt(data[index], 10) },
                    }),
                  )
                }
                width={rpWidth(88)}
                height={rpWidth(39)}
                selectedIndex={data.findIndex(item => item === `${radius}m`)}
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
      </ShadowContainer>
    </KeyboardAvoidingView>
  );
};

export default SafetyZoneMapBottomSheet;
