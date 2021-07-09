import React from "react";
import Button from "../common/Button";
import { BigText, BottomContainer, Container, TopContainer } from "./Styles";

import Thumb from "~/assets/svg/initialization/thumb-star.svg";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";

const Completion = () => {
  const dispatch = useDispatch();

  return (
    <Container>
      <TopContainer>
        <Thumb />
        <BigText>모든 단계가{"\n"}완료되었습니다!</BigText>
      </TopContainer>
      <BottomContainer flexEnd>
        <Button
          text="시작하기"
          onPress={() => {
            dispatch(storageActions.setInitialization("initialization"));
          }}
        />
      </BottomContainer>
    </Container>
  );
};

export default Completion;
