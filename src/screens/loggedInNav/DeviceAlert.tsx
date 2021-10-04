import React, { useContext } from "react";
import styled, { css } from "styled-components/native";
import Button from "~/components/common/Button";
import SafeAreaContainer from "~/components/common/container/SafeAreaContainer";
import MyText from "~/components/common/MyText";
import AnimatedCircularProgress from "~/components/common/AnimatedCircularProgress";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import palette from "~/styles/palette";
import setInitialRoute from "~/utils/setInitialRoute";

import One from "~/assets/svg/number/1.svg";
import Two from "~/assets/svg/number/2.svg";
import Three from "~/assets/svg/number/3.svg";
import DogLostConnection from "~/assets/svg/dog/dog-lost-connection.svg";
import DogWhereAmI from "~/assets/svg/dog/dog-where-am-i.svg";
import NeedChargeElectricity from "~/assets/svg/need-charge-electricity.svg";

const lostConnectionManual = [
  {
    title: "배터리 및 네트워크 신호 확인",
    description: "산간지역에서는 위치 추적이 어렵습니다.",
  },
  {
    title: "디바이스 재부팅",
    description: (
      <>디바이스 하단의 전원 버튼을 n초간 눌러{"\n"}재부팅해주세요.</>
    ),
  },
  {
    title: "고객센터 연결",
  },
];

const whereAmIManual = [
  {
    title: "위치 수신 불가 지역 확인",
    description: (
      <>지하(철), 계단, 건물 중앙 등 실내에서는{"\n"}위치 수신이 어렵습니다.</>
    ),
  },
  {
    title: "네트워크 연결 확인",
    description: (
      <>
        집에서 WiFi 신호가 약하거나 끊긴 경우{"\n"}위치 수신이 불가할 수
        있습니다.
      </>
    ),
  },
];

const TopContainer = styled.View``;

const RowContainer = styled.View<{ rpWidth: RpWidth; isTop?: boolean }>`
  flex-direction: row;
  ${({ isTop, rpWidth }) =>
    isTop &&
    css`
      align-items: center;
      margin-bottom: ${rpWidth(15)}px;
    `}
`;

const TextContainer = styled.View<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    margin-bottom: ${rpWidth(40)}px;
    padding-right: ${rpWidth(46)}px;
  `}
`;

const RowLeftContainer = styled.View<{ rpWidth: RpWidth }>`
  width: ${({ rpWidth }) => rpWidth(68)}px;
  margin-left: ${({ rpWidth }) => rpWidth(24)}px;
  align-items: center;
`;

const AvatarContainer = styled.View`
  align-items: center;
`;

const BottomContainer = styled.View``;

const SvgContainer = styled.View<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    margin-left: auto;
    margin-right: ${rpWidth(50)}px;
    margin-bottom: ${rpWidth(50)}px;
  `}
`;

const DeviceAlert = ({ navigation, route }) => {
  const { rpWidth } = useContext(DimensionsContext);

  const handlePress = () => {
    setInitialRoute();
    navigation.replace("LoggedInNav");
  };

  const title: "battery" | "lostConnection" | "whereAmI" = "lostConnection";

  return (
    <SafeAreaContainer style={{ justifyContent: "space-between" }}>
      <TopContainer>
        <MyText
          style={{
            marginTop: rpWidth(53),
            ...(title === "battery"
              ? { position: "absolute", alignSelf: "center" }
              : { marginBottom: rpWidth(43), textAlign: "center" }),
          }}
          fontWeight="medium"
          fontSize={20}
          color={palette.blue_7b}>
          {title === "lostConnection"
            ? "앗 ! 연결이 끊어졌어요."
            : title === "battery"
            ? "앗 ! 충전이 필요해요."
            : "앗 ! 여긴 어디?"}
        </MyText>
        {title !== "battery"
          ? (title === "lostConnection"
              ? lostConnectionManual
              : whereAmIManual
            ).map((manual, i) => (
              <TextContainer key={i} rpWidth={rpWidth}>
                <RowContainer isTop rpWidth={rpWidth}>
                  <RowLeftContainer rpWidth={rpWidth}>
                    {i === 0 ? (
                      <One width={rpWidth(24)} height={rpWidth(24)} />
                    ) : i === 1 ? (
                      <Two width={rpWidth(24)} height={rpWidth(24)} />
                    ) : (
                      <Three width={rpWidth(24)} height={rpWidth(24)} />
                    )}
                  </RowLeftContainer>
                  <MyText>{manual.title}</MyText>
                </RowContainer>
                {manual.description ? (
                  <RowContainer rpWidth={rpWidth}>
                    <RowLeftContainer rpWidth={rpWidth}>
                      <MyText
                        color={palette.blue_7b}
                        fontSize={14}
                        style={{ marginHorizontal: rpWidth(12) }}>
                        •
                      </MyText>
                    </RowLeftContainer>
                    <MyText fontSize={14} color="rgba(0, 0, 0, 0.7)">
                      {manual.description}
                    </MyText>
                  </RowContainer>
                ) : null}
              </TextContainer>
            ))
          : null}
      </TopContainer>
      {title === "battery" ? (
        <AvatarContainer>
          <NeedChargeElectricity
            width={rpWidth(105)}
            height={rpWidth(75)}
            style={{
              marginBottom: rpWidth(10),
              marginLeft: rpWidth(50),
            }}
          />
          <AnimatedCircularProgress
            circleWidth={160}
            lineWidth={10}
            battery={20}
            isBackgroundTransparent
          />
          <MyText fontWeight="medium" fontSize={24} color={palette.red_f0}>
            20 %
          </MyText>
        </AvatarContainer>
      ) : null}
      <BottomContainer>
        {title !== "battery" ? (
          <SvgContainer rpWidth={rpWidth}>
            {title === "lostConnection" ? (
              <DogLostConnection width={rpWidth(141)} height={rpWidth(161)} />
            ) : (
              <DogWhereAmI width={rpWidth(221)} height={rpWidth(173)} />
            )}
          </SvgContainer>
        ) : null}
        <Button useCommonMarginBottom onPress={handlePress}>
          확인
        </Button>
      </BottomContainer>
    </SafeAreaContainer>
  );
};

export default DeviceAlert;
