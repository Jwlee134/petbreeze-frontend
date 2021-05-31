import React from "react";
import { TextInput } from "react-native";
import styled from "styled-components/native";

import { useAppSelector } from "~/store";
import { useDispatch } from "react-redux";
import { animalInfoActions } from "~/store/animalInfo";

import { ISOStringToLocal } from "~/utils";

import UploadPhoto from "~/components/UploadPhoto";
import CategoryTitle from "~/components/common/CategoryTitle";
import ShadowInput from "~/components/common/input/ShadowInput";
import AddCircleButton from "~/components/common/button/AddCircleButton";
import ConfirmButton from "~/components/common/button/ConfirmButton";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";

import { AnimalInfoClickedField, HandleRememberIndexArg } from "~/types";
import { useNavigation } from "@react-navigation/core";
import { PostAnimalInfoScreenNavigationProp } from "~/types/navigator";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";

interface IProps {
  handlePress: (field: AnimalInfoClickedField) => void;
  handleRememberIndex: (field: HandleRememberIndexArg) => void;
  isSpeciesEditable: boolean;
  isBreedEditable: boolean;
  SpeciesRef: React.RefObject<TextInput>;
  BreedsRef: React.RefObject<TextInput>;
}

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

const LostAnimalInfo = ({
  handlePress,
  handleRememberIndex,
  isSpeciesEditable,
  isBreedEditable,
  SpeciesRef,
  BreedsRef,
}: IProps) => {
  const animalInfo = useAppSelector(state => state.animalInfo);
  const navigation = useNavigation<PostAnimalInfoScreenNavigationProp>();

  const dispatch = useDispatch();

  return (
    <KeyboardAwareScrollContainer>
      <CategoryTitle>실종 동물 정보</CategoryTitle>
      <UploadPhoto />
      <SidePaddingContainer>
        <ShadowInput
          placeholder="이름*"
          value={animalInfo.name}
          onChangeText={text => dispatch(animalInfoActions.setName(text))}
        />
        <RowContainer>
          <ShadowInput
            ref={SpeciesRef}
            placeholder="동물 종류*"
            value={animalInfo.species}
            isInputEditable={isSpeciesEditable}
            isRow
            onPress={() => {
              handlePress("동물 선택");
              handleRememberIndex("species");
            }}
            onChangeText={text => {
              dispatch(animalInfoActions.setSpecies(text));
            }}
            shadowContainerStyle={{ marginRight: 13 }}
          />
          <ShadowInput
            ref={BreedsRef}
            placeholder="품종 선택*"
            value={animalInfo.breed}
            isInputEditable={isBreedEditable}
            isRow
            disabled={!animalInfo.species && !isSpeciesEditable}
            onPress={() => {
              if (isSpeciesEditable) return;
              handlePress("품종 선택");
              if (animalInfo.breed) {
                handleRememberIndex("breed");
              }
            }}
            onChangeText={text => {
              dispatch(animalInfoActions.setBreed(text));
            }}
          />
        </RowContainer>
        <ShadowInput
          placeholder="성별*"
          isInputEditable={false}
          value={animalInfo.gender}
          onPress={() => {
            handlePress("성별");
            handleRememberIndex("gender");
          }}
        />
        <ShadowInput
          placeholder="출생 연도"
          isInputEditable={false}
          value={animalInfo.birthYear ? `${animalInfo.birthYear}년` : ""}
          onPress={() => {
            handlePress("출생 연도");
            handleRememberIndex("birthYear");
          }}
        />
        <ShadowInput
          placeholder="잃어버린 시간*"
          isInputEditable={false}
          value={
            animalInfo.lostTime ? ISOStringToLocal(animalInfo.lostTime) : ""
          }
          onPress={() => {
            handlePress("잃어버린 시간");
          }}
        />
        <ShadowInput placeholder="잃어버린 장소*" isInputEditable={false} />
        <ShadowInput placeholder="특징" maxLength={100} />
        <ShadowInput
          placeholder="인식표 유무"
          shadowContainerStyle={{ marginBottom: 13 }}
        />
      </SidePaddingContainer>
      <CategoryTitle>보호자 연락처</CategoryTitle>
      <SidePaddingContainer>
        {animalInfo.phoneNumber.map(field => (
          <ShadowInput
            key={field.id}
            placeholder="연락처*"
            keyboardType="number-pad"
            onChangeText={text =>
              dispatch(animalInfoActions.setPhoneNumber({ id: field.id, text }))
            }
          />
        ))}
      </SidePaddingContainer>
      <ButtonContainer>
        <AddCircleButton
          size={26}
          onPress={() => dispatch(animalInfoActions.addPhoneNumberField())}
        />
      </ButtonContainer>
      <SubmitContainer>
        <ConfirmButton onPress={() => {}}>등록</ConfirmButton>
      </SubmitContainer>
    </KeyboardAwareScrollContainer>
  );
};

export default LostAnimalInfo;
