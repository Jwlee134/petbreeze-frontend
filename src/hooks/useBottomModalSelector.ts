import { useCallback, useRef, useState } from "react";
import { Platform, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { catBreeds, dogBreeds, gender, species, years } from "~/staticData";
import { useAppSelector } from "~/store";
import { animalInfoActions } from "~/store/animalInfo";
import { AnimalInfoClickedField, HandleRememberIndexArg } from "~/types";
import { localToISOString } from "~/utils";

interface IProps {
  open: () => void;
}

const useBottomModalSelector = ({ open }: IProps) => {
  const animalInfo = useAppSelector(state => state.animalInfo);
  const dispatch = useDispatch();

  const [isSpeciesEditable, setIsSpeciesEditable] = useState(false);
  const [isBreedEditable, setIsBreedEditable] = useState(false);

  const [clickedField, setClickedField] = useState<AnimalInfoClickedField>("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [date, setDate] = useState(new Date());

  const SpeciesRef = useRef<TextInput>(null);
  const BreedsRef = useRef<TextInput>(null);

  const handleOpen = (field: AnimalInfoClickedField) => {
    open();
    setClickedField(field);
  };

  const handleOptionList = useCallback(() => {
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

  const handleRememberIndex = (field: HandleRememberIndexArg) => {
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

  const handleDone = (selectedIndex?: number) => {
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
        if (Platform.OS === "ios") setSelectedIndex(0);
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
        if (Platform.OS === "ios") setSelectedIndex(0);
        break;
      case "성별":
        dispatch(animalInfoActions.setGender(gender[selectedIndex]));
        if (Platform.OS === "ios") setSelectedIndex(0);
        break;
      case "출생 연도":
        dispatch(animalInfoActions.setBirthYear(Number(years[selectedIndex])));
        if (Platform.OS === "ios") setSelectedIndex(0);
        break;
      case "잃어버린 시간":
      case "발견한 시간":
      case "날짜 선택":
        dispatch(animalInfoActions.setEventTime(localToISOString(date)));
        break;
      default:
        break;
    }
  };

  return {
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
  };
};

export default useBottomModalSelector;
