import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import DatePicker from "react-native-date-picker";
import Modal, { ModalProps } from "react-native-modal";
import { useDispatch } from "react-redux";
import { useAppSelector } from "~/store";
import { formActions } from "~/store/form";
import CommonCenterModal from "./CommonCenterModal";

interface Props {
  close: () => void;
  modalProps: ({
    type,
    ...props
  }: Partial<ModalProps> & {
    type: "bottom" | "center";
  }) => Partial<ModalProps>;
}

const DateModal = ({ close, modalProps }: Props) => {
  const { width } = useWindowDimensions();
  const { birthYear, birthMonth, birthDay } = useAppSelector(
    state => state.form,
  );
  const [date, setDate] = useState(
    birthYear ? new Date(`${birthYear}-${birthMonth}-${birthDay}`) : new Date(),
  );
  const dispatch = useDispatch();

  const onConfirm = () => {
    dispatch(
      formActions.setState({
        birthYear: date.getFullYear(),
        birthMonth: date.getMonth() + 1,
        birthDay: date.getDate(),
      }),
    );
    close();
  };

  return (
    <Modal {...modalProps({ type: "center" })}>
      <CommonCenterModal
        rightButtonText="확인"
        onRightButtonPress={onConfirm}
        close={close}
        containerStyle={{ maxWidth: width - 34, width: 320 }}>
        <DatePicker
          date={date}
          style={{ width: 320 }}
          onDateChange={setDate}
          mode="date"
          maximumDate={new Date()}
        />
      </CommonCenterModal>
    </Modal>
  );
};

export default DateModal;
