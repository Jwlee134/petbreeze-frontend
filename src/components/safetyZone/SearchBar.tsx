import React, { useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import ShadowContainer from "~/components/common/container/ShadowContainer";

import Arrow from "~/assets/svg/arrow/arrow-left-blue.svg";
import { Keyboard, TouchableOpacity } from "react-native";
import SearchResult from "./SearchResult";
import { useDispatch } from "react-redux";
import { useAppSelector } from "~/store";
import { deviceSettingActions } from "~/store/deviceSetting";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import { useNavigation } from "@react-navigation/native";
import Search from "~/assets/svg/search.svg";

const Container = styled.View`
  border-radius: 100px;
  background-color: white;
  flex-direction: row;
  align-items: center;
`;

const Button = styled.TouchableOpacity<{ rpWidth: RpWidth }>`
  width: ${({ rpWidth }) => rpWidth(53)}px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Input = styled.TextInput<{ rpWidth: RpWidth }>`
  flex-grow: 1;
  flex-shrink: 1;
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: ${({ rpWidth }) => rpWidth(16)}px;
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
  const { rpWidth, width } = useContext(DimensionsContext);

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
        <Container
          style={{
            width: width - rpWidth(32),
            height: rpWidth(45),
          }}>
          <Button
            rpWidth={rpWidth}
            onPress={() => {
              if (isSearchMode) {
                dispatch(
                  deviceSettingActions.setSafetyZone({
                    isSearchMode: false,
                  }),
                );
                Keyboard.dismiss();
              } else {
                navigation.goBack();
              }
            }}>
            <Arrow width={rpWidth(9)} height={rpWidth(15)} />
          </Button>
          <Input
            rpWidth={rpWidth}
            value={address}
            numberOfLines={1}
            onChangeText={text =>
              dispatch(
                deviceSettingActions.setSafetyZone({
                  draft: { address: text },
                }),
              )
            }
            onFocus={() =>
              dispatch(
                deviceSettingActions.setSafetyZone({
                  isSearchMode: true,
                }),
              )
            }
            placeholder="주소 검색"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            style={{
              includeFontPadding: false,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              dispatch(
                deviceSettingActions.setSafetyZone({
                  isSearchMode: true,
                }),
              );
            }}>
            <Search
              style={{
                marginHorizontal: rpWidth(18),
              }}
              width={rpWidth(18)}
              height={rpWidth(18)}
            />
          </TouchableOpacity>
        </Container>
      </ShadowContainer>
    </>
  );
};

export default SearchBar;
