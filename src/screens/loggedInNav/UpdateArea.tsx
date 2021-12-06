import React, { useEffect, useRef } from "react";
import { useWindowDimensions } from "react-native";
import NaverMapView, { Circle } from "react-native-nmap";
import ViewShot from "react-native-view-shot";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import Divider from "~/components/common/Divider";
import Input from "~/components/common/Input";
import Map from "~/components/common/Map";
import MyText from "~/components/common/MyText";
import ScrollPicker from "~/components/common/ScrollPicker";
import WiFiSection from "~/components/deviceSetting/WiFiSection";
import CustomHeader from "~/components/navigator/CustomHeader";
import { useAppSelector } from "~/store";
import { deviceSettingActions } from "~/store/deviceSetting";
import palette from "~/styles/palette";
import { UpdateAreaScreenNavigationProp } from "~/types/navigator";
import { getLeftRightPointsOfCircle } from "~/utils";

const RowContainer = styled.View`
  flex-direction: row;
  padding: 0px 38px;
  margin-top: 26px;
  margin-bottom: 17px;
`;

const InputContainer = styled.View`
  width: 43%;
`;

const data = ["10m", "20m", "30m", "50m", "100m"];

const UpdateArea = ({
  navigation,
}: {
  navigation: UpdateAreaScreenNavigationProp;
}) => {
  const mapRef = useRef<NaverMapView | null>(null);
  const viewShotRef = useRef<ViewShot | null>(null);
  const { width } = useWindowDimensions();

  const { coord, radius, name } = useAppSelector(
    state => state.deviceSetting.draft.area,
  );
  const dispatch = useDispatch();

  const onRightButtonPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (!mapRef.current || !radius || !coord.latitude || !coord.longitude)
      return;
    const edgePoints = getLeftRightPointsOfCircle(
      coord.latitude,
      coord.longitude,
      radius,
    );
    mapRef.current.animateToTwoCoordinates(edgePoints[0], edgePoints[1]);
  }, [mapRef.current, radius]);

  const onNameChange = (text: string) => {
    dispatch(deviceSettingActions.setAreaDraft({ name: text }));
  };

  const onValueChange = (value: string, index: number) => {
    dispatch(
      deviceSettingActions.setAreaDraft({
        radius: parseInt(data[index], 10),
      }),
    );
  };

  return (
    <>
      <CustomHeader
        title="안심존 수정"
        navigation={navigation}
        RightButtonText={<MyText color={palette.blue_7b}>완료</MyText>}
        onRightButtonPress={onRightButtonPress}
      />
      <KeyboardAwareScrollContainer
        contentContainerStyle={{ paddingBottom: 10 }}>
        <ViewShot ref={viewShotRef}>
          <Map
            onCameraChange={({ latitude, longitude }) => {
              dispatch(
                deviceSettingActions.setAreaDraft({
                  coord: { latitude, longitude },
                }),
              );
            }}
            ref={mapRef}
            isPositionAbsolute={false}
            style={{ width, height: width * 1.07 }}>
            {coord.latitude && coord.longitude && radius ? (
              <Circle
                coordinate={{
                  latitude: coord.latitude,
                  longitude: coord.longitude,
                }}
                radius={radius}
                color={palette.blue_6e_20}
                outlineColor={palette.blue_6e_50}
                outlineWidth={1}
              />
            ) : null}
          </Map>
        </ViewShot>
        <RowContainer>
          <InputContainer style={{ marginRight: "13%" }}>
            <Input
              value={name}
              placeholder="안심존 이름"
              onChangeText={onNameChange}
              textAlign="center"
            />
          </InputContainer>
          <InputContainer style={{ alignItems: "center" }}>
            <ScrollPicker
              data={data}
              selectedIndex={data.findIndex(item => item === `${radius}m`)}
              onValueChange={onValueChange}
              width={88}
              height={39}
            />
          </InputContainer>
        </RowContainer>
        <Divider
          style={{ width: width - 34, alignSelf: "center", marginBottom: 10 }}
        />
        <WiFiSection />
      </KeyboardAwareScrollContainer>
    </>
  );
};

export default UpdateArea;
