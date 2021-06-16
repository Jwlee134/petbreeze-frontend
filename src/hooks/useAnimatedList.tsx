import React, { ReactNode, useRef, useState } from "react";
import { useEffect } from "react";
import { Animated, Easing, StyleProp, ViewStyle } from "react-native";
import styled from "styled-components/native";

interface IProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Button = styled.TouchableOpacity`
  flex-grow: 1;
`;

const IconWrapper = styled(Animated.View)``;

const ListWrapper = styled(Animated.View)``;

const useAnimatedList = () => {
  const value = useRef(new Animated.Value(0)).current;

  const [isOpened, setIsOpened] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!isOpened) {
      timeout = setTimeout(() => {
        setAnimate(false);
      }, 150);
    } else {
      setAnimate(true);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isOpened]);

  const rotateInterpolate = value.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const translateInterpolate = value.interpolate({
    inputRange: [0, 1],
    outputRange: ["-35px", "0px"],
  });

  const opacityInterpolate = value.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [0, 0.2, 1],
  });

  Animated.timing(value, {
    toValue: isOpened ? 1 : 0,
    duration: 150,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start();

  const OutsideClickHandler = ({ children }: { children: ReactNode }) => (
    <Button
      activeOpacity={1}
      onPress={() => {
        if (isOpened) setIsOpened(false);
      }}>
      {children}
    </Button>
  );

  const IconContainer = ({ children, style }: IProps) => (
    <IconWrapper
      style={{
        transform: [{ rotateZ: rotateInterpolate }],
        ...(style as object),
      }}>
      {children}
    </IconWrapper>
  );

  const ListContainer = ({ children, style }: IProps) => {
    if (!isOpened && !animate) return null;
    return (
      <ListWrapper
        style={{
          opacity: opacityInterpolate,
          transform: [{ translateY: translateInterpolate }],
          ...(style as object),
        }}>
        {children}
      </ListWrapper>
    );
  };

  return {
    isOpened,
    setIsOpened,
    OutsideClickHandler,
    IconContainer,
    ListContainer,
  };
};

export default useAnimatedList;
