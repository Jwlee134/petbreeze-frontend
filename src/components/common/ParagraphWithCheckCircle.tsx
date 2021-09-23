import React, { ReactNode, useContext } from "react";
import styled, { css } from "styled-components/native";
import CheckCircleWhiteBackground from "~/assets/svg/check/check-circle-black50.svg";
import CheckCircleBlueBackground from "~/assets/svg/check/check-circle-white80.svg";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import MyText from "./MyText";

const Paragraph = styled.View<{ rpWidth: RpWidth }>`
  flex-direction: row;
  align-items: center;
  ${({ rpWidth }) => css`
    margin-bottom: ${rpWidth(32)}px;
    margin-left: ${rpWidth(40)}px;
  `}
`;

const ParagraphWithCheckCircle = ({
  children,
  isWhiteBackground,
}: {
  children: ReactNode;
  isWhiteBackground: boolean;
}) => {
  const { rpWidth } = useContext(DimensionsContext);

  return (
    <Paragraph rpWidth={rpWidth}>
      {isWhiteBackground ? (
        <CheckCircleWhiteBackground
          width={rpWidth(24)}
          height={rpWidth(24)}
          style={{ marginRight: rpWidth(23) }}
        />
      ) : (
        <CheckCircleBlueBackground
          width={rpWidth(24)}
          height={rpWidth(24)}
          style={{ marginRight: rpWidth(23) }}
        />
      )}
      <MyText
        color={isWhiteBackground ? "rgba(0, 0, 0, 0.7)" : "white"}
        fontSize={14}
        fontWeight="light">
        {children}
      </MyText>
    </Paragraph>
  );
};

export default ParagraphWithCheckCircle;
