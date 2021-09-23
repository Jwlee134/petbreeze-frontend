import React, { useContext, useRef } from "react";
import BottomSheet, {
  BottomSheetProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import styled, { css } from "styled-components/native";
import { useCallback } from "react";
import ShadowContainer from "~/components/common/container/ShadowContainer";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";

const HandleContainer = styled.View<{ rpWidth: RpWidth }>`
  height: ${({ rpWidth }) => rpWidth(36)}px;
  align-items: center;
`;

const Handle = styled.View<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    width: ${rpWidth(29)}px;
    height: ${rpWidth(3)}px;
    margin-top: ${rpWidth(8)}px;
  `}
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 100px;
`;

const BackgroundContainer = styled.View`
  border-radius: 25px;
  background-color: white;
`;

interface IProps extends BottomSheetProps {}

const useBottomSheet = () => {
  const sheetRef = useRef<BottomSheet>(null);
  const { rpWidth } = useContext(DimensionsContext);

  const BottomSheetComponent = useCallback(
    ({ children, ...props }: IProps) => (
      <BottomSheet
        ref={sheetRef}
        backgroundComponent={({ style }) => (
          <ShadowContainer shadowOpacity={0.15} shadowRadius={10} style={style}>
            <BackgroundContainer style={style} />
          </ShadowContainer>
        )}
        handleComponent={() => (
          <HandleContainer rpWidth={rpWidth}>
            <Handle rpWidth={rpWidth} />
          </HandleContainer>
        )}
        {...props}>
        <BottomSheetView>{children}</BottomSheetView>
      </BottomSheet>
    ),
    [],
  );

  return { BottomSheetComponent, sheetRef };
};

export default useBottomSheet;
