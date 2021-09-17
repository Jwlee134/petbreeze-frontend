import { useEffect, useRef } from "react";
import { Animated } from "react-native";

interface IProps {
  firstDuration?: number;
  secondDuration?: number;
  thirdDuration?: number;
  shouldDelayOnMount?: boolean;
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
  onAnimatedFinish?: () => void;
  numOfValues: number;
  dependencies?: any[];
}

const useAnimatedSequence = ({
  firstDuration = 200,
  secondDuration = 200,
  thirdDuration = 200,
  shouldDelayOnMount = true,
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
  onAnimatedFinish,
  numOfValues,
  dependencies,
}: IProps) => {
  const valueArr = Array.from(
    { length: numOfValues },
    () => useRef(new Animated.Value(0)).current,
  );

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
      if (shouldDelayOnMount) {
        delayOnMountSequence(Animated.loop(sequence())).start();
      } else {
        Animated.loop(sequence()).start();
      }
    } else {
      if (shouldDelayOnMount) {
        delayOnMountSequence(sequence()).start(() => {
          if (onAnimatedFinish) onAnimatedFinish();
        });
      } else {
        sequence().start(() => {
          if (onAnimatedFinish) onAnimatedFinish();
        });
      }
    }
  }, [loop, ...(dependencies ? dependencies : [])]);

  return valueArr;
};

export default useAnimatedSequence;
