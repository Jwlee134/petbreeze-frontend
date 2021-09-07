import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import ShadowContainer from "~/components/common/container/ShadowContainer";
import { rpWidth, width } from "~/styles";

import Arrow from "~/assets/svg/arrow-left-blue.svg";
import { Keyboard } from "react-native";
import { useState } from "react";
import SearchResult from "./SearchResult";
import { useDispatch } from "react-redux";
import { useAppSelector } from "~/store";
import { safetyZoneActions } from "~/store/safetyZone";

const Container = styled.View`
  width: ${width - rpWidth(32)}px;
  height: ${rpWidth(45)}px;
  border-radius: 100px;
  background-color: white;
  flex-direction: row;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  width: ${rpWidth(53)}px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Input = styled.TextInput`
  flex-grow: 1;
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: ${rpWidth(16)}px;
  font-family: "NotoSansKR-Medium";
  color: black;
`;

const SearchBar = () => {
  const { top } = useSafeAreaInsets();
  const isSearchMode = useAppSelector(state => state.safetyZone.isSearchMode);
  const addr = useAppSelector(state => state.safetyZone.addr);
  const dispatch = useDispatch();

  return (
    <>
      {isSearchMode && <SearchResult />}
      <ShadowContainer
        shadowOpacity={0.1}
        shadowRadius={10}
        style={{
          position: "absolute",
          top: rpWidth(9) + top,
          alignSelf: "center",
          zIndex: 3,
        }}>
        <Container>
          {isSearchMode && (
            <Button
              onPress={() => {
                dispatch(safetyZoneActions.setIsSearchMode(false));
                Keyboard.dismiss();
              }}>
              <Arrow width={rpWidth(9)} height={rpWidth(15)} />
            </Button>
          )}
          <Input
            value={addr}
            onChangeText={text => dispatch(safetyZoneActions.setAddr(text))}
            onFocus={() => dispatch(safetyZoneActions.setIsSearchMode(true))}
            placeholder="주소 검색"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            style={{
              includeFontPadding: false,
              paddingLeft: isSearchMode ? 0 : rpWidth(22),
            }}
          />
        </Container>
      </ShadowContainer>
    </>
  );
};

export default SearchBar;
