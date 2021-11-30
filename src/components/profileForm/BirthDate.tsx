import React from "react";
import useModal from "~/hooks/useModal";
import { useAppSelector } from "~/store";
import InputTitle from "../common/InputTitle";
import SelectableButton from "../common/SelectableButton";
import DateModal from "../modal/DateModal";

const BirthDate = () => {
  const birthYear = useAppSelector(state => state.form.birthYear);
  const birthMonth = useAppSelector(state => state.form.birthMonth);
  const birthDay = useAppSelector(state => state.form.birthDay);
  const { open, close, modalProps } = useModal();

  return (
    <>
      <InputTitle>생년월일</InputTitle>
      <SelectableButton
        fontColor="rgba(0, 0, 0, 0.8)"
        selected={!!birthYear}
        onPress={open}>
        {birthYear || ""}
        {birthYear ? "년" : ""} {birthMonth || ""}
        {birthYear ? "월" : ""} {birthDay || ""}
        {birthYear ? "일" : ""}
      </SelectableButton>
      <DateModal close={close} modalProps={modalProps} />
    </>
  );
};

export default BirthDate;
