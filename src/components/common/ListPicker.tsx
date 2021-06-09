import React from "react";
import { ScrollView, useWindowDimensions } from "react-native";
import palette from "~/styles/palette";
import ListItem from "./ListItem";

interface IProps {
  data: string[];
  setSelectedIndex: (
    index: number,
  ) => void | React.Dispatch<React.SetStateAction<number>>;
  handleDone: (selectedIndex?: number) => void;
  close?: () => void;
}

const ListPicker = ({ data, setSelectedIndex, handleDone, close }: IProps) => {
  const width = useWindowDimensions().width;

  return (
    <ScrollView
      contentContainerStyle={{
        width,
      }}>
      {data.map((item, index) => (
        <ListItem
          key={index}
          isLastItem={index === data.length - 1}
          style={{ borderRadius: 0, backgroundColor: palette.gray_f3 }}
          underlayColor={palette.gray_e5}
          onPress={() => {
            setSelectedIndex(index);
            handleDone(index);
            if (close) close();
          }}>
          {item}
        </ListItem>
      ))}
    </ScrollView>
  );
};

export default ListPicker;
