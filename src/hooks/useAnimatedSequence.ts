import { useEffect, useRef } from "react";
import { Animated } from "react-native";

interface IProps {
  firstDuration?: number;
  secondDuration?: number;
  thirdDuration?: number;
  delayOnMount?: boolean;
  delayAfterMount?: number;
  delayAfterFirst?: number;
  delayAfterSecond?: number;
  delayAfterThird?: number;
  loop?: boolean;
  resetDuration?: number;
  delayAfterReset?: number;
  useNativeDriverOnFirst?: boolean;
  useNativeDriverOnSecond?: boolean;
  useNativeDriverOnThird?: boolean;
  onAnimatedFinished?: () => void;
  numOfValues: number;
}

const useAnimatedSequence = ({
  firstDuration = 200,
  secondDuration = 200,
  thirdDuration = 200,
  delayOnMount = true,
  delayAfterMount = 400,
  delayAfterFirst = 200,
  delayAfterSecond = 200,
  delayAfterThird = 200,
  loop = false,
  resetDuration = 200,
  delayAfterReset = 200,
  useNativeDriverOnFirst = true,
  useNativeDriverOnSecond = true,
  useNativeDriverOnThird = true,
  onAnimatedFinished,
  numOfValues,
}: IProps) => {
  const value1 = useRef(new Animated.Value(0)).current;
  const value2 = useRef(new Animated.Value(0)).current;
  const value3 = useRef(new Animated.Value(0)).current;

  const valueArr =
    numOfValues === 1
      ? [value1]
      : numOfValues === 2
      ? [value1, value2]
      : [value1, value2, value3];

  useEffect(() => {
    const sequence = () =>
      Animated.sequence([
        ...valueArr
          .map((value, index) => [
            Animated.timing(value, {
              toValue: 1,
              duration:
                index === 0
                  ? firstDuration
                  : index === 1
                  ? secondDuration
                  : thirdDuration,
              useNativeDriver:
                index === 0
                  ? useNativeDriverOnFirst
                  : index === 1
                  ? useNativeDriverOnSecond
                  : useNativeDriverOnThird,
            }),
            ...(loop
              ? [
                  Animated.delay(
                    index === 0
                      ? delayAfterFirst
                      : index === 1
                      ? delayAfterSecond
                      : delayAfterThird,
                  ),
                ]
              : index === 2
              ? []
              : [
                  Animated.delay(
                    index === 0 ? delayAfterFirst : delayAfterSecond,
                  ),
                ]),
          ])
          .flat(),
        ...(loop
          ? [
              Animated.parallel(
                valueArr.map(value =>
                  Animated.timing(value, {
                    toValue: 0,
                    duration: resetDuration,
                    useNativeDriver: true,
                  }),
                ),
              ),
              Animated.delay(delayAfterReset),
            ]
          : []),
      ]);

    const delayOnMountSequence = (main: Animated.CompositeAnimation) =>
      Animated.sequence([Animated.delay(delayAfterMount), main]);

    if (loop) {
      if (delayOnMount) {
        delayOnMountSequence(Animated.loop(sequence())).start();
      } else {
        Animated.loop(sequence()).start();
      }
    } else {
      if (delayOnMount) {
        delayOnMountSequence(sequence()).start(() => {
          if (onAnimatedFinished) onAnimatedFinished();
        });
      } else {
        sequence().start(() => {
          if (onAnimatedFinished) onAnimatedFinished();
        });
      }
    }
  }, [loop]);

  return valueArr;
};

export default useAnimatedSequence;
