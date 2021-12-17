import React, { useState } from "react";
import { MissingReportInfoScreenProps } from "~/types/navigator";
import BackButton from "~/components/navigator/CustomHeader/BackButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MissingReportInfoBottomSheet from "~/components/missingReportInfo/MissingReportInfoBottomSheet";
import MissingReportInfoMap from "~/components/missingReportInfo/MissingReportInfoMap";
import { useWindowDimensions, View } from "react-native";
import BottomSheet from "~/components/common/BottomSheet";
import deviceApi from "~/api/device";
import LoadingIndicator from "~/components/lottie/LoadingIndicator";

const MissingReportInfo = ({
  navigation,
  route: {
    params: { deviceID },
  },
}: MissingReportInfoScreenProps) => {
  const { data } = deviceApi.useGetMissingReportQuery(deviceID);
  const { height } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();

  const [index, setIndex] = useState(1);
  const snapPoints = [89 + bottom, height / 2];

  return (
    <>
      <BackButton
        style={{ position: "absolute", zIndex: 1, top, height: 48 }}
        navigation={navigation}
      />
      <MissingReportInfoMap
        emergencyKey={data?.emergency_key || ""}
        bottom={snapPoints[index] - bottom}
      />
      <BottomSheet
        index={index}
        snapPoints={snapPoints}
        onChange={index => setIndex(index)}>
        {!data ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <LoadingIndicator size={80} />
          </View>
        ) : (
          <MissingReportInfoBottomSheet data={data} />
        )}
      </BottomSheet>
    </>
  );
};

export default MissingReportInfo;
