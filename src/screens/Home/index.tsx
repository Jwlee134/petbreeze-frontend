import React from "react";
import AddCircleButton from "~/components/common/AddCircleButton";
import SafeAreaContainer from "~/components/common/SafeAreaContainer";
import ScreenHeader from "~/components/common/ScreenHeader";
import useFocusEvent from "~/hooks/useFocusEvent";
import HomeTopTapNavigator from "~/navigator/HomeTopTabNav";
import { HomeScreenNavigationProp } from "~/types/navigator";

const Home = ({ navigation }: { navigation: HomeScreenNavigationProp }) => {
  useFocusEvent();
  return (
    <SafeAreaContainer>
      <ScreenHeader size="big">어디개</ScreenHeader>
      <HomeTopTapNavigator />
      <AddCircleButton
        isFloating={true}
        size={50}
        onPress={() => navigation.navigate("PostAnimalInfo")}
      />
    </SafeAreaContainer>
  );
};

export default Home;
