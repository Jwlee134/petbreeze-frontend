import { StackHeaderProps } from "@react-navigation/stack";
import React, { ReactNode, useContext } from "react";
import styled from "styled-components/native";
import MyText from "../../common/MyText";

import { Animated, StyleProp, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackButton from "./BackButton";
import PageIndicator from "./PageIndicator";
import PageCount from "./PageCount";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import { customHeaderHeight } from "~/styles/constants";

interface IProps extends Partial<StackHeaderProps> {
  children?: ReactNode;
  disableBackButton?: boolean;
  onBackButtonPress?: () => void;
  currentPage?: number;
  totalPage?: number;
  RightButton?: () => JSX.Element;
  style?: StyleProp<ViewStyle>;
}

const Container = styled(Animated.View)`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: white;
`;

const RightButtonContainer = styled.View<{ rpWidth: RpWidth }>`
  position: absolute;
  right: ${({ rpWidth }) => rpWidth(13.5)}px;
  justify-content: center;
  height: 100%;
`;

const CustomHeader = ({
  children,
  navigation,
  onBackButtonPress,
  disableBackButton = false,
  currentPage = 0,
  totalPage = 0,
  RightButton,
  style,
}: IProps) => {
  const { top } = useSafeAreaInsets();
  const { rpWidth } = useContext(DimensionsContext);
  const showPage = currentPage !== 0 && totalPage !== 0;

  return (
    <>
      <Container
        style={{
          marginTop: navigation ? top : 0,
          height: rpWidth(customHeaderHeight),
          ...(style as object),
        }}>
        <>
          <BackButton
            onBackButtonPress={onBackButtonPress}
            disableBackButton={disableBackButton}
            navigation={navigation}
          />
          {children ? (
            <MyText fontWeight="medium" fontSize={18}>
              {children}
            </MyText>
          ) : null}
          {showPage ? (
            <PageCount currentPage={currentPage} totalPage={totalPage} />
          ) : null}
          {RightButton ? (
            <RightButtonContainer rpWidth={rpWidth}>
              <RightButton />
            </RightButtonContainer>
          ) : null}
        </>
      </Container>
      {showPage ? (
        <PageIndicator currentPage={currentPage} totalPage={totalPage} />
      ) : null}
    </>
  );
};

export default CustomHeader;
