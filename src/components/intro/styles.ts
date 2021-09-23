import styled from "styled-components/native";
import { RpWidth } from "~/context/DimensionsContext";

interface IntroContainerProps {
  topInset: number;
  spaceBetween?: boolean;
  rpWidth: RpWidth;
}

export const IntroContainer = styled.View<IntroContainerProps>`
  flex: 1;
  padding-top: ${({ topInset, rpWidth }) => `${rpWidth(71) + topInset}px`};
  justify-content: ${({ spaceBetween }) =>
    spaceBetween ? "space-between" : "flex-start"};
`;
