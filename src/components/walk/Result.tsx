import React, { useContext, useState } from "react";
import styled, { css } from "styled-components/native";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import { useAppSelector } from "~/store";
import AnimatedCircularProgress from "../common/AnimatedCircularProgress";
import Button from "../common/Button";
import MyText from "../common/MyText";
import Timer from "~/assets/svg/walk/timer-gray.svg";
import Path from "~/assets/svg/walk/path-gray.svg";
import palette from "~/styles/palette";
import { View } from "react-native";
import { WalkContext } from "~/context/WalkContext";
import { useNavigation } from "@react-navigation/native";
import { WalkMapScreenNavigationProp } from "~/types/navigator";
import { formatWalkDistance } from "~/utils";
import deviceApi from "~/api/device";
import imageHandler from "~/utils/imageHandler";
import allSettled from "promise.allsettled";
import { storageActions } from "~/store/storage";
import { useDispatch } from "react-redux";

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
  const { viewShotRef, deviceList } = useContext(WalkContext);
  const navigation = useNavigation<WalkMapScreenNavigationProp>();
  const [postWalk] = deviceApi.usePostWalkMutation();
  const [postWalkThumbnail] = deviceApi.usePatchWalkThumbnailMutation();
  const [stopWalking] = deviceApi.useStopWalkingMutation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { startTime, duration, meter, coords, selectedDeviceId } =
    useAppSelector(state => state.storage.walk);

  const hour = Math.floor(duration / 3600) % 60;
  const min = Math.floor(duration / 60) % 60;
  const sec = Math.floor(duration) % 60;

  const handleFinish = async () => {
    if (loading) return;
    setLoading(true);
    const uri = await viewShotRef.current?.capture();

    const results = await allSettled(
      selectedDeviceId.map(id =>
        postWalk({
          deviceID: id,
          body: {
            distance: meter,
            start_date_time: startTime,
            time: Math.floor(duration / 60),
            path: {
              type: "LineString",
              coordinates: coords,
            },
          },
        }).unwrap(),
      ),
    );

    if (uri) {
      const formData = imageHandler.handleFormData(uri, "path_image");
      await allSettled(
        selectedDeviceId
          .map((id, i) => {
            if (results[i].status === "rejected") return null;
            return postWalkThumbnail({
              body: formData,
              deviceID: id,
              walkID: results[i].value.id,
            });
          })
          .filter(item => item !== null),
      );
    }

    await allSettled(
      selectedDeviceId
        .map((id, i) => {
          if (results[i].status === "rejected") return null;
          return stopWalking(id);
        })
        .filter(item => item !== null),
    );

    dispatch(deviceApi.util.invalidateTags([{ type: "Device", id: "LIST" }]));
    setTimeout(() => {
      dispatch(storageActions.setWalk(null));
    }, 200);

    navigation.replace("BottomTabNav", {
      initialRouteName: "WalkTab",
    });
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
        {deviceList.map((device, i) =>
          i < 3 ? (
            <View key={i}>
              <AnimatedCircularProgress
                avatar={device.profile_image}
                circleWidth={70}
                lineWidth={2.5}
                battery={100}
                style={{
                  marginRight:
                    i === deviceList.length - 1 || i === 2 ? 0 : rpWidth(21),
                  ...(i === 2 &&
                    deviceList.length > 3 && {
                      opacity: 0.1,
                    }),
                }}
              />
              {i === 2 && deviceList.length > 3 && (
                <Overlay rpWidth={rpWidth}>
                  <MyText
                    color={palette.blue_7b_90}
                    fontWeight="medium"
                    fontSize={18}>
                    +{deviceList.length - 3}
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
            {formatWalkDistance(meter)}
          </MyText>
        </RowContainer>
      </SvgContainer>
      <Button isLoading={loading} onPress={handleFinish}>
        산책 종료
      </Button>
    </Container>
  );
};

export default Result;
