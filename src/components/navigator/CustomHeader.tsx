import { StackHeaderProps } from "@react-navigation/stack";
import React, { ReactNode, useEffect, useMemo } from "react";
import styled from "styled-components/native";
import { rpWidth } from "~/styles";
import MyText from "../common/MyText";
import Arrow from "~/assets/svg/arrow/arrow-left.svg";
import { Animated } from "react-native";
import { useRef } from "react";
import palette from "~/styles/palette";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Dissolve from "../common/Dissolve";

interface IProps extends Partial<StackHeaderProps> {
  children?: ReactNode;
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
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
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
  margin-top: ${rpWidth(5)}px;
`;

const PageBar = styled(Animated.View)`
  height: 100%;
  background-color: ${palette.blue_7b_90};
`;

const CustomHeader = ({
  children,
  navigation,
  onBackButtonPress,
  disableBackButton = false,
  currentPage = 0,
  totalPage = 0,
}: IProps) => {
  const { top } = useSafeAreaInsets();
  const showPage = currentPage !== 0 && totalPage !== 0;

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
          <Dissolve
            style={{
              position: "absolute",
              left: rpWidth(5),
              width: rpWidth(32),
              height: "100%",
            }}
            isVisible={!disableBackButton}>
            <Button
              onPress={() => {
                if (onBackButtonPress) {
                  onBackButtonPress();
                  return;
                } else if (navigation) navigation.goBack();
              }}>
              <Arrow width={rpWidth(13)} height={rpWidth(21)} />
            </Button>
          </Dissolve>
          {children ? (
            <MyText fontWeight="medium" fontSize={18}>
              {children}
            </MyText>
          ) : null}
          {showPage ? (
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
      <PageBarBackground
        style={{
          backgroundColor: showPage ? "rgba(0, 0, 0, 0.1)" : "transparent",
        }}>
        {showPage ? <PageBar style={{ width: widthInterpolate }} /> : null}
      </PageBarBackground>
    </>
  );
};

export default CustomHeader;
