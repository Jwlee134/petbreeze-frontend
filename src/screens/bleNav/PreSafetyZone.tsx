import React from "react";
import Button from "~/components/common/Button";
import styled from "styled-components/native";

import Shield from "~/assets/svg/safetyZone/footprint-shield.svg";
import CheckCircle from "~/assets/svg/safetyZone/check-circle.svg";
import { rpHeight, rpWidth } from "~/styles";
import MyText from "~/components/common/MyText";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";
import ShadowContainer from "~/components/common/container/ShadowContainer";
import SafeAreaContainer from "~/components/common/container/SafeAreaContainer";
import { PreSafetyZoneScreenNavigationProp } from "~/types/navigator";

const DescriptionContainer = styled.View`
  width: 100%;
`;

const TopContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BottomContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const Description = styled.View`
  background-color: white;
  height: ${rpWidth(64)}px;
  border-radius: 12px;
  padding: 0px ${rpWidth(20)}px;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${rpWidth(9)}px;
`;

const PreSafetyZone = ({
  navigation,
}: {
  navigation: PreSafetyZoneScreenNavigationProp;
}) => {
  return (
    <SafeAreaContainer>
      <SidePaddingContainer style={{ flex: 1 }}>
        <TopContainer>
          <Shield width={rpWidth(106)} height={rpWidth(112)} />
          <MyText
            fontSize={24}
            color="rgba(0, 0, 0, 0.8)"
            style={{ textAlign: "center", marginTop: rpHeight(32) }}>
            안심존을{"\n"}설정해주세요.
          </MyText>
        </TopContainer>
        <BottomContainer>
          <DescriptionContainer>
            <ShadowContainer shadowOpacity={0.05} shadowRadius={10}>
              <Description>
                <CheckCircle
                  width={rpWidth(24)}
                  height={rpWidth(24)}
                  style={{ marginRight: rpWidth(20) }}
                />
                <MyText fontSize={14} fontWeight="light">
                  안심존 이탈 시 푸시알림을 보내드립니다.
                </MyText>
              </Description>
            </ShadowContainer>
            <ShadowContainer shadowOpacity={0.05} shadowRadius={10}>
              <Description>
                <CheckCircle
                  width={rpWidth(24)}
                  height={rpWidth(24)}
                  style={{ marginRight: rpWidth(20) }}
                />
                <MyText fontSize={14} fontWeight="light">
                  실내 및 지하에서는 실제 위치와 오차가 나타날 수 있습니다.
                </MyText>
              </Description>
            </ShadowContainer>
            <ShadowContainer shadowOpacity={0.05} shadowRadius={10}>
              <Description>
                <CheckCircle
                  width={rpWidth(24)}
                  height={rpWidth(24)}
                  style={{ marginRight: rpWidth(20) }}
                />
                <MyText fontSize={14} fontWeight="light">
                  마이페이지에서 3개까지 설정할 수 있습니다.
                </MyText>
              </Description>
            </ShadowContainer>
          </DescriptionContainer>
          <Button
            useCommonMarginBottom
            onPress={() => {
              navigation.navigate("SafetyZone");
            }}>
            다음
          </Button>
        </BottomContainer>
      </SidePaddingContainer>
    </SafeAreaContainer>
  );
};

export default PreSafetyZone;
