import Picker from "@gregfrench/react-native-wheel-picker";
import DatePicker from "react-native-date-picker";
import React, { useState } from "react";
import { StyleProp, useWindowDimensions, ViewStyle } from "react-native";
import { ModalProps } from "react-native-modal";
import styled from "styled-components/native";
import palette from "~/styles/palette";

interface IProps {
  style?: StyleProp<ViewStyle>;
  HeaderTitle: string;
  data: string[] | number[] | undefined;
  handleDone: () => void;
  useListPicker?: boolean;
  useDatePicker?: boolean;
}

const Container = styled.View`
  height: 230px;
  background-color: ${palette.light_grey};
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 12px 0px;
`;

const Title = styled.Text`
  font-size: 20px;
  flex-grow: 1.2;
  text-align: center;
`;

const Button = styled.TouchableOpacity`
  flex-grow: 1;
  width: 80px;
`;

const ToggleText = styled.Text`
  font-size: 20px;
  color: ${palette.light_blue};
  text-align: center;
`;

const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const useModalSelector = () => {
  const { width } = useWindowDimensions();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [date, setDate] = useState(new Date());

  const open = () => setModalVisible(true);

  const close = () => {
    setModalVisible(false);
    setSelectedIndex(0);
  };

  const modalOptions: Partial<ModalProps> = {
    isVisible: isModalVisible,
    backdropTransitionOutTiming: 0,
    onBackdropPress: close,
    backdropOpacity: 0.3,
    style: { justifyContent: "flex-end", margin: 0 },
  };

  const ModalComponent = ({
    style,
    HeaderTitle,
    data,
    handleDone,
    useListPicker,
    useDatePicker,
  }: IProps) => (
    <Container style={style}>
      <Header>
        <Button activeOpacity={0.8} onPress={close}>
          <ToggleText>Cancel</ToggleText>
        </Button>
        <Title>{HeaderTitle}</Title>
        <Button
          activeOpacity={0.8}
          onPress={() => {
            handleDone();
            close();
          }}>
          <ToggleText>Done</ToggleText>
        </Button>
      </Header>
      <Content>
        {useListPicker && (
          <Picker
            style={{ width, height: "100%" }}
            lineColor="#000000"
            selectedValue={selectedIndex}
            itemStyle={{ color: "black", fontSize: 22 }}
            onValueChange={index => setSelectedIndex(index)}>
            {data?.map((value: string | number, index: number) => (
              <Picker.Item key={index} label={String(value)} value={index} />
            ))}
          </Picker>
        )}
        {useDatePicker && (
          <DatePicker
            androidVariant="iosClone"
            mode="datetime"
            locale="ko"
            date={date}
            maximumDate={new Date()}
            onDateChange={setDate}
            fadeToColor={palette.light_grey}
            style={{
              width,
              backgroundColor: palette.light_grey,
            }}
          />
        )}
      </Content>
    </Container>
  );

  return {
    open,
    close,
    modalOptions,
    ModalComponent,
    selectedIndex,
    setSelectedIndex,
    date,
  };
};

export default useModalSelector;
