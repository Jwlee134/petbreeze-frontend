import React, { ReactNode, useContext } from "react";
import styled, { css } from "styled-components/native";
import MyText from "../../common/MyText";
import Shield from "~/assets/svg/myPage/shield.svg";
import WiFiIcon from "~/assets/svg/wifi/wifi-black.svg";
import Plus from "~/assets/svg/plus-circle-blue.svg";
import Dissolve from "../../common/Dissolve";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";

interface IProps {
  type: "safetyZone" | "wifi";
  children: ReactNode;
  isEdit: boolean;
  onPlusButtonClick: () => void;
  disablePlusButton: boolean;
}

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SvgContainer = styled.View<{ rpWidth: RpWidth }>`
  width: ${({ rpWidth }) => rpWidth(48)}px;
  align-items: center;
`;

const Container = styled(RowContainer)<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    height: ${rpWidth(79)}px;
    padding: 0px ${rpWidth(16)}px;
  `}
`;

const PlusContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

const DeviceSettingSection = ({
  type,
  isEdit,
  children,
  onPlusButtonClick,
  disablePlusButton,
}: IProps) => {
  const { rpWidth } = useContext(DimensionsContext);

  return (
    <>
      <Container rpWidth={rpWidth}>
        <RowContainer>
          <SvgContainer rpWidth={rpWidth}>
            {type === "safetyZone" ? (
              <Shield width={rpWidth(19)} height={rpWidth(20)} />
            ) : (
              <WiFiIcon width={rpWidth(22)} height={rpWidth(17)} />
            )}
          </SvgContainer>
          <MyText>{type === "safetyZone" ? "안심존" : "WiFi"}</MyText>
        </RowContainer>
      </Container>
      {children}
      {!disablePlusButton ? (
        <Dissolve isVisible={isEdit}>
          <PlusContainer
            onPress={onPlusButtonClick}
            style={{
              height: type === "safetyZone" ? rpWidth(97) : rpWidth(49),
            }}>
            <Plus width={rpWidth(28)} height={rpWidth(28)} />
          </PlusContainer>
        </Dissolve>
      ) : null}
    </>
  );
};

export default DeviceSettingSection;
