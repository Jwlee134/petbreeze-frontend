import React, { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import Modal from "react-native-modal";

import AuthSelector from "../Shared/AuthSelector";
import LostAnimalInfo from "~/screens/Home/LostAnimalInfo";
import WitnessedAnimalInfo from "~/screens/Home/WitnessedAnimalInfo";
import WheelDatePicker from "~/components/common/WheelDatePicker";
import WheelPicker from "~/components/common/WheelPicker";

import useModal from "~/hooks/useModal";

import { useAppSelector } from "~/store";
import { useDispatch } from "react-redux";
import { animalInfoActions } from "~/store/animalInfo";
import useBottomModalSelector from "~/hooks/useBottomModalSelector";

const PostAnimalInfo = () => {
  const { width } = useWindowDimensions();

  const { isLoggedIn } = useAppSelector(state => state.user);
  const { currentHomeTab } = useAppSelector(state => state.common);

  const { open, modalProps, BottomModalComponent } = useModal({
    type: "bottom",
  });

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

  if (!isLoggedIn) return <AuthSelector />;

  return (
    <>
      {currentHomeTab === "LostList" ? (
        <LostAnimalInfo
          handlePress={handleOpen}
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
