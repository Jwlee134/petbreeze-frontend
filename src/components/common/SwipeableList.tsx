import React, { useRef } from "react";
import { View } from "react-native";
import { SwipeRow } from "react-native-swipe-list-view";
import { hiddenButtonWidth } from "~/styles/constants";
import HiddenButton from "./HiddenButton";

interface Props<T> {
  data: T[];
  keyExtractor: (item: T) => string;
  renderItem: (item: T, index: number) => JSX.Element;
  onHiddenButtonPress: (item: T) => void;
  disableLeftSwipe?: boolean;
}

const SwipeableList = <T extends object>({
  data,
  keyExtractor,
  renderItem,
  onHiddenButtonPress,
  disableLeftSwipe,
}: Props<T>) => {
  const swipeableRef = useRef<{ [key: string]: SwipeRow<unknown> | null }>({});

  return (
    <View>
      {data.map((currentItem, index) => (
        <SwipeRow
          key={keyExtractor(currentItem)}
          preview={disableLeftSwipe ? false : index === 0}
          disableRightSwipe
          disableLeftSwipe={disableLeftSwipe}
          rightOpenValue={-hiddenButtonWidth}
          ref={ref => {
            swipeableRef.current[keyExtractor(currentItem)] = ref;
          }}
          onRowOpen={() => {
            data
              .filter(item => keyExtractor(item) !== keyExtractor(currentItem))
              .forEach(item =>
                swipeableRef.current[keyExtractor(item)]?.closeRow(),
              );
          }}>
          <HiddenButton
            onPress={() => {
              swipeableRef.current[keyExtractor(currentItem)]?.closeRow();
              onHiddenButtonPress(currentItem);
            }}
          />
          {renderItem(currentItem, index)}
        </SwipeRow>
      ))}
    </View>
  );
};

export default SwipeableList;
