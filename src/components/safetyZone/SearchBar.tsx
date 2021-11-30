import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

import Arrow from "~/assets/svg/arrow/arrow-left-blue.svg";
import { Keyboard, TouchableOpacity, useWindowDimensions } from "react-native";
import SearchResult from "./SearchResult";
import { useDispatch } from "react-redux";
import { useAppSelector } from "~/store";
import { deviceSettingActions } from "~/store/deviceSetting";
import { useNavigation } from "@react-navigation/native";
import Search from "~/assets/svg/search.svg";
import { Shadow } from "react-native-shadow-2";

const Container = styled.View`
  border-radius: 100px;
  background-color: white;
  flex-direction: row;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  width: 53px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Input = styled.TextInput`
  flex-grow: 1;
  flex-shrink: 1;
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-family: "NotoSansKR-Medium";
  color: black;
`;

const SearchBar = () => {
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const isSearchMode = useAppSelector(
    state => state.deviceSetting.safetyZone.isSearchMode,
  );
  const address = useAppSelector(
    state => state.deviceSetting.safetyZone.draft.address,
  );
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  const onArrowPress = () => {
    if (isSearchMode) {
      dispatch(deviceSettingActions.setSafetyZone({ isSearchMode: false }));
      Keyboard.dismiss();
    } else {
      navigation.goBack();
    }
  };

  const onChangeText = (text: string) => {
    dispatch(deviceSettingActions.setSafetyZone({ draft: { address: text } }));
  };

  const onFocus = () => {
    dispatch(deviceSettingActions.setSafetyZone({ isSearchMode: true }));
  };

  const onSearchButtonPress = () => {
    dispatch(deviceSettingActions.setSafetyZone({ isSearchMode: true }));
  };

  return (
    <>
      {isSearchMode && <SearchResult />}
      <Shadow
        startColor="rgba(0, 0, 0, 0.05)"
        viewStyle={{ borderRadius: 100 }}
        containerViewStyle={{
          position: "absolute",
          top: 9 + top,
          alignSelf: "center",
          zIndex: 3,
        }}>
        <Container style={{ width: width - 32, height: 45 }}>
          <Button onPress={onArrowPress}>
            <Arrow width={9} height={15} />
          </Button>
          <Input
            value={address}
            numberOfLines={1}
            onChangeText={onChangeText}
            onFocus={onFocus}
            placeholder="주소 검색"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            style={{ includeFontPadding: false }}
          />
          <TouchableOpacity onPress={onSearchButtonPress}>
            <Search style={{ marginHorizontal: 18 }} width={18} height={18} />
          </TouchableOpacity>
        </Container>
      </Shadow>
    </>
  );
};

export default SearchBar;
