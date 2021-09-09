import { StackHeaderProps } from "@react-navigation/stack";
import React, { ReactNode, useEffect, useMemo } from "react";
import styled from "styled-components/native";
import { rpWidth } from "~/styles";
import MyText from "../common/MyText";
import Arrow from "~/assets/svg/arrow/arrow-left.svg";
import { useDispatch } from "react-redux";
import { Animated } from "react-native";
import { useRef } from "react";
import palette from "~/styles/palette";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface IProps extends Partial<StackHeaderProps> {
  children?: ReactNode;
  useTitle?: boolean;
  disableBackButton?: boolean;
  onBackButtonPress?: () => void;
  currentPage?: number;
  totalPage?: number;
}

const Container = styled(Animated.View)`
  height: ${rpWidth(44)}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Button = styled.TouchableOpacity`
  width: ${rpWidth(32)}px;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: ${rpWidth(5)}px;
`;

const PageCount = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: ${rpWidth(13.5)}px;
  flex-direction: row;
`;

const PageBarBackground = styled.View`
  height: ${rpWidth(4)}px;
  background-color: rgba(0, 0, 0, 0.1);
  margin-top: ${rpWidth(5)}px;
`;

const PageBar = styled(Animated.View)`
  height: 100%;
  background-color: ${palette.blue_7b_90};
`;

const CustomHeader = ({
  children,
  navigation,
  useTitle,
  onBackButtonPress,
  disableBackButton = false,
  currentPage = 0,
  totalPage = 0,
}: IProps) => {
  const { top } = useSafeAreaInsets();
  const dispatch = useDispatch();

  const value = useRef(new Animated.Value(currentPage)).current;

  const widthInterpolate = useMemo(() => {
    if (currentPage) {
      return value.interpolate({
        inputRange: [0, currentPage],
        outputRange: ["0%", `${(currentPage / totalPage) * 100}%`],
      });
    }
  }, [currentPage]);

  useEffect(() => {
    if (currentPage) {
      Animated.timing(value, {
        toValue: currentPage,
        useNativeDriver: false,
        duration: 200,
      }).start();
    }
  }, [currentPage]);

  return (
    <>
      <Container
        style={{
          marginTop: navigation ? top : 0,
        }}>
        <>
          {!disableBackButton ? (
            <Button
              onPress={() => {
                if (onBackButtonPress) {
                  onBackButtonPress();
                  return;
                } else if (navigation) navigation.goBack();
              }}>
              <Arrow width={rpWidth(13)} height={rpWidth(21)} />
            </Button>
          ) : null}
          {navigation ? (
            <MyText fontWeight="medium" fontSize={18}>
              {children}
            </MyText>
          ) : null}
          {currentPage && totalPage ? (
            <PageCount>
              <MyText fontSize={14} fontWeight="medium" color={palette.blue_7b}>
                {currentPage}{" "}
              </MyText>
              <MyText
                fontSize={14}
                fontWeight="medium"
                color="rgba(0, 0, 0, 0.3)">
                / {totalPage}
              </MyText>
            </PageCount>
          ) : null}
        </>
      </Container>
      {currentPage && totalPage ? (
        <PageBarBackground>
          <PageBar style={{ width: widthInterpolate }} />
        </PageBarBackground>
      ) : null}
    </>
  );
};

export default CustomHeader;
