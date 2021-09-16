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
import ListItem from "~/components/common/ListItem";
import { navigatorActions } from "~/store/navigator";
import MyText from "~/components/common/MyText";
import Dog from "~/assets/svg/dog/dog-with-device.svg";
import palette from "~/styles/palette";
import DeviceAvatarCircle from "~/components/common/DeviceAvatarCircle";

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const TextContainer = styled.View`
  margin-left: ${rpWidth(26)}px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
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
      dispatch(
        storageActions.setDevice({
          redirectionRouteName: "StartWalking",
        }),
      );
      navigation.navigate("BleRootStackNav");
    } else {
      permissionCheck("location").then(() => {
        dispatch(
          storageActions.setWalk({
            selectedDeviceId: selected,
          }),
        );
        dispatch(
          storageActions.setWalk({
            isStopped: false,
          }),
        );
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
            paddingTop: rpHeight(31),
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}>
          {devices.map(item => (
            <ListItem
              key={item.id}
              isIconArrow={false}
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
              selected={selected.includes(item.id)}>
              <RowContainer>
                <DeviceAvatarCircle
                  isBackgroundTransparent
                  lineWidth={2}
                  circleWidth={70}
                  battery={item.battery}
                />
                <TextContainer>
                  <RowContainer>
                    <MyText fontWeight="medium">{item.name}</MyText>
                    <MyText
                      fontSize={12}
                      color={palette.blue_7b}
                      style={{ marginLeft: rpWidth(12) }}>
                      {item.battery}%
                    </MyText>
                  </RowContainer>
                  <MyText
                    style={{ marginTop: rpWidth(5) }}
                    fontSize={12}
                    color="rgba(0, 0, 0, 0.5)">
                    마지막 산책
                  </MyText>
                </TextContainer>
              </RowContainer>
            </ListItem>
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
