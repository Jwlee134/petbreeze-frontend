import React, { ForwardedRef, forwardRef, ReactNode } from "react";
import Sheet, { BottomSheetProps } from "@gorhom/bottom-sheet";
import styled from "styled-components/native";
import { bottomSheetHandleHeight } from "~/styles/constants";
import { Shadow } from "react-native-shadow-2";

const HandleContainer = styled.View`
  height: ${bottomSheetHandleHeight}px;
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
}

const BottomSheet = forwardRef(
  ({ children, ...props }: Props, ref: ForwardedRef<Sheet>) => (
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
          <HandleContainer>
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
