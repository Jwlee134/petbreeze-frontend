import React, { ForwardedRef, forwardRef, ReactNode, useContext } from "react";
import Sheet, { BottomSheetProps } from "@gorhom/bottom-sheet";
import styled, { css } from "styled-components/native";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import { bottomSheetHandleHeight } from "~/styles/constants";
import { Shadow } from "react-native-shadow-2";

const HandleContainer = styled.View<{ rpWidth: RpWidth }>`
  height: ${({ rpWidth }) => rpWidth(bottomSheetHandleHeight)}px;
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

interface Props extends BottomSheetProps {
  children: ReactNode;
}

const BottomSheet = forwardRef(
  ({ children, ...props }: Props, ref: ForwardedRef<Sheet>) => {
    const { rpWidth } = useContext(DimensionsContext);

    return (
      <Sheet
        ref={ref}
        handleComponent={() => (
          <Shadow
            distance={20}
            startColor="#00000015"
            sides={["top"]}
            radius={15}
            corners={["topLeft", "topRight"]}
            viewStyle={{ width: "100%" }}>
            <HandleContainer rpWidth={rpWidth}>
              <Handle rpWidth={rpWidth} />
            </HandleContainer>
          </Shadow>
        )}
        {...props}>
        {children}
      </Sheet>
    );
  },
);

export default BottomSheet;
