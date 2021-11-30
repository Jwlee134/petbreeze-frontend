import React, { useState } from "react";
import DatePicker from "react-native-date-picker";
import Modal, { ModalProps } from "react-native-modal";
import { useDispatch } from "react-redux";
import { useAppSelector } from "~/store";
import { formActions } from "~/store/form";
import CommonCenterModal from "./CommonCenterModal";

const DateModal = ({
  close,
  modalProps,
}: {
  close: () => void;
  modalProps: ({
    type,
    ...props
  }: Partial<ModalProps> & {
    type: "bottom" | "center";
  }) => Partial<ModalProps>;
}) => {
  const { birthYear, birthMonth, birthDay } = useAppSelector(
    state => state.form,
  );
  const [date, setDate] = useState(
    birthYear ? new Date(`${birthYear}-${birthMonth}-${birthDay}`) : new Date(),
  );
  const dispatch = useDispatch();

  return (
    <Modal {...modalProps({ type: "center" })}>
      <CommonCenterModal
        rightButtonText="확인"
        onRightButtonPress={() => {
          dispatch(
            formActions.setState({
              birthYear: date.getFullYear(),
              birthMonth: date.getMonth() + 1,
              birthDay: date.getDate(),
            }),
          );
          close();
        }}
        close={close}
        style={{ width: 300 }}>
        <DatePicker
          style={{ width: 300 }}
          date={date}
          onDateChange={setDate}
          mode="date"
          maximumDate={new Date()}
        />
      </CommonCenterModal>
    </Modal>
  );
};

export default DateModal;
