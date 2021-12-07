import React, { useContext } from "react";
import { useAppSelector } from "~/store";
import Button from "../common/Button";
import { WalkContext } from "~/context/WalkContext";
import { useNavigation } from "@react-navigation/native";
import { WalkMapScreenNavigationProp } from "~/types/navigator";
import { isEndWithConsonant } from "~/utils";
import deviceApi, { GeoJsonType } from "~/api/device";
import imageHandler from "~/utils/imageHandler";
import allSettled from "promise.allsettled";
import { storageActions } from "~/store/storage";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";

const Result = () => {
  const { viewShotRef, deviceList } = useContext(WalkContext);
  const navigation = useNavigation<WalkMapScreenNavigationProp>();
  const [postWalk, { isLoading: loading1 }] = deviceApi.usePostWalkMutation();
  const [postWalkThumbnail, { isLoading: loading2 }] =
    deviceApi.usePatchWalkThumbnailMutation();
  const [stopWalking, { isLoading: loading3 }] =
    deviceApi.useStopWalkingMutation();
  const dispatch = useDispatch();

  const isLoading = loading1 || loading2 || loading3;

  const { startTime, duration, meter, coords, selectedDeviceId } =
    useAppSelector(state => state.storage.walk);

  const handleFinish = async () => {
    if (isLoading) return;
    const uri = await viewShotRef.current?.capture();
    const results = await allSettled(
      selectedDeviceId.map(id => stopWalking(id).unwrap()),
    );

    const fulfilledIds = selectedDeviceId.filter(
      (id, i) => results[i].status === "fulfilled",
    );
    const rejectedIds = selectedDeviceId.filter(
      (id, i) => results[i].status === "rejected",
    );

    if (rejectedIds.length) {
      const rejectedNames = rejectedIds
        .map(
          id =>
            deviceList[deviceList.findIndex(device => device.id === id)].name,
        )
        .join(", ");
      Toast.show({
        type: "error",
        text1: `${rejectedNames}${
          isEndWithConsonant(rejectedNames) ? "은" : "는"
        } 산책중이 아닙니다.`,
      });
    }
    const fulfilledResults = await allSettled(
      fulfilledIds.map(id =>
        postWalk({
          deviceID: id,
          body: {
            distance: meter,
            start_date_time: startTime,
            time: Math.floor(duration / 60),
            path: {
              type: GeoJsonType.LineString,
              coordinates: coords,
            },
          },
        }).unwrap(),
      ),
    );

    if (uri && fulfilledResults.length) {
      const formData = imageHandler.handleFormData(uri, "path_image");
      await allSettled(
        fulfilledIds
          .map((id, i) => {
            if (fulfilledResults[i].status === "rejected") return null;
            return postWalkThumbnail({
              body: formData,
              deviceID: id,
              walkID: fulfilledResults[i].value.id,
            });
          })
          .filter(item => item !== null),
      );
    }

    dispatch(deviceApi.util.invalidateTags([{ type: "Device", id: "LIST" }]));
    setTimeout(() => {
      dispatch(storageActions.setWalk(null));
    }, 200);

    navigation.replace("BottomTabNav", {
      initialRouteName: "WalkTab",
    });
  };

  return (
    <Button
      style={{ marginTop: 32 }}
      isLoading={isLoading}
      onPress={handleFinish}>
      산책 종료
    </Button>
  );
};

export default Result;
