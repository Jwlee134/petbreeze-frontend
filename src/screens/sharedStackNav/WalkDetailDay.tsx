import React, { Fragment, useContext, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import styled, { css } from "styled-components/native";
import MyText from "~/components/common/MyText";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import palette from "~/styles/palette";
import { WalkDetailDayScreenProps } from "~/types/navigator";
import Trashcan from "~/assets/svg/trashcan/trashcan-red.svg";
import Timer from "~/assets/svg/walk/timer.svg";
import Path from "~/assets/svg/walk/path.svg";
import Divider from "~/components/common/Divider";
import deviceApi from "~/api/device";
import { formatWalkDistance, formatWalkTime } from "~/utils";
import { noAvatar } from "~/constants";
import Modal from "react-native-modal";
import useModal from "~/hooks/useModal";
import IosStyleBottomModal from "~/components/modal/IosStyleBottomModal";
import { useDispatch } from "react-redux";
import { navigatorActions } from "~/store/navigator";

const Container = styled.View<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    padding-top: ${rpWidth(35)}px;
    padding-bottom: ${rpWidth(65)}px;
  `}
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SvgContainer = styled(RowContainer)<{ rpWidth: RpWidth }>`
  justify-content: space-evenly;
  ${({ rpWidth }) => css`
    margin-top: ${rpWidth(40)}px;
    margin-bottom: ${rpWidth(25)}px;
  `}
`;

const Avatar = styled.Image<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    width: ${rpWidth(70)}px;
    height: ${rpWidth(70)}px;
    border-radius: ${rpWidth(35)}px;
    margin-right: ${rpWidth(25)}px;
  `}
`;

const MapContainer = styled.View<{ rpWidth: RpWidth }>`
  padding: ${({ rpWidth }) => `0 ${rpWidth(28)}px`};
`;

const Map = styled.Image`
  width: 100%;
  height: 100%;
`;

const Delete = styled.TouchableOpacity<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    width: ${rpWidth(30)}px;
    height: ${rpWidth(30)}px;
  `}
  justify-content: center;
  align-items: center;
`;

const ModalDeleteButton = styled.TouchableOpacity<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    height: ${rpWidth(55)}px;
  `}
  justify-content: center;
  align-items: center;
`;

const WalkDetailDay = ({
  navigation,
  route: {
    params: { deviceID, date, avatar },
  },
}: WalkDetailDayScreenProps) => {
  const { rpWidth, width } = useContext(DimensionsContext);
  const { data } = deviceApi.useGetDailyWalkRecordQuery({
    deviceID,
    date,
  });
  const dispatch = useDispatch();
  const [deleteWalk] = deviceApi.useDeleteWalkRecordMutation();
  const { open, close, modalProps } = useModal();
  const [walkID, setWalkID] = useState(0);

  const formatPeriod = (from: string, duration: number) => {
    const formatFrom = new Date(from);
    const formatTo = new Date(new Date(from).getTime() + duration * 60000);

    return `${formatFrom.getHours()}:${
      formatFrom.getMinutes() < 10
        ? `0${formatFrom.getMinutes()}`
        : formatFrom.getMinutes()
    } ~ ${formatTo.getHours()}:${
      formatTo.getMinutes() < 10
        ? `0${formatTo.getMinutes()}`
        : formatTo.getMinutes()
    }`;
  };

  const deleteRecord = async () => {
    try {
      close();
      await deleteWalk({ deviceID, walkID, date }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(navigatorActions.setInitialWalkRecordParams(null));
    };
  }, []);

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <Fragment key={item.id}>
            <Container rpWidth={rpWidth}>
              <RowContainer
                style={{
                  paddingHorizontal: rpWidth(32),
                  justifyContent: "space-between",
                }}>
                <RowContainer>
                  <Avatar
                    rpWidth={rpWidth}
                    source={avatar ? { uri: avatar } : noAvatar}
                  />
                  <View>
                    <MyText
                      color={palette.blue_7b}
                      style={{ marginBottom: rpWidth(5) }}>
                      {item.handler_nickname}
                    </MyText>
                    <MyText color="rgba(0, 0, 0, 0.5)">
                      {formatPeriod(item.start_date_time, item.time)}
                    </MyText>
                  </View>
                </RowContainer>
                <Delete
                  rpWidth={rpWidth}
                  onPress={() => {
                    setWalkID(item.id);
                    open();
                  }}>
                  <Trashcan width={rpWidth(22)} height={rpWidth(23)} />
                </Delete>
              </RowContainer>
              <SvgContainer rpWidth={rpWidth}>
                <RowContainer>
                  <Timer
                    width={rpWidth(22)}
                    height={rpWidth(27)}
                    style={{ marginRight: rpWidth(17) }}
                  />
                  <MyText color={palette.blue_7b} fontSize={24}>
                    {formatWalkTime(item.time)}
                  </MyText>
                </RowContainer>
                <RowContainer>
                  <Path
                    width={rpWidth(21)}
                    height={rpWidth(22)}
                    style={{ marginRight: rpWidth(17) }}
                  />
                  <MyText color={palette.blue_7b} fontSize={24}>
                    {formatWalkDistance(item.distance)}
                  </MyText>
                </RowContainer>
              </SvgContainer>
              <MapContainer rpWidth={rpWidth} style={{ height: width * 0.66 }}>
                <Map fadeDuration={0} source={{ uri: item.path_image }} />
              </MapContainer>
            </Container>
            {data && data.length > 1 && index !== data.length - 1 ? (
              <Divider
                style={{ width: width - rpWidth(34), alignSelf: "center" }}
              />
            ) : null}
          </Fragment>
        )}
      />
      <Modal {...modalProps({ type: "bottom" })}>
        <IosStyleBottomModal
          close={close}
          title="이 산책 기록을 삭제하시겠습니까?">
          <ModalDeleteButton onPress={deleteRecord} rpWidth={rpWidth}>
            <MyText color={palette.red_f0}>삭제</MyText>
          </ModalDeleteButton>
        </IosStyleBottomModal>
      </Modal>
    </>
  );
};

export default WalkDetailDay;
