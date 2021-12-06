import React from "react";
import styled from "styled-components/native";
import Shield from "~/assets/svg/myPage/shield.svg";
import Plus from "~/assets/svg/plus/plus-blue.svg";
import People from "~/assets/svg/myPage/people.svg";
import WiFi from "~/assets/svg/wifi/wifi-black.svg";
import MyText from "../common/MyText";
import LoadingIndicator from "../lottie/LoadingIndicator";
import { textLoadingIndicatorSize } from "~/styles/constants";

interface Props {
  type: "area" | "wifi" | "family";
  onPlusButtonClick?: () => void;
  disablePlusButton?: boolean;
  isLoading?: boolean;
}

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SvgContainer = styled.View`
  width: 48px;
  align-items: center;
`;

const Container = styled(RowContainer)`
  height: 54px;
  padding-left: 16px;
  justify-content: space-between;
  background-color: white;
`;

const PlusContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 78px;
  height: 100%;
`;

const SectionHeader = ({
  type,
  onPlusButtonClick,
  isLoading,
  disablePlusButton,
}: Props) => {
  return (
    <Container>
      <RowContainer>
        <SvgContainer>
          {type === "area" ? (
            <Shield />
          ) : type === "wifi" ? (
            <WiFi />
          ) : (
            <People />
          )}
        </SvgContainer>
        <MyText>
          {type === "area"
            ? "안심존"
            : type === "wifi"
            ? "와이파이"
            : "가족관리"}
        </MyText>
      </RowContainer>
      {!disablePlusButton && (
        <PlusContainer onPress={onPlusButtonClick}>
          {isLoading ? (
            <LoadingIndicator size={textLoadingIndicatorSize} />
          ) : (
            <Plus />
          )}
        </PlusContainer>
      )}
    </Container>
  );
};

export default SectionHeader;
