import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "~/store";
import { formActions } from "~/store/form";
import Input from "../common/Input";
import InputTitle from "../common/InputTitle";

const Species = () => {
  const species = useAppSelector(state => state.form.species);
  const dispatch = useDispatch();

  return (
    <>
      <InputTitle>품종</InputTitle>
      <Input
        maxLength={16}
        value={species}
        onChangeText={text => {
          dispatch(formActions.setState({ species: text }));
        }}
      />
    </>
  );
};

export default Species;
