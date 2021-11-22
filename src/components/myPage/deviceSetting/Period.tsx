import React, { useMemo } from "react";
import styled from "styled-components/native";
import MyText from "../../common/MyText";
import Location from "~/assets/svg/myPage/location.svg";
import ScrollPicker from "../../common/ScrollPicker";
import { useDispatch } from "react-redux";
import { useAppSelector } from "~/store";
import { deviceSettingActions } from "~/store/deviceSetting";
import deviceApi from "~/api/device";

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SvgContainer = styled.View`
  width: 48px;
  align-items: center;
`;

const Container = styled(RowContainer)`
  height: 79px;
  padding: 0 16px;
  justify-content: space-between;
`;

const Period = ({ deviceID }: { deviceID: number }) => {
  const period = useAppSelector(state => state.deviceSetting.period);
  const dispatch = useDispatch();

  const { data } = deviceApi.endpoints.getDeviceList.useQueryState();

  const periodArr = useMemo(() => {
    if (
      data &&
      data[data.findIndex(device => device.id === deviceID)]?.is_missed
    ) {
      return [
        { text: "실시간", value: 1 },
        { text: "5분", value: 300 },
        { text: "10분", value: 600 },
        { text: "30분", value: 1800 },
      ];
    }
    return [
      { text: "5분", value: 300 },
      { text: "10분", value: 600 },
      { text: "30분", value: 1800 },
    ];
  }, [data]);

  return (
    <Container>
      <RowContainer>
        <SvgContainer>
          <Location width={16} height={20} />
        </SvgContainer>
        <MyText>위치정보 수신 주기</MyText>
      </RowContainer>
      {period !== null && (
        <ScrollPicker
          data={periodArr.map(period => period.text)}
          selectedIndex={periodArr.findIndex(item => item.value === period)}
          onValueChange={(value, index) => {
            dispatch(deviceSettingActions.setPeriod(periodArr[index].value));
          }}
          width={88}
          height={36}
          style={{ marginRight: 16 }}
        />
      )}
    </Container>
  );
};

export default Period;
