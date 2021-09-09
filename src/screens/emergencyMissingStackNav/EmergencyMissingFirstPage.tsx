import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import Button from "~/components/common/Button";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import Input from "~/components/common/Input";
import InputTitle from "~/components/common/InputTitle";
import SelectableButton from "~/components/common/SelectableButton";
import { useAppSelector } from "~/store";
import { formActions } from "~/store/form";
import { rpWidth } from "~/styles";

const Avatar = styled.Image`
  width: ${rpWidth(108)}px;
  height: ${rpWidth(108)}px;
  border-radius: ${rpWidth(54)}px;
  margin-top: ${rpWidth(50)}px;
  margin-bottom: ${rpWidth(30)}px;
  align-self: center;
`;

const PaddingContainer = styled.View`
  padding: 0px ${rpWidth(42)}px;
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

const EmergencyMissingFirstPage = ({ navigation }) => {
  const { name, breed, hasTag, characteristic } = useAppSelector(
    state => state.form,
  );
  const dispatch = useDispatch();

  return (
    <KeyboardAwareScrollContainer isSpaceBetween>
      <PaddingContainer>
        <Avatar source={require("~/assets/image/test.jpg")} />
        <InputTitle>이름</InputTitle>
        <Input
          value={name}
          onChangeText={text => dispatch(formActions.setName(text))}
        />
        <InputTitle>품종</InputTitle>
        <Input
          value={breed}
          onChangeText={text => dispatch(formActions.setBreed(text))}
        />
        <InputTitle>인식표 유무</InputTitle>
        <RowContainer>
          <SelectableButton
            selected={hasTag}
            onPress={() => dispatch(formActions.setHasTag(true))}
            style={{ marginRight: rpWidth(20) }}>
            유
          </SelectableButton>
          <SelectableButton
            selected={!hasTag}
            onPress={() => dispatch(formActions.setHasTag(false))}>
            무
          </SelectableButton>
        </RowContainer>
        <InputTitle>특징</InputTitle>
        <Input
          value={characteristic}
          onChangeText={text => dispatch(formActions.setCharacteristic(text))}
        />
      </PaddingContainer>
      <Button
        useCommonMarginBottom
        disabled={!name || !breed || !characteristic}
        onPress={() => {
          navigation.navigate("EmergencyMissingSecondPage");
        }}>
        다음
      </Button>
    </KeyboardAwareScrollContainer>
  );
};

export default EmergencyMissingFirstPage;
