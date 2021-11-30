import React, { ReactNode } from "react";
import { TouchableOpacityProps, View } from "react-native";
import styled from "styled-components/native";

import RightArrow from "~/assets/svg/arrow/arrow-right-blue.svg";
import RightArrowGray from "~/assets/svg/arrow/arrow-right-gray.svg";
import CheckCircle from "./CheckCircle";

interface Props extends TouchableOpacityProps {
  selected?: boolean;
  isIconArrow?: boolean;
  isGrayArrow?: boolean;
  children: ReactNode;
  showIcon?: boolean;
}

const Container = styled.TouchableOpacity`
  height: 99px;
  padding: 0 32px;
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
}: Props) => (
  <Container activeOpacity={1} {...props}>
    {children}
    {showIcon && (
      <View
        style={{
          width: !isIconArrow ? 25 : 7,
        }}>
        {!isIconArrow ? (
          <CheckCircle selected={selected} />
        ) : isGrayArrow ? (
          <RightArrowGray width={7} height={12} />
        ) : (
          <RightArrow width={7} height={12} />
        )}
      </View>
    )}
  </Container>
);

export default React.memo(ListItem);
