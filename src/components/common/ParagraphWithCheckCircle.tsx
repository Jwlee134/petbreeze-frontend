import React, { ReactNode } from "react";
import styled from "styled-components/native";
import { rpWidth } from "~/styles";
import CheckCircleWhiteBackground from "~/assets/svg/check/check-circle-black50.svg";
import CheckCircleBlueBackground from "~/assets/svg/check/check-circle-white80.svg";
import MyText from "./MyText";

const Paragraph = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${rpWidth(32)}px;
  margin-left: ${rpWidth(40)}px;
`;

const ParagraphWithCheckCircle = ({
  children,
  isWhiteBackground,
}: {
  children: ReactNode;
  isWhiteBackground: boolean;
}) => (
  <Paragraph>
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

export default ParagraphWithCheckCircle;
