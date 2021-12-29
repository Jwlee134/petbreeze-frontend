import React, { Fragment, useState } from "react";
import { FlatList, useWindowDimensions, View } from "react-native";
import styled from "styled-components/native";
import MyText from "~/components/common/MyText";
import palette from "~/styles/palette";
import { WalkDetailDayScreenProps } from "~/types/navigator";
import Timer from "~/assets/svg/walk/timer.svg";
import Path from "~/assets/svg/walk/path.svg";
import { formatWalkDistance, formatWalkTime } from "~/utils";
import { DEFAULT_AVATAR, DEFAULT_NAME } from "~/constants";
import IosBottomModal from "~/components/modal/IosBottomModal";
import CustomHeader from "~/components/navigator/CustomHeader";
import deviceApi from "~/api/device";
import useModal from "~/hooks/useModal";
import IosBottomModalButton from "~/components/modal/IosBottomModalButton";
import X from "~/assets/svg/walkDetailDay/x-black.svg";
import { HEADER_BACK_BUTTON_WIDTH, HEADER_HEIGHT } from "~/styles/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Container = styled.View``;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const HeaderContainer = styled(RowContainer)`
  position: absolute;
  left: ${HEADER_BACK_BUTTON_WIDTH}px;
  height: ${HEADER_HEIGHT}px;
`;

const TopContainer = styled(RowContainer)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 44px;
  justify-content: space-between;
`;

const BottomContainer = styled(RowContainer)`
  justify-content: space-evenly;
  height: 44px;
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
`;

const FloatingItem = styled.View`
  height: 25.5px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 100px;
  padding: 0 10px;
  justify-content: center;
  align-items: center;
`;

const Avatar = styled.Image`
  width: 41px;
  height: 41px;
  border-radius: 20.5px;
  margin-right: 17px;
`;

const Map = styled.Image`
  width: 100%;
  height: 100%;
`;

const Delete = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  justify-content: center;
  align-items: center;
`;

const WalkDetailDay = ({
  navigation,
  route: {
    params: { deviceID, date, avatarUrl, name },
  },
}: WalkDetailDayScreenProps) => {
  const { width } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();
  const { open, close, modalProps } = useModal();

  const { data } = deviceApi.useGetDailyWalkRecordQuery(
    { deviceID, date },
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
      <CustomHeader navigation={navigation} />
      <HeaderContainer style={{ marginTop: top }}>
        <Avatar source={avatarUrl ? { uri: avatarUrl } : DEFAULT_AVATAR} />
        <View>
          <MyText fontSize={14} fontWeight="medium">
            {name || DEFAULT_NAME}
          </MyText>
          <MyText fontSize={12} color="rgba(0, 0, 0, 0.5)">{`${
            new Date(date).getMonth() + 1
          }월 ${new Date(date).getDate()}일`}</MyText>
        </View>
      </HeaderContainer>
      <FlatList
        contentContainerStyle={{ paddingBottom: bottom }}
        data={data}
        renderItem={({ item }) => (
          <Container key={item.id} style={{ width, height: width }}>
            <Map source={{ uri: item.path_image }} />
            <TopContainer>
              <RowContainer>
                <FloatingItem style={{ marginLeft: 17 }}>
                  <MyText
                    color={palette.blue_7b}
                    fontWeight="medium"
                    fontSize={14}>
                    {item.handler_name || DEFAULT_NAME}
                  </MyText>
                </FloatingItem>
                <FloatingItem style={{ marginLeft: 14 }}>
                  <MyText
                    color="rgba(0, 0, 0, 0.5)"
                    fontWeight="medium"
                    fontSize={14}>
                    {formatPeriod(item.start_date_time, item.time)}
                  </MyText>
                </FloatingItem>
              </RowContainer>
              <Delete onPress={() => openModal(item.id)}>
                <X />
              </Delete>
            </TopContainer>
            <BottomContainer>
              <RowContainer>
                <Timer style={{ marginRight: 17 }} />
                <MyText
                  fontWeight="medium"
                  color={palette.blue_7b}
                  fontSize={24}>
                  {formatWalkTime(item.time)}
                </MyText>
              </RowContainer>
              <RowContainer>
                <Path style={{ marginRight: 17 }} />
                <MyText
                  fontWeight="medium"
                  color={palette.blue_7b}
                  fontSize={24}>
                  {formatWalkDistance(item.distance)}
                </MyText>
              </RowContainer>
            </BottomContainer>
          </Container>
        )}
      />
      <IosBottomModal
        modalProps={modalProps}
        close={close}
        title="이 산책 기록을 삭제하시겠습니까?">
        <IosBottomModalButton
          title="삭제"
          color="red"
          isLast
          onPress={deleteRecord}
        />
      </IosBottomModal>
    </>
  );
};

export default WalkDetailDay;
