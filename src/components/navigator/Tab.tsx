import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components/native";
import { rpWidth } from "~/styles";
import MyText from "../common/MyText";

interface IProps {
  isFocused: boolean;
  onPress: () => void;
  label: string;
  setToValue: React.Dispatch<React.SetStateAction<number>>;
}

const TabButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0px ${rpWidth(20)}px;
`;

const Tab = ({ isFocused, onPress, label, setToValue }: IProps) => {
  const [layout, setLayout] = useState(0);

  useEffect(() => {
    if (isFocused) {
      setToValue(layout);
    }
  }, [isFocused]);

  return (
    <TabButton
      onLayout={e => {
        setLayout(e.nativeEvent.layout.x);
      }}
      onPress={onPress}>
      <MyText fontSize={14} color="rgba(0, 0, 0, 0.5)">
        {label}
      </MyText>
    </TabButton>
  );
};

export default Tab;
