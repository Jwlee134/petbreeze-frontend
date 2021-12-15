import React, { Fragment, useEffect, useState } from "react";
import { FlatList, useWindowDimensions, View } from "react-native";
import styled from "styled-components/native";
import MyText from "~/components/common/MyText";
import palette from "~/styles/palette";
import { WalkDetailDayScreenProps } from "~/types/navigator";
import Minus from "~/assets/svg/minus/minus-white.svg";
import Timer from "~/assets/svg/walk/timer.svg";
import Path from "~/assets/svg/walk/path.svg";
import Divider from "~/components/common/Divider";
import { formatWalkDistance, formatWalkTime } from "~/utils";
import { noAvatar, noName } from "~/constants";
import IosBottomModal from "~/components/modal/IosBottomModal";
import CustomHeader from "~/components/navigator/CustomHeader";
import deviceApi from "~/api/device";
import { useDispatch } from "react-redux";
import useModal from "~/hooks/useModal";
import IosBottomModalButton from "~/components/modal/IosBottomModalButton";

const Container = styled.View``;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SvgContainer = styled(RowContainer)`
  justify-content: space-evenly;
  padding-top: 18px;
  padding-bottom: 27px;
`;

const Avatar = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  margin-right: 25px;
`;

const MapContainer = styled.View`
  padding: 0 28px;
`;

const Map = styled.Image`
  width: 100%;
  height: 100%;
`;

const Delete = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
`;

const WalkDetailDay = ({
  navigation,
  route: {
    params: { deviceID, date, avatarUrl },
  },
}: WalkDetailDayScreenProps) => {
  const { width } = useWindowDimensions();
  const { open, close, modalProps } = useModal();
  const dispatch = useDispatch();

  const { data } = deviceApi.useGetDailyWalkRecordQuery(
    {
      deviceID,
      date: `${new Date(date).getFullYear()}-${
        new Date(date).getMonth() + 1
      }-${new Date(date).getDate()}`,
    },
    { refetchOnMountOrArgChange: true },
  );
  const [deleteWalk] = deviceApi.useDeleteWalkRecordMutation();
  const [walkID, setWalkID] = useState(0);

  const formatPeriod = (from: string, duration: number) => {
    const formatFrom = new Date(from);
    const formatTo = new Date(new Date(from).getTime() + duration * 60000);

    return `${formatFrom.getHours()}:${formatFrom
      .getMinutes()
      .toString()
      .padStart(2, "0")} ~ ${formatTo.getHours()}:${formatTo
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    dispatch(deviceApi.util.invalidateTags([{ type: "Walk", id: "MONTHLY" }]));
  }, []);

  const deleteRecord = () => {
    close();
    deleteWalk({ deviceID, walkID, date });
  };

  const openModal = (id: number) => {
    setWalkID(id);
    open();
  };

  return (
    <>
      <CustomHeader
        navigation={navigation}
        title={`${new Date(date).getMonth() + 1}월 ${new Date(
          date,
        ).getDate()}일`}
      />
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <Fragment key={item.id}>
            <Container>
              <RowContainer
                style={{
                  paddingHorizontal: 32,
                  justifyContent: "space-between",
                  paddingVertical: 18,
                }}>
                <RowContainer>
                  <Avatar source={avatarUrl ? { uri: avatarUrl } : noAvatar} />
                  <View>
                    <MyText color={palette.blue_7b} style={{ marginBottom: 5 }}>
                      {item.handler_name || noName}
                    </MyText>
                    <MyText color="rgba(0, 0, 0, 0.5)">
                      {formatPeriod(item.start_date_time, item.time)}
                    </MyText>
                  </View>
                </RowContainer>
                <Delete
                  onPress={() => {
                    openModal(item.id);
                  }}>
                  <Minus />
                </Delete>
              </RowContainer>
              <MapContainer style={{ height: width * 0.66 }}>
                <Map fadeDuration={0} source={{ uri: item.path_image }} />
              </MapContainer>
              <SvgContainer>
                <RowContainer>
                  <Timer width={22} height={27} style={{ marginRight: 17 }} />
                  <MyText color={palette.blue_7b} fontSize={24}>
                    {formatWalkTime(item.time)}
                  </MyText>
                </RowContainer>
                <RowContainer>
                  <Path width={21} height={22} style={{ marginRight: 17 }} />
                  <MyText color={palette.blue_7b} fontSize={24}>
                    {formatWalkDistance(item.distance)}
                  </MyText>
                </RowContainer>
              </SvgContainer>
            </Container>
            {data && data.length > 1 && index !== data.length - 1 ? (
              <Divider style={{ width: width - 34, alignSelf: "center" }} />
            ) : null}
          </Fragment>
        )}
      />
      <IosBottomModal
        modalProps={modalProps}
        close={close}
        title="이 산책 기록을 삭제하시겠습니까?">
        <IosBottomModalButton isLast onPress={deleteRecord}>
          <MyText color={palette.red_f0}>삭제</MyText>
        </IosBottomModalButton>
      </IosBottomModal>
    </>
  );
};

export default WalkDetailDay;
