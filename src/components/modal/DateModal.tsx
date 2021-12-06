import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import DatePicker from "react-native-date-picker";
import { ModalProps } from "react-native-modal";
import { useDispatch } from "react-redux";
import { ModalPosition } from "~/hooks/useModal";
import { useAppSelector } from "~/store";
import { formActions } from "~/store/form";
import CommonCenterModal from "./CommonCenterModal";

interface Props {
  close: () => void;
  modalProps: ({
    type,
    ...props
  }: Partial<ModalProps> & {
    type: ModalPosition;
  }) => Partial<ModalProps>;
  isEmergency?: boolean;
}

const DateModal = ({ close, modalProps, isEmergency = false }: Props) => {
  const { width } = useWindowDimensions();
  const {
    birthYear,
    birthMonth,
    birthDay,
    lostMonth,
    lostDate,
    lostHour,
    lostMinute,
  } = useAppSelector(state => state.form);

  const initialDate = isEmergency
    ? lostMonth
      ? new Date(
          new Date().getFullYear(),
          lostMonth + 1,
          lostDate,
          lostHour,
          lostMinute,
        )
      : new Date()
    : birthYear
    ? new Date(birthYear, birthMonth + 1, birthDay)
    : new Date();
  const [date, setDate] = useState(initialDate);
  const dispatch = useDispatch();

  const onConfirm = () => {
    if (isEmergency) {
      dispatch(
        formActions.setState({
          lostMonth: date.getMonth() + 1,
          lostDate: date.getDate(),
          lostHour: date.getHours(),
          lostMinute: date.getMinutes(),
        }),
      );
    } else {
      dispatch(
        formActions.setState({
          birthYear: date.getFullYear(),
          birthMonth: date.getMonth() + 1,
          birthDay: date.getDate(),
        }),
      );
    }
    close();
  };

  return (
    <CommonCenterModal
      rightButtonText="확인"
      onRightButtonPress={onConfirm}
      close={close}
      modalProps={modalProps}
      containerStyle={{ width: width - 34, maxWidth: 360 }}>
      <DatePicker
        date={date}
        style={{ width: 360 }}
        onDateChange={setDate}
        mode={isEmergency ? "datetime" : "date"}
        maximumDate={new Date()}
      />
    </CommonCenterModal>
  );
};

export default DateModal;
