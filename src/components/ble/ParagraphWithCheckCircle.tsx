import React, { ReactNode } from "react";
import styled from "styled-components/native";
import CheckCircleWhiteBackground from "~/assets/svg/check/check-circle-black50.svg";
import CheckCircleBlueBackground from "~/assets/svg/check/check-circle-white80.svg";
import MyText from "../common/MyText";

const Paragraph = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 0 40px 32px 40px;
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
        width={24}
        height={24}
        style={{ marginRight: 23 }}
      />
    ) : (
      <CheckCircleBlueBackground
        width={24}
        height={24}
        style={{ marginRight: 23 }}
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
