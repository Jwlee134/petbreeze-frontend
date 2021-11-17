import React, { useContext, useState } from "react";
import { StartWalkingScreenNavigationProp } from "~/types/navigator";
import { Device } from "~/api/device";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";
import { permissionCheck } from "~/utils";
import Button from "~/components/common/Button";
import { ScrollView, View } from "react-native";
import ListItem from "~/components/common/ListItem";
import MyText from "~/components/common/MyText";
import Dog from "~/assets/svg/dog/dog-with-device.svg";
import { DimensionsContext } from "~/context/DimensionsContext";
import WalkDeviceListItem from "~/components/walk/WalkDeviceListItem";

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
    permissionCheck("location").then(() => {
      dispatch(
        storageActions.setWalk({
          selectedDeviceId: selected,
        }),
      );
      navigation.replace("LoggedInNav", {
        initialRouteName: "WalkMap",
      });
    });
  };

  return deviceList && deviceList.length ? (
    <ScrollView
      contentContainerStyle={{
        paddingTop: rpHeight(31),
        flexGrow: 1,
        justifyContent: "space-between",
        paddingBottom: rpHeight(67),
      }}
      showsVerticalScrollIndicator={false}>
      <View>
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
      </View>
      <Button
        style={{ width: rpWidth(126), marginTop: rpWidth(67) }}
        disabled={!selected.length}
        onPress={handleStart}>
        선택 완료
      </Button>
    </ScrollView>
  ) : (
    <ScrollView
      bounces={false}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}>
      <View>
        <MyText
          fontWeight="light"
          fontSize={18}
          color="rgba(0, 0, 0, 0.5)"
          style={{ textAlign: "center", marginTop: rpHeight(67) }}>
          산책할 반려동물이 없습니다.
        </MyText>
        <MyText
          fontWeight="light"
          fontSize={18}
          color="rgba(0, 0, 0, 0.5)"
          style={{ textAlign: "center", marginTop: rpHeight(5) }}>
          기기등록을 해주세요!
        </MyText>
      </View>
      <Dog
        width={rpWidth(163)}
        height={rpHeight(232)}
        style={{
          alignSelf: "flex-end",
          marginRight: rpWidth(46),
          marginVertical: rpHeight(45),
        }}
      />
      <Button
        style={{ width: rpWidth(126), marginBottom: rpWidth(67) }}
        onPress={() => {
          navigation.navigate("BleRootStackNav");
        }}>
        등록
      </Button>
    </ScrollView>
  );
};

export default StartWalking;
