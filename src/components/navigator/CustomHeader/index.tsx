import { StackHeaderProps } from "@react-navigation/stack";
import React, { ReactNode } from "react";
import styled from "styled-components/native";
import MyText from "../../common/MyText";

import { Animated, StyleProp, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackButton from "./BackButton";
import PageIndicator from "./PageIndicator";
import PageCount from "./PageCount";
import { customHeaderHeight } from "~/styles/constants";

interface Props extends Partial<StackHeaderProps> {
  children?: ReactNode;
  disableBackButton?: boolean;
  onBackButtonPress?: () => void;
  currentPage?: number;
  totalPage?: number;
  RightButton?: () => JSX.Element;
  style?: StyleProp<ViewStyle>;
  navigation?: any;
}

const Container = styled(Animated.View)`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: white;
`;

const RightButtonContainer = styled.View`
  position: absolute;
  right: 13.5px;
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
}: Props) => {
  const { top } = useSafeAreaInsets();
  const showPage = currentPage !== 0 && totalPage !== 0;

  return (
    <>
      <Container
        style={{
          marginTop: navigation ? top : 0,
          height: customHeaderHeight,
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
            <RightButtonContainer>
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
