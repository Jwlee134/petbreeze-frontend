import React, { useContext, useEffect, useState } from "react";
import deviceApi, { Device } from "~/api/device";
import Button from "~/components/common/Button";
import { ScrollView, View } from "react-native";
import ListItem from "~/components/common/ListItem";
import MyText from "~/components/common/MyText";
import Dog from "~/assets/svg/dog/dog-with-device.svg";
import WalkDeviceListItem from "~/components/walk/WalkDeviceListItem";
import {
  StartWalkingScreenNavigationProp,
  StartWalkingScreenRouteProp,
} from "~/types/navigator";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import allSettled from "promise.allsettled";
import Toast from "react-native-toast-message";
import permissionCheck from "~/utils/permissionCheck";
import { consonantResponder } from "~/utils";
import { storageActions } from "~/store/storage";
import { DimensionsContext } from "~/context/DimensionsContext";
import { ToastType } from "~/styles/toast";

interface Props {
  navigation: StartWalkingScreenNavigationProp;
  route: StartWalkingScreenRouteProp;
  deviceList: Device[];
}

const StartWalking = ({
  navigation,
  route: { params: { preSelectedID } = {} },
  deviceList,
}: Props) => {
  const { rpHeight } = useContext(DimensionsContext);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [startWalking, { isLoading: loading1 }] =
    deviceApi.useStartWalkingMutation();
  const [stopWalking, { isLoading: loading2 }] =
    deviceApi.useStopWalkingMutation();

  const isLoading = loading1 || loading2;

  const [selectedIDs, setSelectedIDs] = useState<number[]>([]);
  const [selectedByParams, setSelectedByParams] = useState(false);

  const handleStart = async () => {
    if (isLoading) return;
    try {
      await permissionCheck.locationAlways();
      const results = await allSettled(
        selectedIDs.map(id => startWalking(id).unwrap()),
      );
      // 거절된 시작 요청이 있으면 거절된 디바이스의 이름 토스트로 출력 및 성공한 디바이스의 산책 종료 요청, 아니면 바로 산책 시작
      if (results.some(result => result.status === "rejected")) {
        if (results.some(result => result.reason.data.error_code === "D018")) {
          const rejectedNames = selectedIDs
            .filter((id, i) => results[i].status === "rejected")
            .map(
              id =>
                deviceList[deviceList.findIndex(device => device.id === id)]
                  .name,
            )
            .join(", ");
          Toast.show({
            type: ToastType.Error,
            text1: `${rejectedNames}${consonantResponder(
              rejectedNames,
            )}는 이미 산책중입니다.`,
          });
        }
        await allSettled(
          selectedIDs
            .filter((id, i) => results[i].status !== "rejected")
            .map(id => stopWalking(id)),
        );
        return;
      }
      dispatch(storageActions.setWalk({ selectedDeviceId: selectedIDs }));
      navigation.replace("LoggedInNav", { initialRouteName: "WalkMap" });
    } catch {}
  };

  const onDevicePress = (device: Device) => {
    setSelectedIDs(prev => {
      const copy = [...prev];
      const isSelected = copy.some(selectedItem => selectedItem === device.id);
      if (isSelected) {
        return copy.filter(selectedItem => selectedItem !== device.id);
      }
      return [...copy, device.id];
    });
  };

  useEffect(() => {
    if (!isFocused || !preSelectedID || selectedByParams) return;
    setSelectedIDs([preSelectedID]);
    setSelectedByParams(true);
  }, [preSelectedID, isFocused, selectedByParams]);

  return deviceList && deviceList.length ? (
    <ScrollView
      contentContainerStyle={{
        paddingTop: 20,
        flexGrow: 1,
        justifyContent: "space-between",
        paddingBottom: 67,
      }}
      showsVerticalScrollIndicator={false}>
      <View>
        {deviceList.map(device => (
          <ListItem
            key={device.id}
            isIconArrow={false}
            onPress={() => onDevicePress(device)}
            selected={selectedIDs.includes(device.id)}>
            <WalkDeviceListItem device={device} />
          </ListItem>
        ))}
      </View>
      <Button
        isLoading={isLoading}
        style={{ width: 126, marginTop: 67 }}
        disabled={!selectedIDs.length}
        onPress={handleStart}>
        산책하기
      </Button>
    </ScrollView>
  ) : (
    <View style={{ flexGrow: 1, justifyContent: "space-between" }}>
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
        width={rpHeight(163)}
        height={rpHeight(232)}
        style={{
          alignSelf: "flex-end",
          marginRight: 46,
          marginVertical: rpHeight(45),
        }}
      />
      <Button
        style={{ width: 126, marginBottom: rpHeight(67) }}
        onPress={() => {
          navigation.navigate("AddDevice");
        }}>
        등록
      </Button>
    </View>
  );
};

export default StartWalking;
