import React from "react";
import styled from "styled-components/native";
import ConfirmButton from "~/components/common/button/ConfirmButton";
import { StartWalkingScreenNavigationProp } from "~/types/navigator";
import useFocusEvent from "~/hooks/useFocusEvent";
import Device from "~/components/myPage/Device";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";
import { ScrollView } from "react-native";
import { useState } from "react";
import deviceApi from "~/api/device";

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const TextContainer = styled.View`
  padding: 25px 15px;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 18px;
`;

const ButtonContainer = styled.View`
  align-items: center;
  padding: 15px 0px;
  width: 100%;
  background-color: white;
`;

const StartWalking = ({
  navigation,
}: {
  navigation: StartWalkingScreenNavigationProp;
}) => {
  useFocusEvent({ isTab: true });
  const [selected, setSelected] = useState<string[]>([]);
  const { data: devices } = deviceApi.useGetDeviceListQuery();

  const handleStart = () => {
    if (!devices) return;
    navigation.replace("WalkMap", {
      deviceId: selected,
    });
  };

  const handleNavigate = () =>
    navigation.navigate("AddDevice", {
      isOtaUpdate: false,
    });

  return (
    <Container>
      <TextContainer>
        {/* {device.length === 0 && (
          <Text>산책을 시작할 반려동물을 선택해주세요.</Text>
        )}
        {device.length !== 0 && (
          <>
            <Text>산책할 반려동물을 등록해주세요.</Text>
            <Text style={{ marginTop: 25 }}>기기등록을 시작하시겠습니까?</Text>
          </>
        )} */}
      </TextContainer>
      {/* {device.length && (
        <SidePaddingContainer>
          <ScrollView showsVerticalScrollIndicator={false}>
            {device.map((item, index) => (
              <Device
                key={item.id}
                data={item}
                isWalk
                isLast={index === device.length - 1}
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
                    selectedArr.push(item.id);
                    setSelected(selectedArr);
                  }
                }}
                selected={selected.includes(item.id)}
              />
            ))}
          </ScrollView>
        </SidePaddingContainer>
      )} */}
      <ButtonContainer>
        <ConfirmButton onPress={handleStart}>시작</ConfirmButton>
      </ButtonContainer>
    </Container>
  );
};

export default StartWalking;
