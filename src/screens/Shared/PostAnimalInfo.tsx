import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Dimensions, Platform } from "react-native";
import Modal from "react-native-modal";
import styled from "styled-components/native";

import useModal from "~/hooks/useModal";
import useMap from "~/hooks/useMap";
import useBottomModalSelector from "~/hooks/useBottomModalSelector";

import { useAppSelector } from "~/store";
import { useDispatch } from "react-redux";
import { animalInfoActions } from "~/store/animalInfo";

import { PostAnimalInfoScreenNavigationProp } from "~/types/navigator";

import { ISOStringToLocal } from "~/utils";

import AuthSelector from "./AuthSelector";
import WheelDatePicker from "~/components/common/WheelDatePicker";
import WheelPicker from "~/components/common/WheelPicker";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import UploadPhoto from "~/components/community/UploadPhoto";
import CategoryTitle from "~/components/common/CategoryTitle";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";
import Input from "~/components/common/Input";
import AddCircleButton from "~/components/common/button/AddCircleButton";
import ConfirmButton from "~/components/common/button/ConfirmButton";
import ListPicker from "~/components/common/ListPicker";

import useReverseGeocoding from "~/hooks/useReverseGeocoding";
import { api } from "~/api";

const MapContainer = styled.View`
  width: 100%;
  height: 100%;
`;

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

  const [showMap, setShowMap] = useState(false);

  const { open, close, modalProps, BottomModalComponent } = useModal({
    type: "bottom",
  });
  const { Map } = useMap();
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

  const isLost = currentHomeTab === "LostList";

  const dispatch = useDispatch();

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const { loading, setLoading, getAddress } = useReverseGeocoding();

  useEffect(() => {
    return () => {
      dispatch(animalInfoActions.initState());
    };
  }, [dispatch]);

  const handleSubmit = async () => {
    /* const { data } = await api.post("/lost/", {
      name: "ssoya",
      variety: "고등어",
      sex: "2",
      age: 3,
      inner_chip: false,
      lost_datetime: "2021-06-11 01:30:33.792503+00:00",
      location_detail: "성복중앙교회 근처",
      legal_district: "서울특별시-성북구",
      characteristic: "우주 대졸귀",
      coordinate: {
        type: "Point",
        coordinates: [37.3213, 127.3232],
      },
      contact_number1: "010-5278-8592",
      contact_number2: "010-8610-5015",
    }); */

    /*  const filenameArr = animalInfo.photos.map(photo => {
      return {
        name: "image",
        type: photo.mime,
        uri: photo.sourceURL,
      };
    });

    console.log(filenameArr); */

    /* let obj = {};

    for (let i = 0; i < filenameArr.length; i++) {
      obj[`image${i + 1}`] = filenameArr[i];
    }

    console.log(obj); */
    console.log(animalInfo.photos);
    const formData = new FormData();
    for (let i = 0; i < animalInfo.photos.length; i++) {
      formData.append(`image${i + 1}`, {
        name:
          Platform.OS === "ios"
            ? animalInfo.photos[i].filename
            : animalInfo.photos[i].path.substring(
                animalInfo.photos[i].path.lastIndexOf("/") + 1,
              ),
        type: animalInfo.photos[i].mime,
        uri:
          Platform.OS === "ios"
            ? animalInfo.photos[i].sourceURL
            : animalInfo.photos[i].path,
        data: animalInfo.photos[i]?.data || null,
      });
    }

    await api.patch("/lost/15/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const { data } = await api.get("/lost/15/");
    console.log(data);
  };

  const handleLocation = async () => {
    try {
      setLoading(true);
      const address = await getAddress(latitude, longitude);
      if (address) {
        dispatch(animalInfoActions.setEventPlace(address[0]));
      }
      setShowMap(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

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
                if (Platform.OS === "ios") {
                  handleRememberIndex("species");
                }
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
            value={animalInfo.eventPlace /* .replace(/\s/g, "-") */}
            placeholder={`${isLost ? "잃어버린" : "발견한"} 장소*`}
            onPress={() => setShowMap(true)}
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
          {animalInfo.phoneNumber.map((field, index) => (
            <Input
              key={field.id}
              placeholder={index === 0 ? "연락처*" : "연락처"}
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
          <ConfirmButton
            /* disabled={
              animalInfo.photos.length === 0 ||
              !animalInfo.name ||
              !animalInfo.species ||
              !animalInfo.breed ||
              !animalInfo.gender ||
              !animalInfo.eventTime ||
              !animalInfo.eventPlace ||
              !animalInfo.phoneNumber[0].value
            } */
            onPress={handleSubmit}>
            등록
          </ConfirmButton>
        </SubmitContainer>
      </KeyboardAwareScrollContainer>
      <Modal {...modalProps}>
        <BottomModalComponent
          useHeaderButton={
            Platform.OS === "ios" || clickedField.includes("시간")
          }
          headerTitle={clickedField}
          handleDone={handleDone}>
          {clickedField.includes("시간") ? (
            <WheelDatePicker date={date} onDateChange={setDate} />
          ) : Platform.OS === "ios" ? (
            <WheelPicker
              data={handleOptionList()}
              selectedIndex={selectedIndex}
              setSelectedIndex={index => setSelectedIndex(index)}
            />
          ) : (
            <ListPicker
              data={handleOptionList()}
              setSelectedIndex={setSelectedIndex}
              handleDone={handleDone}
              close={close}
            />
          )}
        </BottomModalComponent>
      </Modal>
      {showMap && (
        <MapContainer>
          <Map
            onRegionChange={({ latitude, longitude }) => {
              setLatitude(latitude);
              setLongitude(longitude);
            }}
          />
          {/* 페이크 마커, 지도 가운데에 position으로 두기 */}
          <ConfirmButton
            style={{
              position: "absolute",
              bottom: 24,
              left: Dimensions.get("screen").width / 2 - 90,
            }}
            onPress={handleLocation}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              "확인"
            )}
          </ConfirmButton>
        </MapContainer>
      )}
    </>
  );
};

export default PostAnimalInfo;
