import React, { useContext } from "react";
import { useAppSelector } from "~/store";
import Button from "../common/Button";
import { WalkContext } from "~/context/WalkContext";
import { useNavigation } from "@react-navigation/native";
import { WalkMapScreenNavigationProp } from "~/types/navigator";
import { consonantResponder } from "~/utils";
import deviceApi from "~/api/device";
import imageHandler from "~/utils/imageHandler";
import allSettled from "promise.allsettled";
import { storageActions } from "~/store/storage";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import { GEOJSON_TYPE, TOAST_TYPE } from "~/constants";

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
      (id, i) =>
        results[i].status === "rejected" &&
        results[i].data.error_code === "D019",
    );

    if (rejectedIds.length) {
      const rejectedNames = rejectedIds
        .map(
          id =>
            deviceList[deviceList.findIndex(device => device.id === id)].name,
        )
        .join(", ");
      Toast.show({
        type: TOAST_TYPE.ERROR,
        text1: `${rejectedNames}${consonantResponder(
          rejectedNames,
        )}는 산책중이 아닙니다.`,
      });
    }

    if (coords.length > 1) {
      const fulfilledResults = await allSettled(
        fulfilledIds.map(id =>
          postWalk({
            deviceID: id,
            body: {
              distance: meter,
              start_date_time: startTime,
              time: Math.floor(duration / 60),
              path: {
                type: GEOJSON_TYPE.LINE_STRING,
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
            .filter((id, i) => fulfilledResults[i].status !== "rejected")
            .map((id, i) =>
              postWalkThumbnail({
                body: formData,
                deviceID: id,
                walkID: fulfilledResults[i].value.id,
              }).unwrap(),
            ),
        );
      }
    } else {
      Toast.show({ type: TOAST_TYPE.ERROR, text1: "기록할 경로가 없습니다." });
    }

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
