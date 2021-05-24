import React, { useCallback, useEffect, useRef, useState } from "react";
import { TextInput, useWindowDimensions } from "react-native";
import Modal from "react-native-modal";

import AuthSelector from "../Shared/AuthSelector";
import LostAnimalInfo from "~/components/postAnimalInfo/LostAnimalInfo";
import WitnessedAnimalInfo from "~/components/postAnimalInfo/WitnessedAnimalInfo";
import WheelDatePicker from "~/components/common/WheelDatePicker";
import WheelPicker from "~/components/common/WheelPicker";

import useModal from "~/hooks/useModal";

import { useAppSelector } from "~/store";
import { useDispatch } from "react-redux";
import { animalInfoActions } from "~/store/animalInfo";

import { catBreeds, dogBreeds, gender, species, years } from "~/staticData";
import { localToISOString } from "~/utils";
import { AnimalInfoClickedField } from "~/types";

const PostAnimalInfo = () => {
  const { width } = useWindowDimensions();

  const { isLoggedIn } = useAppSelector(state => state.user);
  const { currentHomeTab } = useAppSelector(state => state.common);
  const animalInfo = useAppSelector(state => state.animalInfo);

  const { open, modalProps, BottomModalComponent } = useModal({
    type: "bottom",
  });

  const dispatch = useDispatch();

  const [clickedField, setClickedField] = useState<AnimalInfoClickedField>("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [date, setDate] = useState(new Date());

  const [isSpeciesEditable, setIsSpeciesEditable] = useState(false);
  const [isBreedEditable, setIsBreedEditable] = useState(false);

  const SpeciesRef = useRef<TextInput>(null);
  const BreedsRef = useRef<TextInput>(null);

  useEffect(() => {
    return () => {
      dispatch(animalInfoActions.initState());
    };
  }, [dispatch]);

  const handlePress = (field: AnimalInfoClickedField) => {
    open();
    setClickedField(field);
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
        return [];
      case "성별":
        return gender;
      case "출생 연도":
        return years;
      default:
        return [];
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

  if (!isLoggedIn) return <AuthSelector />;

  return (
    <>
      {currentHomeTab === "Lost" ? (
        <LostAnimalInfo
          handlePress={handlePress}
          handleRememberIndex={handleRememberIndex}
          isSpeciesEditable={isSpeciesEditable}
          isBreedEditable={isBreedEditable}
          SpeciesRef={SpeciesRef}
          BreedsRef={BreedsRef}
        />
      ) : (
        <WitnessedAnimalInfo />
      )}
      <Modal {...modalProps}>
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
                justifyContent: "center",
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

export default PostAnimalInfo;
