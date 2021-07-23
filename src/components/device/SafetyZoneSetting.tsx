import React from "react";
import { useDispatch } from "react-redux";
import Button from "../common/Button";
import {
  BigText,
  BottomContainer,
  Container,
  TopContainer,
} from "../initialization/Styles";
import styled from "styled-components/native";

import CheckShield from "~/assets/svg/safetyZone/check-shield.svg";
import CheckCircle from "~/assets/svg/safetyZone/check-circle.svg";
import { commonActions } from "~/store/common";
import useDisableButton from "~/hooks/useDisableButton";

const DescriptionContainer = styled.View`
  width: 100%;
`;

const Description = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

const DescriptionText = styled.Text`
  margin-left: 12px;
  font-size: 16px;
  flex-shrink: 1;
`;

const SafetyZoneSetting = () => {
  const dispatch = useDispatch();
  const { disable, disabled } = useDisableButton();

  return (
    <Container>
      <TopContainer>
        <CheckShield />
        <BigText>안심존을{"\n"}설정해주세요.</BigText>
      </TopContainer>
      <BottomContainer>
        <DescriptionContainer>
          <Description>
            <CheckCircle />
            <DescriptionText>
              안심존 이탈 시 자동으로 푸시알림을 보내드립니다.
            </DescriptionText>
          </Description>
          <Description>
            <CheckCircle />
            <DescriptionText>
              실내 및 지하에서 실제 위치와의 오차가 크게 나타날 수 있다는 점
              주의해주세요.
            </DescriptionText>
          </Description>
          <Description>
            <CheckCircle />
            <DescriptionText>
              후에 마이페이지 화면에서 총 3개까지 설정하실 수 있습니다.
            </DescriptionText>
          </Description>
        </DescriptionContainer>
        <Button
          text="설정"
          onPress={() => {
            if (disabled) return;
            dispatch(commonActions.setPage("next"));
            disable();
          }}
        />
      </BottomContainer>
    </Container>
  );
};

export default SafetyZoneSetting;
