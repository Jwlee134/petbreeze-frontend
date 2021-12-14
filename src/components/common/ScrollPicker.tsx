/* eslint-disable no-underscore-dangle */
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import MyText from "./MyText";
import styled from "styled-components/native";
import palette from "~/styles/palette";
import { isIos } from "~/utils";
import { ScrollView } from "react-native-gesture-handler";
import {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

interface ScrollPickerProps {
  width: string | number;
  height: number;
  style?: StyleProp<ViewStyle>;
  data: string[];
  selectedIndex: number;
  onValueChange?: (value: string, index: number) => void;
}

const Container = styled.View`
  background-color: white;
  overflow: hidden;
  border-width: 1px;
  border-color: ${palette.blue_7b};
`;

const ScrollPicker = ({
  width,
  height,
  style,
  data,
  ...props
}: ScrollPickerProps) => {
  const [initialized, setInitialized] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(
    props.selectedIndex && props.selectedIndex >= 0 ? props.selectedIndex : 0,
  );
  const sView = useRef<ScrollView>(null);
  const [isScrollTo, setIsScrollTo] = useState(false);
  const [dragStarted, setDragStarted] = useState(false);
  const [momentumStarted, setMomentumStarted] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (initialized) return;
    setInitialized(true);

    setTimeout(() => {
      const y = height * selectedIndex;
      sView?.current?.scrollTo({ y });
    }, 0);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [initialized, height, selectedIndex, sView, timer]);

  const scrollFix = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      let y = 0;
      const h = height;
      if (e.nativeEvent.contentOffset) {
        y = e.nativeEvent.contentOffset.y;
      }
      const _selectedIndex = Math.round(y / h);

      const _y = _selectedIndex * h;
      if (_y !== y) {
        if (isIos) {
          setIsScrollTo(true);
        }
        sView?.current?.scrollTo({ y: _y });
      }
      if (selectedIndex === _selectedIndex) {
        return;
      }
      if (props.onValueChange) {
        const selectedValue = data[_selectedIndex];
        setSelectedIndex(_selectedIndex);
        props.onValueChange(selectedValue, _selectedIndex);
      }
    },
    [height, props, selectedIndex],
  );

  const onScrollBeginDrag = () => {
    setDragStarted(true);

    if (isIos) {
      setIsScrollTo(false);
    }
    if (timer) clearTimeout(timer);
  };

  const onScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setDragStarted(false);

    const _e: NativeSyntheticEvent<NativeScrollEvent> = { ...e };
    if (timer) clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        if (!momentumStarted) {
          scrollFix(_e);
        }
      }, 50),
    );
  };
  const onMomentumScrollBegin = () => {
    setMomentumStarted(true);
    if (timer) clearTimeout(timer);
  };

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setMomentumStarted(false);

    if (!isScrollTo && !dragStarted) {
      scrollFix(e);
    }
  };

  return (
    <Container
      style={{
        width,
        height,
        borderRadius: 28,
        ...(style as object),
      }}>
      <ScrollView
        ref={sView}
        bounces={false}
        showsVerticalScrollIndicator={false}
        onMomentumScrollBegin={() => onMomentumScrollBegin()}
        onMomentumScrollEnd={e => onMomentumScrollEnd(e)}
        onScrollBeginDrag={() => onScrollBeginDrag()}
        onScrollEndDrag={e => onScrollEndDrag(e)}>
        {data.map((item, index) => {
          const selected = item === data[selectedIndex];
          const value = useDerivedValue(() => (selected ? 1 : 0));

          const color = useAnimatedStyle(() => ({
            color: interpolateColor(
              value.value,
              [0, 1],
              ["rgba(0, 0, 0, 0.3)", palette.blue_7b],
            ),
          }));

          return (
            <View
              onStartShouldSetResponder={() => true}
              key={index}
              style={{
                width,
                height,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
              }}>
              <MyText
                style={{ marginTop: -3 }}
                animatedStyle={color}
                fontWeight="medium"
                key={index}>
                {item}
              </MyText>
            </View>
          );
        })}
      </ScrollView>
    </Container>
  );
};

export default memo(ScrollPicker);
