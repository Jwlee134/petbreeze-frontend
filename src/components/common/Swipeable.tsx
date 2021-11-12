import React, { ReactNode, useEffect, useRef, useState } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Swipeable as Container } from "react-native-gesture-handler";

interface Props {
  children: ReactNode;
  animate?: boolean;
  enableRightActions?: boolean;
  RenderRightActions: () => JSX.Element;
  style?: StyleProp<ViewStyle>;
  rightThreshold?: number;
}

const Swipeable = ({
  children,
  animate = false,
  enableRightActions,
  RenderRightActions,
  rightThreshold,
  style,
}: Props) => {
  const swipeableRef = useRef<Container>(null);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (!animate) return;
    const timeout1 = setTimeout(() => {
      swipeableRef.current?.openRight();
    }, 400);
    const timeout2 = setTimeout(() => {
      swipeableRef.current?.close();
    }, 1400);
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      swipeableRef.current?.close();
    };
  }, [animate, swipeableRef.current]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (enableRightActions) {
      setHide(false);
    } else {
      timeout = setTimeout(() => {
        setHide(true);
      }, 200);
    }
    return () => {
      if (timeout && enableRightActions) {
        clearTimeout(timeout);
      }
    };
  }, [enableRightActions]);

  return (
    <Container
      containerStyle={style}
      friction={2}
      ref={swipeableRef}
      rightThreshold={rightThreshold || undefined}
      renderRightActions={!hide ? () => <RenderRightActions /> : () => <></>}>
      {children}
    </Container>
  );
};

export default React.memo(Swipeable);
