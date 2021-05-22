import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Modal from "react-native-modal";
import { useDispatch } from "react-redux";

import styled from "styled-components/native";
import AddCircleButton from "~/components/common/AddCircleButton";
import CategoryTitle from "~/components/common/CategoryTitle";
import Input from "~/components/common/Input";
import UploadPhoto from "~/components/PostAnimalInfo/UploadPhoto";
import useModalSelector from "~/hooks/useModalSelector";
import { catBreeds, dogBreeds, gender, species, years } from "~/staticData";
import { useAppSelector } from "~/store";
import { animalInfoActions } from "~/store/animalInfo";
import { ISOStringToLocal, localToISOString } from "~/utils";
import AuthSelector from "../Shared/AuthSelector";

const CategoryContainer = styled.View`
  padding: 0px 25px;
  margin-bottom: 13px;
`;

const FlexContainer = styled.View`
  align-items: center;
`;

const PostAnimalInfo = () => {
  const { currentHomeTab } = useAppSelector(state => state.common);
  const { isLoggedIn } = useAppSelector(state => state.user);
  const formState = useAppSelector(state => state.animalInfo);

  const [clickedField, setClickedField] = useState("");

  const dispatch = useDispatch();

  const {
    open,
    modalOptions,
    ModalComponent,
    selectedIndex,
    setSelectedIndex,
    date,
  } = useModalSelector();

  const [isSpeciesEditable, setIsSpeciesEditable] = useState(false);
  const [isBreedEditable, setIsBreedEditable] = useState(false);

  const handleStaticData = useCallback(() => {
    switch (clickedField) {
      case "동물 선택":
        return species;
      case "품종 선택":
        if (formState.species === "개") {
          return dogBreeds;
        } else if (formState.species === "고양이") {
          return catBreeds;
        }
        break;
      case "성별":
        return gender;
      case "출생 연도":
        return years;
      default:
        break;
    }
  }, [formState.species, clickedField]);

  const handlePress = (field: string) => {
    open();
    setClickedField(field);
  };

  const handleDone = () => {
    switch (clickedField) {
      case "동물 선택":
        // 직접 입력
        if (selectedIndex === species.length - 1) {
          dispatch(animalInfoActions.setSpecies(""));
          setIsSpeciesEditable(true);
          setIsBreedEditable(true);
          return;
        }
        // 기타
        if (selectedIndex === species.length - 2) {
          setIsBreedEditable(true);
        } else {
          setIsBreedEditable(false);
        }
        dispatch(animalInfoActions.setSpecies(species[selectedIndex]));
        dispatch(animalInfoActions.setBreed(""));
        break;
      case "품종 선택":
        // 직접 입력
        if (
          selectedIndex === dogBreeds.length - 1 ||
          selectedIndex === catBreeds.length - 1
        ) {
          setIsBreedEditable(true);
          return;
        }
        if (formState.species === "개") {
          dispatch(animalInfoActions.setBreed(dogBreeds[selectedIndex]));
        } else {
          dispatch(animalInfoActions.setBreed(catBreeds[selectedIndex]));
        }
        break;
      case "성별":
        dispatch(animalInfoActions.setGender(gender[selectedIndex]));
        break;
      case "출생 연도":
        dispatch(animalInfoActions.setBirthYear(years[selectedIndex]));
        break;
      case "잃어버린 시간":
        dispatch(animalInfoActions.setLostTime(localToISOString(date)));
        break;
      default:
        break;
    }
  };

  const handleRememberIndex = (field: string) => {
    if (!formState[field]) return;
    const dataArray = () => {
      switch (field) {
        case "species":
          return species;
        case "breed":
          if (formState.species === "개") {
            return dogBreeds;
          } else {
            return catBreeds;
          }
        case "gender":
          return gender;
        case "birthYear":
          return years;
        default:
          return [];
      }
    };
    setSelectedIndex(
      dataArray().findIndex(
        (item: string | number) => item === formState[field],
      ),
    );
  };

  useEffect(() => {
    handleStaticData();
  }, [formState, handleStaticData]);

  if (!isLoggedIn) return <AuthSelector />;
  return (
    <>
      <ScrollView>
        <KeyboardAwareScrollView>
          <CategoryTitle>
            {currentHomeTab === "Lost" ? "실종" : "목격"} 동물 정보
          </CategoryTitle>
          <UploadPhoto />
          <CategoryContainer>
            <Input
              placeholder="이름*"
              value={formState.name}
              onChangeText={text => dispatch(animalInfoActions.setName(text))}
            />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ flexGrow: 1, marginRight: 13 }}
                onPress={() => {
                  handlePress("동물 선택");
                  handleRememberIndex("species");
                }}
                activeOpacity={0.8}>
                <Input
                  placeholder="동물 종류*"
                  value={formState.species}
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
                  if (formState.breed) {
                    handleRememberIndex("breed");
                  }
                }}
                activeOpacity={0.8}
                disabled={!formState.species}>
                <Input
                  placeholder="품종 선택*"
                  value={formState.breed}
                  editable={isBreedEditable}
                  disabled={!formState.species}
                  onChangeText={text => {
                    dispatch(animalInfoActions.setBreed(text));
                  }}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                handlePress("성별");
                handleRememberIndex("gender");
              }}
              activeOpacity={0.8}>
              <Input
                placeholder="성별*"
                value={formState.gender}
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
                value={formState.birthYear ? String(formState.birthYear) : ""}
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
                  formState.lostTime ? ISOStringToLocal(formState.lostTime) : ""
                }
                editable={false}
              />
            </TouchableOpacity>
            <Input placeholder="잃어버린 장소*" editable={false} />
            <Input placeholder="특징" maxLength={100} />
            <Input placeholder="인식표 유무" />
          </CategoryContainer>
          <CategoryTitle>
            {currentHomeTab === "Lost" ? "보호자" : "목격자"} 연락처
          </CategoryTitle>
          <CategoryContainer>
            <FlexContainer>
              {formState.phoneNumber.map(field => (
                <Input
                  key={field.id}
                  shadowContainerStyle={{ width: "100%" }}
                  placeholder="연락처*"
                  keyboardType="number-pad"
                  onChangeText={text =>
                    dispatch(
                      animalInfoActions.setPhoneNumber({ id: field.id, text }),
                    )
                  }
                />
              ))}
              {currentHomeTab === "Lost" && (
                <View style={{ marginTop: 13 }}>
                  <AddCircleButton
                    size={26}
                    onPress={() =>
                      dispatch(animalInfoActions.addPhoneNumberField())
                    }
                  />
                </View>
              )}
            </FlexContainer>
          </CategoryContainer>
          {currentHomeTab === "Lost" && (
            <>
              <CategoryTitle>목격 내역</CategoryTitle>
              <CategoryContainer>
                <Input placeholder="날짜 선택" />
                <Input placeholder="목격장소 선택" />
                <Input placeholder="목격장소 설명" />
              </CategoryContainer>
            </>
          )}
        </KeyboardAwareScrollView>
      </ScrollView>
      <Modal {...modalOptions}>
        <ModalComponent
          HeaderTitle={clickedField}
          data={handleStaticData()}
          handleDone={handleDone}
          useListPicker={clickedField !== "잃어버린 시간"}
          useDatePicker={clickedField === "잃어버린 시간"}
        />
      </Modal>
    </>
  );
};

export default PostAnimalInfo;
