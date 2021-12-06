import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "~/store";
import { formActions } from "~/store/form";
import Input from "../common/Input";
import InputTitle from "../common/InputTitle";

const Weight = () => {
  const weight = useAppSelector(state => state.form.weight);
  const dispatch = useDispatch();

  return (
    <>
      <InputTitle>체중</InputTitle>
      <Input
        value={weight}
        maxLength={2}
        onChangeText={text => {
          dispatch(formActions.setState({ weight: text }));
        }}
        keyboardType="number-pad"
        solidPlaceholderTitle="kg"
        alignLeftSolidPlaceholderWhenFocus
      />
    </>
  );
};

export default Weight;
