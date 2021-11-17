/* eslint-disable import/prefer-default-export */
import styled from "styled-components/native";
import { RpHeight } from "~/context/DimensionsContext";

interface IntroContainerProps {
  topInset: number;
  spaceBetween?: boolean;
  rpHeight: RpHeight;
}

export const IntroContainer = styled.View<IntroContainerProps>`
  flex: 1;
  padding-top: ${({ topInset, rpHeight }) => `${rpHeight(71) + topInset}px`};
  justify-content: ${({ spaceBetween }) =>
    spaceBetween ? "space-between" : "flex-start"};
`;
