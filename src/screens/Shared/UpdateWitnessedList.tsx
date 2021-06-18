import React, { useEffect } from "react";
import ConfirmButton from "~/components/common/button/ConfirmButton";
import CategoryTitle from "~/components/common/CategoryTitle";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";
import Input from "~/components/common/Input";
import UploadPhoto from "~/components/community/UploadPhoto";
import styled from "styled-components/native";
import useBottomModalSelector from "~/hooks/useBottomModalSelector";
import useModal from "~/hooks/useModal";

import Modal from "react-native-modal";
import WheelDatePicker from "~/components/common/WheelDatePicker";
import { useAppSelector } from "~/store";
import { ISOStringToLocal } from "~/utils";
import { useDispatch } from "react-redux";
import { animalInfoActions } from "~/store/animalInfo";

import Location from "~/assets/svg/location.svg";
import Calendar from "~/assets/svg/calendar.svg";

const ButtonContainer = styled.View`
  margin-top: 30px;
  align-items: center;
`;

const UpdateWitnessedList = () => {
  const animalInfo = useAppSelector(state => state.animalInfo);
  const dispatch = useDispatch();

  const { open, modalProps, BottomModalComponent } = useModal({
    type: "bottom",
  });

  const { date, setDate, handleOpen, handleDone, clickedField } =
    useBottomModalSelector({
      open,
    });

  useEffect(() => {
    return () => {
      dispatch(animalInfoActions.initState());
    };
  }, []);

  const handleSave = () => {};

  return (
    <>
      <KeyboardAwareScrollContainer>
        <CategoryTitle>목격 내역 업데이트</CategoryTitle>
        <UploadPhoto />
        <SidePaddingContainer>
          <Input
            onPress={() => handleOpen("날짜 선택")}
            value={
              animalInfo.eventTime ? ISOStringToLocal(animalInfo.eventTime) : ""
            }
            placeholder="날짜 선택*"
            isInputEditable={false}
            RightIcon={() => <Calendar />}
          />
          <Input
            onPress={() => {}}
            placeholder="목격장소 선택*"
            isInputEditable={false}
            RightIcon={() => <Location />}
          />
          <Input
            isMultiline
            placeholder="목격장소 설명"
            value={animalInfo.eventPlaceInfo}
            onChangeText={text =>
              dispatch(animalInfoActions.setEventPlaceInfo(text))
            }
          />
        </SidePaddingContainer>

        <ButtonContainer>
          <ConfirmButton
            disabled={!animalInfo.eventTime || !animalInfo.eventPlace}
            onPress={handleSave}>
            저장
          </ConfirmButton>
        </ButtonContainer>
      </KeyboardAwareScrollContainer>
      <Modal {...modalProps}>
        <BottomModalComponent
          handleDone={handleDone}
          headerTitle={clickedField}>
          <WheelDatePicker date={date} onDateChange={setDate} />
        </BottomModalComponent>
      </Modal>
    </>
  );
};

export default UpdateWitnessedList;
