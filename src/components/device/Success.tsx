import React from "react";
import { useEffect } from "react";
import styled from "styled-components/native";
import { Status } from "~/hooks/useBleManager";
import MyText from "../common/MyText";
import Success from "../lottie/Success";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Successs = ({
  status,
  handleNext,
  handlePreRender,
}: {
  status: Status;
  handleNext: () => void;
  handlePreRender: () => void;
}) => {
  useEffect(() => {
    if (status === "allSuccess") {
      setTimeout(() => {
        handlePreRender();
      }, 2000);
      setTimeout(() => {
        handleNext();
      }, 5000);
    }
  }, [status]);

  return (
    <Container>
      <MyText fontSize={24} fontWeight="medium">
        {status === "scanningSuccess" && "연결에 성공했어요."}
        {status === "otaUpdateSuccess" && "펌웨어 업데이트가\n완료되었습니다."}
        {status === "allSuccess" && <Success />}
        {status === "allSuccess" && "디바이스 등록이\n완료되었습니다."}
      </MyText>
    </Container>
  );
};

export default React.memo(Successs);
