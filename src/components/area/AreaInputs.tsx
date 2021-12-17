import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import { useAppSelector } from "~/store";
import { deviceSettingActions } from "~/store/deviceSetting";
import Input from "../common/Input";
import ScrollPicker from "../common/ScrollPicker";

const Container = styled.View`
  flex-direction: row;
  padding: 0px 38px;
  background-color: white;
`;

const InputContainer = styled.View`
  width: 43%;
`;

const data = ["10m", "20m", "30m", "50m", "100m"];

const AreaInputs = ({ style }: { style?: StyleProp<ViewStyle> }) => {
  const name = useAppSelector(state => state.deviceSetting.draft.area.name);
  const radius = useAppSelector(state => state.deviceSetting.draft.area.radius);
  const dispatch = useDispatch();

  const onNameChange = (text: string) => {
    dispatch(deviceSettingActions.setAreaDraft({ name: text }));
  };

  const onValueChange = (value: string, index: number) => {
    dispatch(
      deviceSettingActions.setAreaDraft({
        radius: parseInt(data[index], 10),
      }),
    );
    dispatch(deviceSettingActions.setArea({ animateCamera: true }));
  };

  return (
    <Container style={style}>
      <InputContainer style={{ marginRight: "13%" }}>
        <Input
          value={name}
          placeholder="안심존 이름"
          onChangeText={onNameChange}
          textAlign="center"
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
    </Container>
  );
};

export default AreaInputs;
