import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  RectButton,
  Swipeable as Container,
} from "react-native-gesture-handler";
import { DimensionsContext } from "~/context/DimensionsContext";
import palette from "~/styles/palette";

interface IProps {
  children: ReactNode;
  RightButtonIcon: () => JSX.Element;
  onRightButtonPress: () => void;
  animate?: boolean;
  enableRightActions?: boolean;
}

const Swipeable = ({
  children,
  RightButtonIcon,
  onRightButtonPress,
  animate = false,
  enableRightActions,
}: IProps) => {
  const { rpWidth } = useContext(DimensionsContext);
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

  const renderRightActions = () => (
    <RectButton
      style={{
        backgroundColor: palette.red_f0,
        width: rpWidth(72),
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onRightButtonPress}>
      <RightButtonIcon />
    </RectButton>
  );

  return (
    <Container
      friction={2}
      ref={swipeableRef}
      renderRightActions={!hide ? renderRightActions : () => <></>}>
      {children}
    </Container>
  );
};

export default React.memo(Swipeable);
