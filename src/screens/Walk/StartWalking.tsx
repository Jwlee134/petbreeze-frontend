import React from "react";
import styled from "styled-components/native";
import { StartWalkingScreenNavigationProp } from "~/types/navigator";
import { useState } from "react";
import deviceApi from "~/api/device";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";
import { permissionCheck } from "~/utils";
import { rpHeight, rpWidth } from "~/styles";
import Button from "~/components/common/Button";
import { useAppSelector } from "~/store";
import { ScrollView } from "react-native";
import Device from "~/components/walk/Device";

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
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
      {devices && devices.length && (
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: rpWidth(16),
            paddingTop: rpHeight(31),
          }}
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
        <Button disabled={!selected.length} onPress={handleStart}>
          {!selected.length ? "반려동물을 선택해주세요." : "선택 완료"}
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default StartWalking;
