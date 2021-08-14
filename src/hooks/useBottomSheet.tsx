import React, { useRef } from "react";
import BottomSheet, {
  BottomSheetProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import styled from "styled-components/native";
import { useCallback } from "react";
import ShadowContainer from "~/components/common/container/ShadowContainer";
import { rpHeight } from "~/styles";

const HandleContainer = styled.View`
  height: ${rpHeight(36)}px;
  align-items: center;
`;

const Handle = styled.View`
  width: ${rpHeight(29)}px;
  height: ${rpHeight(3)}px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 100px;
  margin-top: ${rpHeight(8)}px;
`;

const BackgroundContainer = styled.View`
  border-radius: 25px;
  background-color: white;
`;

interface IProps extends BottomSheetProps {}

const useBottomSheet = () => {
  const sheetRef = useRef<BottomSheet>(null);

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
          <HandleContainer>
            <Handle />
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
