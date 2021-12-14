import React, { ReactNode } from "react";
import { PressableProps, View } from "react-native";
import styled from "styled-components/native";

import RightArrow from "~/assets/svg/arrow/arrow-right-blue.svg";
import RightArrowGray from "~/assets/svg/arrow/arrow-right-gray.svg";
import CheckCircle from "./CheckCircle";

interface Props extends PressableProps {
  selected?: boolean;
  isIconArrow?: boolean;
  isGrayArrow?: boolean;
  children: ReactNode;
  showIcon?: boolean;
}

const Container = styled.Pressable`
  height: 108px;
  padding: 0 32px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: white;
`;

const ListItem = ({
  selected = false,
  isIconArrow = true,
  isGrayArrow = false,
  children,
  showIcon = true,
  ...props
}: Props) => (
  <Container {...props}>
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
