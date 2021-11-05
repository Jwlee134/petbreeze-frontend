import React, { useContext, useMemo } from "react";
import styled from "styled-components/native";
import MyText from "../../common/MyText";
import Location from "~/assets/svg/myPage/location.svg";
import ScrollPicker from "../../common/ScrollPicker";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import { useDispatch } from "react-redux";
import { useAppSelector } from "~/store";
import { deviceSettingActions } from "~/store/deviceSetting";
import deviceApi from "~/api/device";

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SvgContainer = styled.View<{ rpWidth: RpWidth }>`
  width: ${({ rpWidth }) => rpWidth(48)}px;
  align-items: center;
`;

const Container = styled(RowContainer)<{ rpWidth: RpWidth }>`
  height: ${({ rpWidth }) => rpWidth(79)}px;
  padding: ${({ rpWidth }) => `0px ${rpWidth(16)}px`};
  justify-content: space-between;
`;

const LocationInfoCollectionPeriod = ({ deviceID }: { deviceID: number }) => {
  const period = useAppSelector(
    state => state.deviceSetting.locationInfoCollectionPeriod,
  );
  const { rpWidth } = useContext(DimensionsContext);
  const dispatch = useDispatch();
  const { data } = deviceApi.endpoints.getDeviceList.useQueryState();

  const periodArr = useMemo(() => {
    if (
      data &&
      data[data.findIndex(device => device.id === deviceID)]?.is_missed
    ) {
      return [
        { text: "실시간", value: 0 },
        { text: "5분", value: 5 },
        { text: "10분", value: 10 },
        { text: "30분", value: 30 },
      ];
    }
    return [
      { text: "5분", value: 5 },
      { text: "10분", value: 10 },
      { text: "30분", value: 30 },
    ];
  }, [data]);

  return (
    <Container rpWidth={rpWidth}>
      <RowContainer>
        <SvgContainer rpWidth={rpWidth}>
          <Location width={rpWidth(16)} height={rpWidth(20)} />
        </SvgContainer>
        <MyText>위치정보 수신 주기</MyText>
      </RowContainer>
      {period !== null && (
        <ScrollPicker
          data={periodArr.map(period => period.text)}
          selectedIndex={periodArr.findIndex(item => item.value === period)}
          onChange={index => {
            dispatch(
              deviceSettingActions.setLocationInfoCollectionPeriod(
                periodArr[index].value,
              ),
            );
          }}
          width={rpWidth(88)}
          height={rpWidth(36)}
          style={{ marginRight: rpWidth(16) }}
        />
      )}
    </Container>
  );
};

export default LocationInfoCollectionPeriod;
