import { StackHeaderProps } from "@react-navigation/stack";
import React, { ReactNode } from "react";
import styled from "styled-components/native";
import { rpWidth } from "~/styles";
import MyText from "../../common/MyText";

import { Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackButton from "./BackButton";
import PageIndicator from "./PageIndicator";
import PageCount from "./PageCount";

interface IProps extends Partial<StackHeaderProps> {
  children?: ReactNode;
  disableBackButton?: boolean;
  onBackButtonPress?: () => void;
  currentPage?: number;
  totalPage?: number;
  RightButton?: () => JSX.Element;
}

const Container = styled(Animated.View)`
  height: ${rpWidth(44)}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const RightButtonContainer = styled.View`
  position: absolute;
  right: ${rpWidth(13.5)}px;
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
}: IProps) => {
  const { top } = useSafeAreaInsets();
  const showPage = currentPage !== 0 && totalPage !== 0;

  return (
    <>
      <Container
        style={{
          marginTop: navigation ? top : 0,
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
