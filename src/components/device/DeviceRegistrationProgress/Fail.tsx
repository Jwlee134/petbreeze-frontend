import React from "react";
import styled from "styled-components/native";
import Button from "~/components/common/Button";
import MyText from "~/components/common/MyText";
import { Status } from "~/hooks/useBleManager";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Fail = ({ status, retry }: { status: Status; retry: () => void }) => {
  return (
    <Container>
      <MyText>
        {status === "scanningFail"
          ? "근처에 디바이스가 있나요?"
          : status === "connectingFail"
          ? "연결에 실패했어요."
          : status === "retrieveFail"
          ? "디바이스 정보를\n가져오지 못했어요."
          : status === "devEUIFail"
          ? "DevEUI 에러"
          : status === "startNotificationFail"
          ? "StartNotification 에러"
          : status === "notificationFail"
          ? "Notification No"
          : status === "downloadingFail"
          ? "다운로드에 실패했어요."
          : "설치에 실패했어요."}
      </MyText>
      <Button onPress={retry}>다시 시도</Button>
    </Container>
  );
};

export default React.memo(Fail);
