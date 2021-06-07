import React, { useEffect } from "react";
import Modal from "react-native-modal";
import styled from "styled-components/native";

import AuthSelector from "../Shared/AuthSelector";
import WheelDatePicker from "~/components/common/WheelDatePicker";
import WheelPicker from "~/components/common/WheelPicker";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import UploadPhoto from "~/components/UploadPhoto";
import CategoryTitle from "~/components/common/CategoryTitle";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";
import Input from "~/components/common/Input";
import AddCircleButton from "~/components/common/button/AddCircleButton";
import ConfirmButton from "~/components/common/button/ConfirmButton";

import useModal from "~/hooks/useModal";
import useBottomModalSelector from "~/hooks/useBottomModalSelector";

import { useAppSelector } from "~/store";
import { useDispatch } from "react-redux";
import { animalInfoActions } from "~/store/animalInfo";

import { PostAnimalInfoScreenNavigationProp } from "~/types/navigator";

import { ISOStringToLocal } from "~/utils";

const RowContainer = styled.View`
  flex-direction: row;
`;

const ButtonContainer = styled.View`
  margin: 13px 0px;
  align-items: center;
`;

const SubmitContainer = styled.View`
  margin-top: 17px;
  margin-bottom: 15px;
  align-items: center;
`;

const PostAnimalInfo = ({
  navigation,
}: {
  navigation: PostAnimalInfoScreenNavigationProp;
}) => {
  const animalInfo = useAppSelector(state => state.animalInfo);
  const { isLoggedIn } = useAppSelector(state => state.user);
  const { currentHomeTab } = useAppSelector(state => state.common);

  const { open, modalProps, BottomModalComponent } = useModal({
    type: "bottom",
  });
  const isLost = currentHomeTab === "LostList";

  const dispatch = useDispatch();

  const {
    handleOpen,
    handleRememberIndex,
    handleDone,
    handleOptionList,
    setDate,
    isSpeciesEditable,
    isBreedEditable,
    SpeciesRef,
    BreedsRef,
    clickedField,
    date,
    selectedIndex,
    setSelectedIndex,
  } = useBottomModalSelector({ open });

  useEffect(() => {
    return () => {
      dispatch(animalInfoActions.initState());
    };
  }, [dispatch]);

  const handleSubmit = async () => {};

  if (!isLoggedIn) return <AuthSelector />;

  return (
    <>
      <KeyboardAwareScrollContainer>
        <CategoryTitle>{isLost ? "실종" : "목격"} 동물 정보</CategoryTitle>
        <UploadPhoto />
        <SidePaddingContainer>
          <Input
            placeholder="이름*"
            value={animalInfo.name}
            onChangeText={text => dispatch(animalInfoActions.setName(text))}
          />
          <RowContainer>
            <Input
              ref={SpeciesRef}
              placeholder="동물 종류*"
              value={animalInfo.species}
              isInputEditable={isSpeciesEditable}
              isRow
              onPress={() => {
                handleOpen("동물 선택");
                handleRememberIndex("species");
              }}
              onChangeText={text => {
                dispatch(animalInfoActions.setSpecies(text));
              }}
              shadowContainerStyle={{ marginRight: 13 }}
            />
            <Input
              ref={BreedsRef}
              placeholder="품종 선택*"
              value={animalInfo.breed}
              isInputEditable={isBreedEditable}
              isRow
              disabled={!animalInfo.species && !isSpeciesEditable}
              onPress={() => {
                if (isSpeciesEditable) return;
                handleOpen("품종 선택");
                if (animalInfo.breed) {
                  handleRememberIndex("breed");
                }
              }}
              onChangeText={text => {
                dispatch(animalInfoActions.setBreed(text));
              }}
            />
          </RowContainer>
          <Input
            placeholder="성별*"
            isInputEditable={false}
            value={animalInfo.gender}
            onPress={() => {
              handleOpen("성별");
              handleRememberIndex("gender");
            }}
          />
          <Input
            placeholder="출생 연도"
            isInputEditable={false}
            value={animalInfo.birthYear ? `${animalInfo.birthYear}년` : ""}
            onPress={() => {
              handleOpen("출생 연도");
              handleRememberIndex("birthYear");
            }}
          />
          <Input
            placeholder={`${isLost ? "잃어버린" : "발견한"} 시간*`}
            isInputEditable={false}
            value={
              animalInfo.eventTime ? ISOStringToLocal(animalInfo.eventTime) : ""
            }
            onPress={() => {
              handleOpen(isLost ? "잃어버린 시간" : "발견한 시간");
            }}
          />
          <Input
            placeholder={`${isLost ? "잃어버린" : "발견한"} 장소*`}
            onPress={() => {}}
            isInputEditable={false}
          />
          <Input placeholder="특징" maxLength={100} isMultiline />
          <Input
            placeholder="인식표 유무"
            shadowContainerStyle={{ marginBottom: 13 }}
          />
        </SidePaddingContainer>
        <CategoryTitle>{isLost ? "보호자" : "목격자"} 연락처</CategoryTitle>
        <SidePaddingContainer>
          {animalInfo.phoneNumber.map(field => (
            <Input
              key={field.id}
              placeholder="연락처*"
              keyboardType="number-pad"
              onChangeText={text =>
                dispatch(
                  animalInfoActions.setPhoneNumber({ id: field.id, text }),
                )
              }
            />
          ))}
        </SidePaddingContainer>
        {isLost && (
          <ButtonContainer>
            <AddCircleButton
              size={26}
              onPress={() => dispatch(animalInfoActions.addPhoneNumberField())}
            />
          </ButtonContainer>
        )}
        <SubmitContainer>
          <ConfirmButton onPress={handleSubmit}>등록</ConfirmButton>
        </SubmitContainer>
      </KeyboardAwareScrollContainer>
      <Modal {...modalProps}>
        <BottomModalComponent
          headerTitle={clickedField}
          handleDone={handleDone}>
          {clickedField.includes("시간") ? (
            <WheelDatePicker date={date} onDateChange={setDate} />
          ) : (
            <WheelPicker
              data={handleOptionList()}
              selectedIndex={selectedIndex}
              onValueChange={index => setSelectedIndex(index)}
            />
          )}
        </BottomModalComponent>
      </Modal>
    </>
  );
};

export default PostAnimalInfo;
