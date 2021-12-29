import { StackHeaderProps } from "@react-navigation/stack";
import React from "react";
import styled from "styled-components/native";
import MyText from "../../common/MyText";

import { StyleProp, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackButton from "./BackButton";
import PageIndicator from "./PageIndicator";
import PageCount from "./PageCount";
import { HEADER_HEIGHT } from "~/styles/constants";

interface Props extends Partial<StackHeaderProps> {
  currentPage?: number;
  totalPage?: number;
  height?: number;
  title?: string;
  navigation?: any;
  onBackButtonPress?: () => void;
  RightButtonText?: JSX.Element;
  onRightButtonPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  pageIndicatorStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  leftDivStyle?: StyleProp<ViewStyle>;
  centerDivStyle?: StyleProp<ViewStyle>;
  rightDivStyle?: StyleProp<ViewStyle>;
}

const Container = styled.View`
  justify-content: flex-end;
  background-color: white;
`;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Rightbutton = styled.TouchableOpacity`
  width: 76px;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Div = styled.View`
  width: 33.3%;
`;

const CustomHeader = ({
  currentPage = 0,
  totalPage = 0,
  height = HEADER_HEIGHT,
  title,
  navigation,
  onBackButtonPress,
  RightButtonText,
  onRightButtonPress,
  containerStyle,
  pageIndicatorStyle,
  wrapperStyle,
  leftDivStyle,
  centerDivStyle,
  rightDivStyle,
}: Props) => {
  const { top } = useSafeAreaInsets();
  const showPage = currentPage !== 0 && totalPage !== 0;

  return (
    <>
      <Container
        style={{ height: height + top, ...(containerStyle as object) }}>
        <Wrapper style={{ height, ...(wrapperStyle as object) }}>
          <Div
            style={{ alignItems: "flex-start", ...(leftDivStyle as object) }}>
            {(navigation || onBackButtonPress) && (
              <BackButton
                onBackButtonPress={onBackButtonPress}
                navigation={navigation}
              />
            )}
          </Div>
          <Div style={{ alignItems: "center", ...(centerDivStyle as object) }}>
            {title && (
              <MyText fontWeight="medium" fontSize={18}>
                {title}
              </MyText>
            )}
          </Div>
          <Div style={{ alignItems: "flex-end", ...(rightDivStyle as object) }}>
            {showPage && (
              <PageCount currentPage={currentPage} totalPage={totalPage} />
            )}
            {RightButtonText && (
              <Rightbutton onPress={onRightButtonPress}>
                {RightButtonText}
              </Rightbutton>
            )}
          </Div>
        </Wrapper>
      </Container>
      {showPage ? (
        <PageIndicator
          style={pageIndicatorStyle}
          currentPage={currentPage}
          totalPage={totalPage}
        />
      ) : null}
    </>
  );
};

export default CustomHeader;
