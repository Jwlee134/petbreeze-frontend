import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

import AddCircleButton from "~/components/common/button/AddCircleButton";
import SafeAreaContainer from "~/components/common/container/SafeAreaContainer";
import CustomHeader from "~/components/common/CustomHeader";
import Input from "~/components/common/input/Input";
import useFocusEvent from "~/hooks/useFocusEvent";
import HomeTopTapNavigator from "~/navigator/HomeTopTabNav";
import { HomeScreenNavigationProp } from "~/types/navigator";

import Search from "~/assets/svg/search.svg";

const { width } = Dimensions.get("window");

const Container = styled.View`
  flex: 1;
`;

const SearchButton = styled.TouchableOpacity`
  position: absolute;
  top: 65px;
  left: 25px;
  width: ${width - 50};
`;

const Home = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
  useFocusEvent();
  return (
    <SafeAreaContainer>
      <CustomHeader size="big">어디개</CustomHeader>
      <Container>
        <HomeTopTapNavigator />
        <SearchButton activeOpacity={0.8} onPress={() => console.log("hi")}>
          <Input isHomeInput RightIcon={() => <Search />} />
        </SearchButton>
      </Container>
      <AddCircleButton
        isFloating={true}
        size={50}
        onPress={() => navigation.navigate("PostAnimalInfo")}
      />
    </SafeAreaContainer>
  );
};

export default Home;
