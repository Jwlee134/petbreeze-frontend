import React from "react";
import styled from "styled-components/native";
import { Status } from "~/hooks/useBleManager";
import Button from "../common/Button";
import MyText from "../common/MyText";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Fail = ({
  status,
  handleRetry,
}: {
  status: Status;
  handleRetry: () => void;
}) => {
  return (
    <Container>
      <MyText>{status.text}</MyText>
      <Button onPress={handleRetry}>다시 시도</Button>
    </Container>
  );
};

export default Fail;
