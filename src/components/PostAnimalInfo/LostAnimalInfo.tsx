import React, { Fragment, useCallback, useRef, useState } from "react";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import styled from "styled-components/native";
import Modal from "react-native-modal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useDispatch } from "react-redux";
import { useAppSelector } from "~/store";
import { animalInfoActions } from "~/store/animalInfo";

import useBottomModal from "~/hooks/useBottomModal";

import { catBreeds, dogBreeds, gender, species, years } from "~/staticData";
import { ISOStringToLocal, localToISOString } from "~/utils";

import UploadPhoto from "./UploadPhoto";
import WheelPicker from "../common/WheelPicker";
import WheelDatePicker from "../common/WheelDatePicker";
import CategoryTitle from "../common/CategoryTitle";
import Input from "../common/Input";
import AddCircleButton from "../common/AddCircleButton";
import NormalButton from "../common/NormalButton";

type ClickedField =
  | "동물 선택"
  | "품종 선택"
  | "출생 연도"
  | "성별"
  | "잃어버린 시간"
  | "";

const CategoryContainer = styled.View`
  padding: 0px 25px;
  margin-bottom: 13px;
`;

const ButtonContainer = styled.View`
  margin-top: 13px;
  align-items: center;
`;

const SubmitContainer = styled.View`
  margin-top: 17px;
  margin-bottom: 15px;
  align-items: center;
`;

const LostAnimalInfo = () => {
  const { width } = useWindowDimensions();

  const animalInfo = useAppSelector(state => state.animalInfo);
  const dispatch = useDispatch();

  const [clickedField, setClickedField] = useState<ClickedField>("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [date, setDate] = useState(new Date());

  const [isSpeciesEditable, setIsSpeciesEditable] = useState(false);
  const [isBreedEditable, setIsBreedEditable] = useState(false);

  const SpeciesRef = useRef<TextInput>(null);
  const BreedsRef = useRef<TextInput>(null);

  const { open, bottomModalProps, BottomModalComponent } = useBottomModal();

  const handlePress = (field: ClickedField) => {
    open();
    setClickedField(field);
  };

  const handleDone = () => {
    switch (clickedField) {
      case "동물 선택":
        if (selectedIndex === species.length - 1) {
          dispatch(animalInfoActions.setSpecies(""));
          setIsSpeciesEditable(true);
          setIsBreedEditable(true);
          setTimeout(() => {
            SpeciesRef.current?.focus();
          }, 600);
          return;
        }
        if (selectedIndex === species.length - 2) {
          setIsBreedEditable(true);
        } else {
          setIsBreedEditable(false);
        }
        dispatch(animalInfoActions.setSpecies(species[selectedIndex]));
        dispatch(animalInfoActions.setBreed(""));
        setSelectedIndex(0);
        break;
      case "품종 선택":
        if (
          selectedIndex === dogBreeds.length - 1 ||
          selectedIndex === catBreeds.length - 1
        ) {
          setIsBreedEditable(true);
          setTimeout(() => {
            BreedsRef.current?.focus();
          }, 600);
          return;
        }
        if (animalInfo.species === "개") {
          dispatch(animalInfoActions.setBreed(dogBreeds[selectedIndex]));
        } else {
          dispatch(animalInfoActions.setBreed(catBreeds[selectedIndex]));
        }
        setSelectedIndex(0);
        break;
      case "성별":
        dispatch(animalInfoActions.setGender(gender[selectedIndex]));
        setSelectedIndex(0);
        break;
      case "출생 연도":
        dispatch(animalInfoActions.setBirthYear(years[selectedIndex]));
        setSelectedIndex(0);
        break;
      case "잃어버린 시간":
        dispatch(animalInfoActions.setLostTime(localToISOString(date)));
        break;
      default:
        break;
    }
  };

  const handleStaticData = useCallback(() => {
    switch (clickedField) {
      case "동물 선택":
        return species;
      case "품종 선택":
        if (animalInfo.species === "개") {
          return dogBreeds;
        } else if (animalInfo.species === "고양이") {
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
  }, [animalInfo.species, clickedField]);

  const handleRememberIndex = (field: string) => {
    if (!animalInfo[field]) return;
    const dataArray = () => {
      switch (field) {
        case "species":
          return species;
        case "breed":
          if (animalInfo.species === "개") {
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
        (item: string | number) => item === animalInfo[field],
      ),
    );
  };

  return (
    <>
      <ScrollView>
        <KeyboardAwareScrollView>
          <CategoryTitle>실종 동물 정보</CategoryTitle>
          <UploadPhoto />
          <CategoryContainer>
            <Input
              placeholder="이름*"
              value={animalInfo.name}
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
            </View>
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
                  animalInfo.lostTime
                    ? ISOStringToLocal(animalInfo.lostTime)
                    : ""
                }
                editable={false}
              />
            </TouchableOpacity>
            <Input placeholder="잃어버린 장소*" editable={false} />
            <Input placeholder="특징" maxLength={100} />
            <Input placeholder="인식표 유무" />
          </CategoryContainer>
          <CategoryTitle>보호자 연락처</CategoryTitle>
          <CategoryContainer>
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
            <ButtonContainer>
              <AddCircleButton
                size={26}
                onPress={() =>
                  dispatch(animalInfoActions.addPhoneNumberField())
                }
              />
            </ButtonContainer>
          </CategoryContainer>
          <CategoryTitle>목격 내역</CategoryTitle>
          <CategoryContainer>
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
            <ButtonContainer>
              <AddCircleButton
                size={26}
                onPress={() =>
                  dispatch(animalInfoActions.addWitnessedLogField())
                }
              />
            </ButtonContainer>
          </CategoryContainer>
          <SubmitContainer>
            <NormalButton onPress={() => {}}>등록</NormalButton>
          </SubmitContainer>
        </KeyboardAwareScrollView>
      </ScrollView>
      <Modal {...bottomModalProps}>
        <BottomModalComponent
          headerTitle={clickedField}
          handleDone={handleDone}>
          {clickedField === "잃어버린 시간" ? (
            <WheelDatePicker
              style={{ width }}
              date={date}
              onDateChange={setDate}
            />
          ) : (
            <WheelPicker
              style={{
                width,
                height: "100%",
              }}
              data={handleStaticData()}
              selectedIndex={selectedIndex}
              onValueChange={index => setSelectedIndex(index)}
            />
          )}
        </BottomModalComponent>
      </Modal>
    </>
  );
};

export default LostAnimalInfo;
