import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import AddCircleButton from "~/components/common/button/AddCircleButton";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";
import Device from "~/components/myPage/Device";
import useModal from "~/hooks/useModal";
import { DeviceListScreenNavigationProp } from "~/types/navigator";

import Modal from "react-native-modal";
import DeviceListModal from "~/components/modal/DeviceListModal";
import { useAppSelector } from "~/store";
import { useState } from "react";

const DeviceListContainer = styled.View`
  margin: 26px 0px;
`;

const ButtonContainer = styled.View`
  align-items: center;
`;

const DeviceList = ({
  navigation,
}: {
  navigation: DeviceListScreenNavigationProp;
}) => {
  const data = useAppSelector(state => state.device);
  const [id, setId] = useState(0);
  const { open, close, modalProps, CenterModalComponent } = useModal({
    type: "center",
  });

  return (
    <>
      <ScrollView>
        <SidePaddingContainer>
          <DeviceListContainer>
            {data.map((item, index) => (
              <Device
                key={index}
                data={item}
                isLast={index === data.length - 1}
                onPress={() => {
                  open();
                  setId(item.id);
                }}
              />
            ))}
          </DeviceListContainer>
          <ButtonContainer>
            <AddCircleButton
              size={50}
              onPress={() => navigation.navigate("AddDevice")}
            />
          </ButtonContainer>
        </SidePaddingContainer>
      </ScrollView>
      <Modal {...modalProps}>
        <CenterModalComponent>
          <DeviceListModal close={close} id={id} />
        </CenterModalComponent>
      </Modal>
    </>
  );
};

export default DeviceList;
