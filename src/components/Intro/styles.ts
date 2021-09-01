import styled from "styled-components/native";
import { rpWidth } from "~/styles";

interface IntroContainerProps {
  topInset: number;
  spaceBetween?: boolean;
}

export const IntroContainer = styled.View<IntroContainerProps>`
  flex: 1;
  padding-top: ${({ topInset }) => `${rpWidth(71) + topInset}px`};
  justify-content: ${({ spaceBetween }) =>
    spaceBetween ? "space-between" : "flex-start"};
`;
