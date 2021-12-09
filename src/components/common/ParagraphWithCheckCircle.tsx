import React, { ReactNode, useContext } from "react";
import { StyleProp, ViewStyle } from "react-native";
import styled from "styled-components/native";
import CheckCircleWhiteBackground from "~/assets/svg/check/check-circle-black50.svg";
import CheckCircleBlueBackground from "~/assets/svg/check/check-circle-white80.svg";
import { DimensionsContext } from "~/context/DimensionsContext";
import MyText from "./MyText";

const Paragraph = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 0 40px;
`;

interface Props {
  children: ReactNode;
  isWhiteBackground: boolean;
  style?: StyleProp<ViewStyle>;
}

const ParagraphWithCheckCircle = ({
  children,
  isWhiteBackground,
  style,
}: Props) => {
  const { rpHeight } = useContext(DimensionsContext);

  return (
    <Paragraph style={{ marginBottom: rpHeight(32), ...(style as object) }}>
      {isWhiteBackground ? (
        <CheckCircleWhiteBackground
          width={24}
          height={24}
          style={{ marginRight: 15 }}
        />
      ) : (
        <CheckCircleBlueBackground
          width={24}
          height={24}
          style={{ marginRight: 15 }}
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
