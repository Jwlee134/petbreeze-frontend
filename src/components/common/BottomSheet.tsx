import React, { ForwardedRef, forwardRef, ReactNode } from "react";
import Sheet, { BottomSheetProps } from "@gorhom/bottom-sheet";
import styled from "styled-components/native";
import { Shadow } from "react-native-shadow-2";
import { bottomSheetHandleHeight } from "~/styles/constants";

const HandleContainer = styled.View<{ handleHeight: number }>`
  height: ${({ handleHeight }) => handleHeight}px;
  align-items: center;
`;

const Handle = styled.View`
  width: 29px;
  height: 3px;
  margin-top: 8px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 100px;
`;

interface Props extends BottomSheetProps {
  children: ReactNode;
  handleHeight?: number;
}

const BottomSheet = forwardRef(
  (
    { children, handleHeight = bottomSheetHandleHeight, ...props }: Props,
    ref: ForwardedRef<Sheet>,
  ) => (
    <Sheet
      ref={ref}
      handleComponent={() => (
        <Shadow
          distance={15}
          startColor="rgba(0, 0, 0, 0.05)"
          sides={["top"]}
          radius={15}
          corners={["topLeft", "topRight"]}
          viewStyle={{ width: "100%" }}>
          <HandleContainer handleHeight={handleHeight}>
            <Handle />
          </HandleContainer>
        </Shadow>
      )}
      {...props}>
      {children}
    </Sheet>
  ),
);

export default BottomSheet;
