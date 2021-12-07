import React, { useEffect } from "react";
import { View } from "react-native";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import Divider from "~/components/common/Divider";
import MyText from "~/components/common/MyText";
import WiFiSection from "~/components/deviceSetting/WiFiSection";
import CustomHeader from "~/components/navigator/CustomHeader";
import palette from "~/styles/palette";
import { UpdateAreaScreenNavigationProp } from "~/types/navigator";
import UpdateAreaMap from "~/components/area/UpdateAreaMap";
import AreaInputs from "~/components/area/AreaInputs";
import AreaSearchBar from "~/components/area/AreaSearchBar";
import { useDispatch } from "react-redux";
import { deviceSettingActions } from "~/store/deviceSetting";
import { useAppSelector } from "~/store";
import LoadingIndicator from "~/components/lottie/LoadingIndicator";
import { textLoadingIndicatorSize } from "~/styles/constants";
import { isAndroid } from "~/utils";

const UpdateArea = ({
  navigation,
}: {
  navigation: UpdateAreaScreenNavigationProp;
}) => {
  const isSubmitting = useAppSelector(
    state => state.deviceSetting.area.isSubmitting,
  );
  const isSearchMode = useAppSelector(
    state => state.deviceSetting.area.isSearchMode,
  );
  const dispatch = useDispatch();

  const onRightButtonPress = () => {
    dispatch(deviceSettingActions.setArea({ isSubmitting: true }));
  };

  useEffect(() => {
    return () => {
      dispatch(deviceSettingActions.setArea(null));
      dispatch(deviceSettingActions.setAreaDraft(null));
    };
  }, []);

  return (
    <>
      <CustomHeader
        title="안심존 수정"
        navigation={navigation}
        RightButtonText={
          isSubmitting ? (
            <LoadingIndicator size={textLoadingIndicatorSize} />
          ) : (
            <MyText color={palette.blue_7b}>완료</MyText>
          )
        }
        onRightButtonPress={onRightButtonPress}
      />
      <KeyboardAwareScrollContainer
        scrollEnabled={isAndroid || !isSearchMode}
        contentContainerStyle={{ paddingBottom: 10 }}>
        <AreaSearchBar isUpdateArea />
        <UpdateAreaMap />
        <AreaInputs
          style={{ paddingTop: 26, paddingBottom: 17, marginTop: -67 }}
        />
        <View style={{ paddingHorizontal: 16, paddingBottom: 10 }}>
          <Divider />
        </View>
        <WiFiSection />
      </KeyboardAwareScrollContainer>
    </>
  );
};

export default UpdateArea;
