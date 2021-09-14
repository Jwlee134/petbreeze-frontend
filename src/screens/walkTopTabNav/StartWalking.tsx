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
import { ScrollView, View } from "react-native";
import WalkDeviceListItem from "~/components/common/WalkDeviceListItem";
import { navigatorActions } from "~/store/navigator";
import MyText from "~/components/common/MyText";
import Dog from "~/assets/svg/dog/dog-with-device.svg";

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
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
    if (!selected.length) {
      dispatch(
        navigatorActions.setInitialRoute({
          initialBleWithHeaderStackNavRouteName: "ChargingCheck",
        }),
      );
      dispatch(storageActions.setRedirectionRouteName("StartWalking"));
      navigation.navigate("BleRootStackNav");
    } else {
      permissionCheck("location").then(() => {
        dispatch(storageActions.setSelectedDeviceId(selected));
        dispatch(storageActions.setIsStopped(false));
        dispatch(
          navigatorActions.setInitialRoute({
            initialLoggedInNavRouteName: "WalkMap",
          }),
        );
        navigation.replace("LoggedInNav");
      });
    }
  };

  return (
    <Container>
      {devices && devices.length ? (
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: rpWidth(16),
            paddingTop: rpHeight(31),
            paddingBottom: rpWidth(184),
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}>
          {devices.map((item, i) => (
            <WalkDeviceListItem
              isLast={i === devices.length - 1}
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
      ) : (
        <View>
          <MyText
            fontWeight="light"
            fontSize={18}
            color="rgba(0, 0, 0, 0.5)"
            style={{ textAlign: "center", marginTop: rpWidth(84) }}>
            산책할 반려동물이 없습니다.
          </MyText>
          <MyText
            fontWeight="light"
            fontSize={18}
            color="rgba(0, 0, 0, 0.5)"
            style={{ textAlign: "center", marginTop: rpWidth(5) }}>
            기기등록을 해주세요!
          </MyText>
          <Dog
            width={rpWidth(133)}
            height={rpWidth(214)}
            style={{
              alignSelf: "flex-end",
              marginRight: rpWidth(54),
              marginTop: rpWidth(77),
            }}
          />
        </View>
      )}
      <Button
        style={{
          width: rpWidth(126),
          position: "absolute",
          bottom: rpWidth(67),
          alignSelf: "center",
        }}
        disabled={devices.length !== 0 && !selected.length}
        onPress={handleStart}>
        {devices.length ? "선택 완료" : "등록"}
      </Button>
    </Container>
  );
};

export default StartWalking;
