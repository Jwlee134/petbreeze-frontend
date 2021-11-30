import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import { useAppSelector } from "~/store";
import { formActions } from "~/store/form";
import InputTitle from "../common/InputTitle";
import SelectableButton from "../common/SelectableButton";

const RowContainer = styled.View`
  flex-direction: row;
`;

const Sex = () => {
  const sex = useAppSelector(state => state.form.sex);
  const dispatch = useDispatch();

  return (
    <>
      <InputTitle>성별</InputTitle>
      <RowContainer>
        <SelectableButton
          style={{ flexGrow: 1, marginRight: 20 }}
          onPress={() => dispatch(formActions.setState({ sex: true }))}
          selected={sex}>
          남
        </SelectableButton>
        <SelectableButton
          style={{ flexGrow: 1 }}
          onPress={() => dispatch(formActions.setState({ sex: false }))}
          selected={!sex}>
          여
        </SelectableButton>
      </RowContainer>
    </>
  );
};

export default Sex;
