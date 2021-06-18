import React from "react";
import { Dimensions, Platform } from "react-native";
import styled from "styled-components/native";

import useFocusEvent from "~/hooks/useFocusEvent";
import useDistrictSelector from "~/hooks/useDistrictSelector";
import useGeolocation from "~/hooks/useGeolocation";

import CommunityTopTapNavigator from "~/navigator/CommunityTopTabNav";
import { CommunityScreenNavigationProp } from "~/types/navigator";

import Modal from "react-native-modal";

import Search from "~/assets/svg/search.svg";

import WheelPicker from "~/components/common/WheelPicker";
import ListPicker from "~/components/common/ListPicker";
import AddCircleButton from "~/components/common/button/AddCircleButton";
import Input from "~/components/common/Input";

const { width } = Dimensions.get("window");

const Container = styled.View`
  flex: 1;
`;

const Community = ({
  navigation,
}: {
  navigation: CommunityScreenNavigationProp;
}) => {
  useFocusEvent();

  const { lat, lng } = useGeolocation();

  const {
    handleList,
    handleDone,
    selectedIndex,
    setSelectedIndex,
    value,
    open,
    modalProps,
    BottomModalComponent,
  } = useDistrictSelector();

  return (
    <>
      <Container>
        <CommunityTopTapNavigator />
        <Input
          onPress={open}
          buttonStyle={{
            position: "absolute",
            top: 65,
            left: 15,
            width: width - 30,
          }}
          style={{
            height: 35,
            borderRadius: 0,
          }}
          hasShadow={false}
          isInputEditable={false}
          value={value}
          RightIcon={() => <Search />}
        />
      </Container>
      <AddCircleButton
        isFloating={true}
        size={50}
        onPress={() => navigation.navigate("PostAnimalInfo")}
      />
      <Modal {...modalProps}>
        <BottomModalComponent
          useHeaderButton={Platform.OS === "ios"}
          handleDone={handleDone}
          isOneStep={false}
          headerTitle="지역 선택">
          {Platform.OS === "ios" ? (
            <WheelPicker
              data={handleList()}
              selectedIndex={selectedIndex}
              setSelectedIndex={index => setSelectedIndex(index)}
            />
          ) : (
            <ListPicker
              data={handleList()}
              handleDone={handleDone}
              setSelectedIndex={setSelectedIndex}
            />
          )}
        </BottomModalComponent>
      </Modal>
    </>
  );
};

export default Community;
