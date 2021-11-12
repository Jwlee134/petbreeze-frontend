import React, { ReactNode, useContext } from "react";
import { TouchableOpacityProps } from "react-native";
import styled, { css } from "styled-components/native";

import RightArrow from "~/assets/svg/arrow/arrow-right-blue.svg";
import RightArrowGray from "~/assets/svg/arrow/arrow-right-gray.svg";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import CheckCircle from "./CheckCircle";
import Dissolve from "./Dissolve";

interface Props extends TouchableOpacityProps {
  selected?: boolean;
  isIconArrow?: boolean;
  isGrayArrow?: boolean;
  children: ReactNode;
  showIcon?: boolean;
}

const Container = styled.TouchableOpacity<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    height: ${rpWidth(99)}px;
    padding: 0px ${rpWidth(32)}px;
  `}
  background-color: white;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ListItem = ({
  selected = false,
  isIconArrow = true,
  isGrayArrow = false,
  children,
  showIcon = true,
  ...props
}: Props) => {
  const { rpWidth } = useContext(DimensionsContext);

  return (
    <Container rpWidth={rpWidth} activeOpacity={1} {...props}>
      {children}
      <Dissolve
        style={{
          width: !isIconArrow ? rpWidth(25) : rpWidth(7),
        }}
        isVisible={showIcon}>
        {!isIconArrow ? (
          <CheckCircle selected={selected} />
        ) : isGrayArrow ? (
          <RightArrowGray width={rpWidth(7)} height={rpWidth(12)} />
        ) : (
          <RightArrow width={rpWidth(7)} height={rpWidth(12)} />
        )}
      </Dissolve>
    </Container>
  );
};

export default React.memo(ListItem);
