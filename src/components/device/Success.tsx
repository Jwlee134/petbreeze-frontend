import React from "react";
import { useEffect } from "react";
import styled from "styled-components/native";
import { Status } from "~/hooks/useBleManager";
import MyText from "../common/MyText";

const Success = ({
  status,
  handleNext,
  handlePreRender,
}: {
  status: Status;
  handleNext: () => void;
  handlePreRender: () => void;
}) => {
  useEffect(() => {
    if (status.value === "allSuccess") {
      handlePreRender();
    }
  }, [status]);

  return (
    <MyText>
      {status.value === "scanningSuccess" && "연결에 성공했어요."}
      {status.value === "otaUpdateSuccess" &&
        "펌웨어 업데이트가\n완료되었습니다."}
      {status.value === "allSuccess" && "디바이스 등록이\n완료되었습니다."}
    </MyText>
  );
};

export default Success;
