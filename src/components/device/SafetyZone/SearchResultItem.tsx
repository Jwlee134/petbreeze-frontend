import React from "react";
import { Keyboard, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { rpWidth } from "~/styles";
import { safetyZoneActions } from "~/store/safetyZone";
import Search from "~/assets/svg/search.svg";
import MyText from "~/components/common/MyText";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";
import { useAppSelector } from "~/store";

const Button = styled.TouchableOpacity`
  height: ${rpWidth(44)}px;
  flex-direction: row;
  align-items: center;
`;

const Divider = styled.View`
  height: ${StyleSheet.hairlineWidth}px;
  background-color: rgba(0, 0, 0, 0.3);
`;

const SearchResultItem = ({
  item,
}: {
  item: { addr: string; latitude: number; longitude: number };
}) => {
  const history = useAppSelector(
    state => state.storage.history.safetyZoneSearch,
  );
  const dispatch = useDispatch();

  return (
    <>
      <Button
        onPress={() => {
          Keyboard.dismiss();
          dispatch(safetyZoneActions.setAddr(item.addr));
          dispatch(
            storageActions.setSafetyZoneSearchHistory([item, ...history]),
          );
          setTimeout(() => {
            dispatch(safetyZoneActions.setIsSearchMode(false));
            dispatch(safetyZoneActions.setAnimateCamera(true));
            dispatch(
              safetyZoneActions.setCoord({
                latitude: item.latitude,
                longitude: item.longitude,
              }),
            );
          }, 200);
        }}>
        <Search
          style={{
            marginHorizontal: rpWidth(13),
          }}
          width={rpWidth(18)}
          height={rpWidth(18)}
        />
        <MyText>{item.addr}</MyText>
      </Button>
      <Divider />
    </>
  );
};

export default SearchResultItem;
