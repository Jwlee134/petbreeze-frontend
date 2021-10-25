import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Animated, StyleProp, ViewProps, ViewStyle } from "react-native";

interface IProps extends ViewProps {
  isVisible: boolean;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Dissolve = ({ isVisible, children, style, ...props }: IProps) => {
  const [isChildrenVisible, setIsChildrenVisible] = useState(isVisible);
  const value = useRef(new Animated.Value(isVisible ? 1 : 0)).current;

  useEffect(() => {
    if (isVisible) {
      setIsChildrenVisible(true);
    }
    Animated.timing(value, {
      toValue: isVisible ? 1 : 0,
      useNativeDriver: true,
      duration: 200,
    }).start(() => {
      if (!isVisible) {
        setIsChildrenVisible(false);
      }
    });
  }, [isVisible]);

  return (
    <Animated.View
      pointerEvents={!isChildrenVisible ? "none" : undefined}
      style={{
        opacity: value,
        ...(style as object),
      }}
      {...props}>
      {isChildrenVisible ? children : null}
    </Animated.View>
  );
};

export default Dissolve;
