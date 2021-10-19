import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import { StartWalkingScreenNavigationProp } from "~/types/navigator";
import { Device } from "~/api/device";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";
import { permissionCheck } from "~/utils";
import Button from "~/components/common/Button";
import { ScrollView, View } from "react-native";
import ListItem from "~/components/common/ListItem";
import { navigatorActions } from "~/store/navigator";
import MyText from "~/components/common/MyText";
import Dog from "~/assets/svg/dog/dog-with-device.svg";
import { DimensionsContext } from "~/context/DimensionsContext";
import WalkDeviceListItem from "~/components/walk/WalkDeviceListItem";

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const StartWalking = ({
  navigation,
  deviceList,
}: {
  navigation: StartWalkingScreenNavigationProp;
  deviceList: Device[];
}) => {
  const { rpHeight, rpWidth } = useContext(DimensionsContext);
  const [selected, setSelected] = useState<number[]>([]);
  const dispatch = useDispatch();

  const handleStart = () => {
    if (!selected.length) {
      navigation.navigate("BleRootStackNav");
    } else {
      permissionCheck("location").then(() => {
        dispatch(
          storageActions.setWalk({
            selectedDeviceId: selected,
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
      {deviceList && deviceList.length ? (
        <ScrollView
          contentContainerStyle={{
            paddingTop: rpHeight(31),
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}>
          {deviceList.map(device => (
            <ListItem
              key={device.id}
              isIconArrow={false}
              onPress={() => {
                const selectedArr = [...selected];
                const isSelected = selectedArr.some(
                  selectedItem => selectedItem === device.id,
                );
                if (isSelected) {
                  setSelected(
                    selectedArr.filter(
                      selectedItem => selectedItem !== device.id,
                    ),
                  );
                } else {
                  setSelected([...selectedArr, device.id]);
                }
              }}
              selected={selected.includes(device.id)}>
              <WalkDeviceListItem device={device} />
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
        disabled={deviceList?.length !== 0 && !selected.length}
        onPress={handleStart}>
        {deviceList?.length ? "선택 완료" : "등록"}
      </Button>
    </Container>
  );
};

export default StartWalking;
