import React from "react";
import styled from "styled-components/native";

import InfoCircle from "~/assets/svg/info-circle.svg";
import QuestionCircle from "~/assets/svg/question-circle.svg";

interface IProps {
  open: () => void;
  isQuestion?: boolean;
}

const Container = styled.View`
  margin-right: 15px;
`;

const Button = styled.TouchableOpacity``;

const HeaderRightButton = ({ open, isQuestion = false }: IProps) => (
  <Container>
    <Button onPress={open} activeOpacity={1}>
      {isQuestion ? <QuestionCircle /> : <InfoCircle />}
    </Button>
  </Container>
);

export default HeaderRightButton;
