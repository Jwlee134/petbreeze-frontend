import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Animated, StyleProp, ViewProps, ViewStyle } from "react-native";

interface Props extends ViewProps {
  isVisible: boolean;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Dissolve = ({ isVisible, children, style, ...props }: Props) => {
  const [isChildrenVisible, setIsChildrenVisible] = useState(isVisible);
  const value = useRef(new Animated.Value(isVisible ? 1 : 0)).current;
  const timeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isVisible) {
      setIsChildrenVisible(true);
    }
    if (!isVisible) {
      timeout.current = setTimeout(() => {
        setIsChildrenVisible(false);
      }, 200);
    }
    Animated.timing(value, {
      toValue: isVisible ? 1 : 0,
      useNativeDriver: true,
      duration: 200,
    }).start();

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
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
