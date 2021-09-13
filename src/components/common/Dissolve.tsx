import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Animated, StyleProp, ViewStyle } from "react-native";

const Dissolve = ({
  isVisible,
  children,
  style,
}: {
  isVisible: boolean;
  children: ReactNode;
  style?: Animated.AnimatedProps<StyleProp<ViewStyle>>;
}) => {
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
      style={{
        opacity: value,
        ...(style as object),
      }}>
      {isChildrenVisible ? children : null}
    </Animated.View>
  );
};

export default Dissolve;
