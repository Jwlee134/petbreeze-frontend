import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";
import Arrow from "~/assets/svg/arrow/arrow-left-blue.svg";
import { Keyboard, TouchableOpacity, useWindowDimensions } from "react-native";
import SearchResult from "./AreaSearchResult";
import { useDispatch } from "react-redux";
import { useAppSelector } from "~/store";
import { deviceSettingActions } from "~/store/deviceSetting";
import Search from "~/assets/svg/area/search.svg";
import { Shadow } from "react-native-shadow-2";
import { AreaScreenNavigationProp } from "~/types/navigator";

interface InputProps {
  isUpdateArea?: boolean;
  isSearchMode: boolean;
}

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

const Input = styled.TextInput<InputProps>`
  flex-grow: 1;
  flex-shrink: 1;
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: "NotoSansKR-Medium";
  ${({ isUpdateArea, isSearchMode }) =>
    isUpdateArea
      ? css`
          font-size: 14px;
          color: rgba(0, 0, 0, 0.5);
          padding-left: ${isSearchMode ? 0 : 22}px;
        `
      : css`
          font-size: 16px;
          color: black;
        `}
`;

interface Props {
  navigation?: AreaScreenNavigationProp;
  isUpdateArea?: boolean;
}

const AreaSearchBar = ({ navigation, isUpdateArea }: Props) => {
  const { top } = useSafeAreaInsets();
  const isSearchMode = useAppSelector(
    state => state.deviceSetting.area.isSearchMode,
  );
  const address = useAppSelector(
    state => state.deviceSetting.draft.area.address,
  );
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  const onArrowPress = () => {
    if (isSearchMode) {
      dispatch(deviceSettingActions.setArea({ isSearchMode: false }));
      Keyboard.dismiss();
    } else {
      if (navigation) navigation.goBack();
    }
  };

  const onChangeText = (text: string) => {
    dispatch(deviceSettingActions.setAreaDraft({ address: text }));
  };

  const onFocus = () => {
    dispatch(deviceSettingActions.setArea({ isSearchMode: true }));
  };

  const onSearchButtonPress = () => {
    dispatch(deviceSettingActions.setArea({ isSearchMode: true }));
  };

  return (
    <>
      {isSearchMode && <SearchResult isUpdateArea={isUpdateArea} />}
      <Shadow
        startColor="rgba(0, 0, 0, 0.05)"
        viewStyle={{ borderRadius: 100 }}
        containerViewStyle={{
          position: "absolute",
          top: isUpdateArea ? 23 : 9 + top,
          alignSelf: "center",
          zIndex: 3,
        }}>
        <Container style={{ width: width - 32, height: 45 }}>
          {isUpdateArea && !isSearchMode ? null : (
            <Button onPress={onArrowPress}>
              <Arrow />
            </Button>
          )}
          <Input
            value={address}
            numberOfLines={1}
            onChangeText={onChangeText}
            onFocus={onFocus}
            placeholder="주소 검색"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            isUpdateArea={isUpdateArea}
            isSearchMode={isSearchMode}
            style={{ includeFontPadding: false }}
          />
          <TouchableOpacity onPress={onSearchButtonPress}>
            <Search style={{ marginHorizontal: 27 }} />
          </TouchableOpacity>
        </Container>
      </Shadow>
    </>
  );
};

export default AreaSearchBar;
