import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components/native";
import Button from "~/components/common/Button";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import Input from "~/components/common/Input";
import InputTitle from "~/components/common/InputTitle";
import SelectableButton from "~/components/common/SelectableButton";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import { useAppSelector } from "~/store";
import { formActions } from "~/store/form";

const Avatar = styled.Image<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    width: ${rpWidth(108)}px;
    height: ${rpWidth(108)}px;
    border-radius: ${rpWidth(54)}px;
    margin-top: ${rpWidth(50)}px;
    margin-bottom: ${rpWidth(30)}px;
  `}
  align-self: center;
`;

const PaddingContainer = styled.View<{ rpWidth: RpWidth }>`
  padding: ${({ rpWidth }) => `0px ${rpWidth(42)}px`};
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

const EmergencyMissingFirstPage = ({ navigation }) => {
  const { name, breed, hasTag, characteristic } = useAppSelector(
    state => state.form,
  );
  const { rpWidth } = useContext(DimensionsContext);
  const dispatch = useDispatch();

  return (
    <KeyboardAwareScrollContainer isSpaceBetween>
      <PaddingContainer rpWidth={rpWidth}>
        <Avatar rpWidth={rpWidth} source={require("~/assets/image/test.jpg")} />
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
