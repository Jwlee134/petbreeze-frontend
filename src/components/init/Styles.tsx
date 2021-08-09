import styled from "styled-components/native";
import { width } from "~/styles";

export const Container = styled.View`
  flex: 1;
  width: ${width}px;
  padding: 24px;
`;

export const TopContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const BottomContainer = styled.View<{ flexEnd?: boolean }>`
  flex: 1;
  justify-content: ${({ flexEnd }) => (flexEnd ? "flex-end" : "space-between")};
  align-items: center;
`;

export const BigText = styled.Text`
  font-size: 28px;
  text-align: center;
  margin-top: 24px;
`;
