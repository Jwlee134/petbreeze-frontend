import React, { useLayoutEffect } from "react";
import styled from "styled-components/native";
import ConfirmButton from "~/components/common/button/ConfirmButton";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";
import Input from "~/components/common/Input";

import ImagePicker from "react-native-image-crop-picker";

import Modal from "react-native-modal";
import useModal from "~/hooks/useModal";
import useBottomModalSelector from "~/hooks/useBottomModalSelector";
import { useAppSelector } from "~/store";
import { useDispatch } from "react-redux";
import { Platform, Text } from "react-native";
import WheelPicker from "~/components/common/WheelPicker";
import { animalInfoActions } from "~/store/animalInfo";
import { useNavigation } from "@react-navigation/core";
import { DeviceListScreenNavigationProp } from "~/types/navigator";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ListPicker from "~/components/common/ListPicker";
import { userActions } from "~/store/user";

const Container = styled.View`
  width: 100%;
`;

const Title = styled.Text`
  font-size: 22px;
  margin-top: 10px;
`;

const SmallText = styled.Text`
  font-size: 15px;
  margin-top: 10px;
`;

const ImageContainer = styled.View`
  margin-top: 25px;
  align-items: center;
`;

const Image = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border-width: 1px;
  border-color: black;
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

const ModifyButton = styled.TouchableOpacity`
  margin: 10px 0px;
  align-items: center;
`;

const Underline = styled.View`
  margin-top: ${Platform.OS === "ios" ? "2px" : "0px"};
  width: 30px;
  height: 1px;
  background-color: black;
`;

const SubmitDeviceInfo = () => {
  const navigation = useNavigation<DeviceListScreenNavigationProp>();

  const animalInfo = useAppSelector(state => state.animalInfo);
  const dispatch = useDispatch();

  const handleSave = () => {
    const formData = new FormData();
    formData.append("avatar", animalInfo.avatar);

    dispatch(animalInfoActions.initState());
    dispatch(userActions.setDeviceRegistered());
    navigation.goBack();
  };

  const { open, modalProps, BottomModalComponent } = useModal({
    type: "bottom",
  });

  const {
    handleOpen,
    handleRememberIndex,
    handleDone,
    handleOptionList,
    isSpeciesEditable,
    isBreedEditable,
    SpeciesRef,
    BreedsRef,
    clickedField,
    selectedIndex,
    setSelectedIndex,
  } = useBottomModalSelector({ open });

  const handleChooseAvatar = () => {
    ImagePicker.openPicker({
      mediaType: "photo",
      cropping: true,
      cropperCircleOverlay: true,
    }).then(image => {
      if (!image) return;
      dispatch(animalInfoActions.setAvatar(image));
    });
  };

  useLayoutEffect(() => {
    dispatch(animalInfoActions.addPhoneNumberField());
  }, []);

  return (
    <>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <SidePaddingContainer style={{ alignItems: "center" }}>
          <Title>인식표 정보를 채워주세요.</Title>
          <SmallText>
            기기 QR코드를 조회하였을 때 노출되는 정보입니다.
          </SmallText>
          <ImageContainer>
            <Image
              source={
                animalInfo.avatar.path
                  ? { uri: animalInfo.avatar.path }
                  : animalInfo.avatar
              }
            />
            <ModifyButton onPress={handleChooseAvatar} activeOpacity={0.7}>
              <Text style={{ fontSize: 17 }}>편집</Text>
              <Underline />
            </ModifyButton>
          </ImageContainer>
          <Container>
            <Input
              placeholder="이름*"
              value={animalInfo.name}
              onChangeText={text => dispatch(animalInfoActions.setName(text))}
            />
            <Input
              placeholder="출생 연도*"
              isInputEditable={false}
              value={animalInfo.birthYear ? `${animalInfo.birthYear}년` : ""}
              onPress={() => {
                handleOpen("출생 연도");
                handleRememberIndex("birthYear");
              }}
            />
            <Input
              placeholder="주의사항"
              value={animalInfo.caution}
              onChangeText={text =>
                dispatch(animalInfoActions.setCaution(text))
              }
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
              placeholder="몸무게"
              keyboardType="number-pad"
              value={animalInfo.weight ? String(animalInfo.weight) : ""}
              onChangeText={text =>
                dispatch(animalInfoActions.setWeight(Number(text)))
              }
            />
            {animalInfo.phoneNumber.map(field => (
              <Input
                key={field.id}
                placeholder={
                  field.id === 0 ? "보호자 연락처 1*" : "보호자 연락처 2"
                }
                keyboardType="number-pad"
                onChangeText={text =>
                  dispatch(
                    animalInfoActions.setPhoneNumber({ id: field.id, text }),
                  )
                }
              />
            ))}
          </Container>
          <ConfirmButton
            style={{ margin: 13 }}
            onPress={handleSave}
            /* disabled={
              !animalInfo.name ||
              !animalInfo.birthYear ||
              !animalInfo.species ||
              !animalInfo.breed ||
              !animalInfo.phoneNumber[0].value
            } */
          >
            저장
          </ConfirmButton>
        </SidePaddingContainer>
      </KeyboardAwareScrollView>
      <Modal {...modalProps}>
        <BottomModalComponent
          headerTitle={clickedField}
          useHeaderButton={Platform.OS === "ios"}
          handleDone={handleDone}>
          {Platform.OS === "ios" ? (
            <WheelPicker
              data={handleOptionList()}
              selectedIndex={selectedIndex}
              setSelectedIndex={index => setSelectedIndex(index)}
            />
          ) : (
            <ListPicker
              data={handleOptionList()}
              handleDone={handleDone}
              setSelectedIndex={setSelectedIndex}
            />
          )}
        </BottomModalComponent>
      </Modal>
    </>
  );
};

export default SubmitDeviceInfo;
