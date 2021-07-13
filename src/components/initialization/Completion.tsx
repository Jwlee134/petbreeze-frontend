import React from "react";
import Button from "../common/Button";
import {
  BigText,
  BottomContainer,
  Container,
  TopContainer,
} from "../initialization/Styles";

import Thumb from "~/assets/svg/initialization/thumb-star.svg";

const Completion = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <Container>
      <TopContainer>
        <Thumb />
        <BigText>모든 단계가{"\n"}완료되었습니다!</BigText>
      </TopContainer>
      <BottomContainer flexEnd>
        <Button text="시작하기" onPress={handleClose} />
      </BottomContainer>
    </Container>
  );
};

export default Completion;
