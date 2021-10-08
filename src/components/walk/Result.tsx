import React, { useContext } from "react";
import styled, { css } from "styled-components/native";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import { store } from "~/store";
import AnimatedCircularProgress from "../common/AnimatedCircularProgress";
import Button from "../common/Button";
import MyText from "../common/MyText";
import Timer from "~/assets/svg/walk/timer-gray.svg";
import Path from "~/assets/svg/walk/path-gray.svg";
import palette from "~/styles/palette";
import { View } from "react-native";
import { WalkContext } from "~/context/WalkContext";
import CameraRoll from "@react-native-community/cameraroll";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";
import { navigatorActions } from "~/store/navigator";
import { useNavigation } from "@react-navigation/core";
import { WalkMapScreenNavigationProp } from "~/types/navigator";

const Container = styled.View`
  align-items: center;
`;

const Avatar = styled.View<{ rpWidth: RpWidth }>`
  padding: ${({ rpWidth }) => `${rpWidth(18)}px 0`};
  flex-direction: row;
`;

const Overlay = styled.View<{ rpWidth: RpWidth }>`
  position: absolute;
  background-color: ${palette.blue_7b_10};
  justify-content: center;
  align-items: center;
  ${({ rpWidth }) => css`
    width: ${rpWidth(70)}px;
    height: ${rpWidth(70)}px;
    border-radius: ${rpWidth(35)}px;
  `}
`;

const SvgContainer = styled.View<{ rpWidth: RpWidth }>`
  flex-direction: row;
  justify-content: space-evenly;
  padding-bottom: ${({ rpWidth }) => rpWidth(30)}px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

const Result = () => {
  const { rpWidth } = useContext(DimensionsContext);
  const { viewShotRef, devices } = useContext(WalkContext);
  const dispatch = useDispatch();
  const navigation = useNavigation<WalkMapScreenNavigationProp>();

  const { startTime, duration, meter } = store.getState().storage.walk;

  const hour = Math.floor(duration / 3600) % 60;
  const min = Math.floor(duration / 60) % 60;
  const sec = Math.floor(duration) % 60;

  const handleFinish = async () => {
    const { startTime, duration, meter, coords, selectedDeviceId } =
      store.getState().storage.walk;
    if (viewShotRef?.current) {
      const uri = await viewShotRef.current?.capture();
      CameraRoll.save(uri, { album: "어디개" });
    }
    dispatch(storageActions.setWalk(null));
    dispatch(
      navigatorActions.setInitialRoute({
        initialBottomTabNavRouteName: "WalkTab",
      }),
    );
    navigation.replace("BottomTabNav");
    // const promise = selectedDeviceId.map(id =>
    //   trigger({
    //     deviceId: id,
    //     start_date_time: new Date(startTime),
    //     walking_time: duration,
    //     distance: meter,
    //     coordinates: coords,
    //   }),
    // );
    // Promise.all(promise).then(() => {
    //   dispatch(storageActions.clearWalk());
    //   navigation.replace("BottomTabNav", {
    //     initialRoute: "WalkTab",
    //   });
    // });
  };

  return (
    <Container>
      <MyText fontWeight="medium" fontSize={18}>
        {(() => {
          const format = new Date(startTime);
          return `${format.getFullYear()}년 ${
            format.getMonth() + 1
          }월 ${format.getDate()}일의 산책`;
        })()}
      </MyText>
      <Avatar rpWidth={rpWidth}>
        {devices.map((device, i) =>
          i < 3 ? (
            <View key={i}>
              <AnimatedCircularProgress
                circleWidth={70}
                lineWidth={2.5}
                battery={100}
                style={{
                  marginRight:
                    i === devices.length - 1 || i === 2 ? 0 : rpWidth(21),
                  ...(i === 2 &&
                    devices.length > 3 && {
                      opacity: 0.1,
                    }),
                }}
              />
              {i === 2 && devices.length > 3 && (
                <Overlay rpWidth={rpWidth}>
                  <MyText
                    color={palette.blue_7b_90}
                    fontWeight="medium"
                    fontSize={18}>
                    +{devices.length - 3}
                  </MyText>
                </Overlay>
              )}
            </View>
          ) : null,
        )}
      </Avatar>
      <SvgContainer rpWidth={rpWidth}>
        <RowContainer>
          <Timer
            width={rpWidth(22)}
            height={rpWidth(27)}
            style={{ marginRight: rpWidth(17) }}
          />
          <MyText fontSize={18} color="rgba(0, 0, 0, 0.5)">
            {hour < 10 ? `${hour}` : hour} : {min < 10 ? `0${min}` : min} :{" "}
            {sec < 10 ? `0${sec}` : sec}
          </MyText>
        </RowContainer>
        <RowContainer>
          <Path
            width={rpWidth(21)}
            height={rpWidth(22)}
            style={{ marginRight: rpWidth(17) }}
          />
          <MyText fontSize={18} color="rgba(0, 0, 0, 0.5)">
            {meter < 1000
              ? `${meter}m`
              : `${String(meter / 1000).substring(0, 4)}km`}
          </MyText>
        </RowContainer>
      </SvgContainer>
      <Button onPress={handleFinish}>산책 종료</Button>
    </Container>
  );
};

export default Result;
