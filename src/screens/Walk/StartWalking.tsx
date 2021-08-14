import React from "react";
import styled from "styled-components/native";
import { StartWalkingScreenNavigationProp } from "~/types/navigator";
import { useState } from "react";
import deviceApi from "~/api/device";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";
import { permissionCheck } from "~/utils";
import MyText from "~/components/common/MyText";
import { rpWidth } from "~/styles";
import Button from "~/components/common/Button";
import { useAppSelector } from "~/store";
import { ScrollView } from "react-native";
import Device from "~/components/walk/Device";

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const TextContainer = styled.View`
  height: ${rpWidth(88)}px;
  max-height: 88px;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const ButtonContainer = styled.View`
  align-items: center;
  padding: 20px 16px;
  width: 100%;
  background-color: white;
`;

const StartWalking = ({
  navigation,
}: {
  navigation: StartWalkingScreenNavigationProp;
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  const dispatch = useDispatch();
  // const { data: devices } = deviceApi.useGetDeviceListQuery();
  const devices = useAppSelector(state => state.device);

  const handleStart = () => {
    permissionCheck("location").then(() => {
      dispatch(storageActions.setSelectedDeviceId(selected));
      dispatch(storageActions.setIsStopped(false));
      navigation.replace("WalkMap");
    });
  };

  const handleNavigate = () =>
    navigation.navigate("AddDevice", {
      isOtaUpdate: false,
    });

  return (
    <Container>
      <TextContainer>
        <MyText>산책을 시작할 반려견을 선택해주세요.</MyText>
      </TextContainer>
      {devices && devices.length && (
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: rpWidth(16) }}
          showsVerticalScrollIndicator={false}>
          {devices.map(item => (
            <Device
              key={item.id}
              data={item}
              onPress={() => {
                const selectedArr = [...selected];
                const isSelected = selectedArr.some(
                  selectedItem => selectedItem === item.id,
                );
                if (isSelected) {
                  setSelected(
                    selectedArr.filter(
                      selectedItem => selectedItem !== item.id,
                    ),
                  );
                } else {
                  setSelected([...selectedArr, item.id]);
                }
              }}
              selected={selected.includes(item.id)}
            />
          ))}
        </ScrollView>
      )}
      <ButtonContainer>
        <Button disabled={selected.length === 0} onPress={handleStart}>
          선택 완료
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default StartWalking;
