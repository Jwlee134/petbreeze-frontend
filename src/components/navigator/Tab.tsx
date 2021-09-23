import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import palette from "~/styles/palette";
import MyText from "../common/MyText";

interface IProps extends TouchableOpacityProps {
  isFocused: boolean;
  onPress: () => void;
  label: string;
  setToValue: React.Dispatch<React.SetStateAction<number>>;
}

const TabButton = styled.TouchableOpacity<{ rpWidth: RpWidth }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ rpWidth }) => `0px ${rpWidth(20)}px`};
`;

const Tab = ({ isFocused, onPress, label, setToValue, ...props }: IProps) => {
  const [layout, setLayout] = useState<number | null>(null);
  const { rpWidth } = useContext(DimensionsContext);

  useEffect(() => {
    if (isFocused && layout !== null) {
      setToValue(layout);
    }
  }, [isFocused, layout]);

  return (
    <TabButton
      rpWidth={rpWidth}
      onLayout={e => {
        setLayout(e.nativeEvent.layout.x);
      }}
      onPress={onPress}
      {...props}>
      <MyText
        fontSize={14}
        color={isFocused ? palette.blue_7b : "rgba(0, 0, 0, 0.5)"}>
        {label}
      </MyText>
    </TabButton>
  );
};

export default Tab;
