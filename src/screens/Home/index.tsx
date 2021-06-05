import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

import AddCircleButton from "~/components/common/button/AddCircleButton";
import SafeAreaContainer from "~/components/common/container/SafeAreaContainer";
import CustomHeader from "~/components/common/CustomHeader";
import Input from "~/components/common/Input";
import useFocusEvent from "~/hooks/useFocusEvent";
import HomeTopTapNavigator from "~/navigator/HomeTopTabNav";
import { HomeScreenNavigationProp } from "~/types/navigator";

import Modal from "react-native-modal";

import Search from "~/assets/svg/search.svg";
import WheelPicker from "~/components/common/WheelPicker";
import useDistrictSelector from "~/hooks/useDistrictSelector";
import useGeolocation from "~/hooks/useGeolocation";

const { width } = Dimensions.get("window");

const Container = styled.View`
  flex: 1;
`;

const Home = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
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
      <SafeAreaContainer>
        <CustomHeader size="big">어디개</CustomHeader>
        <Container>
          <HomeTopTapNavigator />
          <Input
            onPress={open}
            buttonStyle={{
              position: "absolute",
              top: 65,
              left: 25,
              width: width - 50,
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
      </SafeAreaContainer>
      <Modal {...modalProps}>
        <BottomModalComponent
          handleDone={handleDone}
          isOneStep={false}
          headerTitle="지역 선택">
          <WheelPicker
            data={handleList()}
            selectedIndex={selectedIndex}
            onValueChange={index => setSelectedIndex(index)}
          />
        </BottomModalComponent>
      </Modal>
    </>
  );
};

export default Home;
