import React, { useState } from "react";
import { StartWalkingScreenNavigationProp } from "~/types/navigator";
import deviceApi, { Device } from "~/api/device";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";
import { isEndWithConsonant } from "~/utils";
import Button from "~/components/common/Button";
import { ScrollView, View } from "react-native";
import ListItem from "~/components/common/ListItem";
import MyText from "~/components/common/MyText";
import Dog from "~/assets/svg/dog/dog-with-device.svg";
import WalkDeviceListItem from "~/components/walk/WalkDeviceListItem";
import allSettled from "promise.allsettled";
import Toast from "react-native-toast-message";
import permissionCheck from "~/utils/permissionCheck";

const StartWalking = ({
  navigation,
  deviceList,
}: {
  navigation: StartWalkingScreenNavigationProp;
  deviceList: Device[];
}) => {
  const [selected, setSelected] = useState<number[]>([]);
  const dispatch = useDispatch();
  const [startWalking] = deviceApi.useStartWalkingMutation();
  const [stopWalking] = deviceApi.useStopWalkingMutation();
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    try {
      await permissionCheck.locationAlways();
      const results = await allSettled(
        selected.map(id => startWalking(id).unwrap()),
      );
      // 거절된 시작 요청이 있으면 거절된 디바이스의 id 토스트로 출력 및 성공한 디바이스
      // 의 산책 종료 요청, 아니면 바로 산책 시작
      if (results.some(result => result.status === "rejected")) {
        const rejectedNames = selected
          .filter((id, i) => results[i].status === "rejected")
          .map(
            id =>
              deviceList[deviceList.findIndex(device => device.id === id)].name,
          )
          .join(", ");
        Toast.show({
          type: "error",
          text1: `${rejectedNames}${
            isEndWithConsonant(rejectedNames) ? "은" : "는"
          } 이미 산책중입니다.`,
        });
        await allSettled(
          selected
            .map((id, i) => {
              if (results[i].status === "rejected") return null;
              return stopWalking(id);
            })
            .filter(item => item !== null),
        );
      } else {
        dispatch(
          storageActions.setWalk({
            selectedDeviceId: selected,
          }),
        );
        navigation.replace("LoggedInNav", {
          initialRouteName: "WalkMap",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return deviceList && deviceList.length ? (
    <ScrollView
      contentContainerStyle={{
        paddingTop: 31,
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
        isLoading={loading}
        style={{ width: 126, marginTop: 67 }}
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
          style={{ textAlign: "center", marginTop: 67 }}>
          산책할 반려동물이 없습니다.
        </MyText>
        <MyText
          fontWeight="light"
          fontSize={18}
          color="rgba(0, 0, 0, 0.5)"
          style={{ textAlign: "center", marginTop: 5 }}>
          기기등록을 해주세요!
        </MyText>
      </View>
      <Dog
        width={163}
        height={232}
        style={{
          alignSelf: "flex-end",
          marginRight: 46,
          marginVertical: 45,
        }}
      />
      <Button
        style={{ width: 126, marginBottom: 67 }}
        onPress={() => {
          navigation.navigate("BleRootStackNav");
        }}>
        등록
      </Button>
    </ScrollView>
  );
};

export default StartWalking;
