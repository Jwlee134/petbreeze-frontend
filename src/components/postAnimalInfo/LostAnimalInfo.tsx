import React, { Fragment } from "react";
import { ScrollView, TextInput, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useAppSelector } from "~/store";
import { useDispatch } from "react-redux";
import { animalInfoActions } from "~/store/animalInfo";

import { ISOStringToLocal } from "~/utils";

import UploadPhoto from "./UploadPhoto";
import CategoryTitle from "../common/CategoryTitle";
import Input from "../common/Input";
import AddCircleButton from "../common/AddCircleButton";
import NormalButton from "../common/NormalButton";
import SidePaddingContainer from "../common/SidePaddingContainer";

import { AnimalInfoClickedField } from "~/types";

interface IProps {
  handlePress: (field: AnimalInfoClickedField) => void;
  handleRememberIndex: (field: string) => void;
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

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <KeyboardAwareScrollView>
        <CategoryTitle>실종 동물 정보</CategoryTitle>
        <UploadPhoto />
        <SidePaddingContainer>
          <Input
            placeholder="이름*"
            value={animalInfo.name}
            onChangeText={text => dispatch(animalInfoActions.setName(text))}
          />
          <RowContainer>
            <TouchableOpacity
              style={{
                flexGrow: 1,
                marginRight: 13,
              }}
              onPress={() => {
                handlePress("동물 선택");
                handleRememberIndex("species");
              }}
              activeOpacity={0.8}>
              <Input
                ref={SpeciesRef}
                placeholder="동물 종류*"
                value={animalInfo.species}
                editable={isSpeciesEditable}
                onChangeText={text => {
                  dispatch(animalInfoActions.setSpecies(text));
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexGrow: 1 }}
              onPress={() => {
                if (isSpeciesEditable) return;
                handlePress("품종 선택");
                if (animalInfo.breed) {
                  handleRememberIndex("breed");
                }
              }}
              activeOpacity={0.8}
              disabled={!animalInfo.species && !isSpeciesEditable}>
              <Input
                ref={BreedsRef}
                placeholder="품종 선택*"
                value={animalInfo.breed}
                editable={isBreedEditable}
                disabled={!animalInfo.species && !isSpeciesEditable}
                onChangeText={text => {
                  dispatch(animalInfoActions.setBreed(text));
                }}
              />
            </TouchableOpacity>
          </RowContainer>
          <TouchableOpacity
            onPress={() => {
              handlePress("성별");
              handleRememberIndex("gender");
            }}
            activeOpacity={0.8}>
            <Input
              placeholder="성별*"
              value={animalInfo.gender}
              editable={false}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handlePress("출생 연도");
              handleRememberIndex("birthYear");
            }}
            activeOpacity={0.8}>
            <Input
              placeholder="출생 연도"
              value={animalInfo.birthYear ? String(animalInfo.birthYear) : ""}
              editable={false}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handlePress("잃어버린 시간");
            }}
            activeOpacity={0.8}>
            <Input
              placeholder="잃어버린 시간*"
              value={
                animalInfo.lostTime ? ISOStringToLocal(animalInfo.lostTime) : ""
              }
              editable={false}
            />
          </TouchableOpacity>
          <Input placeholder="잃어버린 장소*" editable={false} />
          <Input placeholder="특징" maxLength={100} />
          <Input
            placeholder="인식표 유무"
            shadowContainerStyle={{ marginBottom: 13 }}
          />
        </SidePaddingContainer>
        <CategoryTitle>보호자 연락처</CategoryTitle>
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
        <ButtonContainer>
          <AddCircleButton
            size={26}
            onPress={() => dispatch(animalInfoActions.addPhoneNumberField())}
          />
        </ButtonContainer>
        <CategoryTitle>목격 내역</CategoryTitle>
        <SidePaddingContainer>
          {animalInfo.witnessedLog.map(item => (
            <Fragment key={item.id}>
              <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
                <Input placeholder="날짜 선택" editable={false} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
                <Input placeholder="목격장소 선택" editable={false} />
              </TouchableOpacity>
              <Input
                placeholder="목격장소 설명"
                value={item.description}
                onChangeText={text =>
                  dispatch(
                    animalInfoActions.setWitNessedLogDescription({
                      id: item.id,
                      text,
                    }),
                  )
                }
              />
            </Fragment>
          ))}
        </SidePaddingContainer>
        <ButtonContainer>
          <AddCircleButton
            size={26}
            onPress={() => dispatch(animalInfoActions.addWitnessedLogField())}
          />
        </ButtonContainer>
        <SubmitContainer>
          <NormalButton onPress={() => {}}>등록</NormalButton>
        </SubmitContainer>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default LostAnimalInfo;
