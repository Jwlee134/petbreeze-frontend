import React, { ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { rpWidth } from "~/styles";
import MyText from "./MyText";

const Container = styled.View`
  height: ${rpWidth(44)}px;
  justify-content: center;
  align-items: center;
`;

const CustomHeader = ({ children }: { children: ReactNode }) => {
  const { top } = useSafeAreaInsets();

  return (
    <Container
      style={{
        marginTop: top,
      }}>
      <MyText fontWeight="medium" fontSize={18}>
        {children}
      </MyText>
    </Container>
  );
};

export default CustomHeader;
