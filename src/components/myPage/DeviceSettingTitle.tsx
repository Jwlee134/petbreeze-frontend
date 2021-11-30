import React from "react";
import styled from "styled-components/native";
import Shield from "~/assets/svg/myPage/shield.svg";
import Plus from "~/assets/svg/plus/plus-blue.svg";
import People from "~/assets/svg/myPage/people.svg";
import MyText from "../common/MyText";

interface Props {
  type: "safetyZone" | "family";
  disablePlusButton?: boolean;
  onPlusButtonClick?: () => void;
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
  height: 79px;
  padding: 0 16px;
  justify-content: space-between;
  background-color: white;
`;

const PlusContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const RightSvgContainer = styled(SvgContainer)`
  height: 100%;
`;

const DeviceSettingTitle = ({
  type,
  disablePlusButton,
  onPlusButtonClick,
}: Props) => {
  return (
    <Container>
      <RowContainer>
        <SvgContainer>
          {type === "safetyZone" ? (
            <Shield width={19} height={20} />
          ) : (
            <People width={20} height={19} />
          )}
        </SvgContainer>
        <MyText>{type === "safetyZone" ? "안심존" : "가족관리"}</MyText>
      </RowContainer>
      <RightSvgContainer>
        {type === "safetyZone" && !disablePlusButton ? (
          <PlusContainer onPress={onPlusButtonClick}>
            <Plus width={14} height={14} />
          </PlusContainer>
        ) : null}
      </RightSvgContainer>
    </Container>
  );
};

export default DeviceSettingTitle;
