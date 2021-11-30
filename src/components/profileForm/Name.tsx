import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "~/store";
import { formActions } from "~/store/form";
import Input from "../common/Input";
import InputTitle from "../common/InputTitle";

const Name = () => {
  const name = useAppSelector(state => state.form.name);
  const dispatch = useDispatch();

  return (
    <>
      <InputTitle>이름</InputTitle>
      <Input
        maxLength={16}
        value={name}
        onChangeText={text => {
          dispatch(formActions.setState({ name: text }));
        }}
      />
    </>
  );
};

export default Name;
