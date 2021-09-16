import React, { ReactNode } from "react";
import { TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";
import { rpWidth } from "~/styles";

import RightArrow from "~/assets/svg/arrow/arrow-right-blue.svg";
import RightArrowGray from "~/assets/svg/arrow/arrow-right-gray.svg";
import CheckCircle from "./CheckCircle";
import Dissolve from "./Dissolve";

interface IProps extends TouchableOpacityProps {
  selected?: boolean;
  isIconArrow?: boolean;
  isGrayArrow?: boolean;
  children: ReactNode;
  showIcon?: boolean;
}

const Container = styled.TouchableOpacity`
  height: ${rpWidth(99)}px;
  background-color: white;
  padding: 0px ${rpWidth(32)}px;
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
}: IProps) => {
  return (
    <Container activeOpacity={1} {...props}>
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
