import React from "react";
import { Keyboard, StyleSheet } from "react-native";
import styled from "styled-components/native";
import Search from "~/assets/svg/search.svg";
import MyText from "~/components/common/MyText";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";
import { deviceSettingActions } from "~/store/deviceSetting";

const Button = styled.TouchableOpacity`
  height: 44px;
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
  item: { address: string; latitude: number; longitude: number };
}) => {
  const dispatch = useDispatch();

  const onPress = () => {
    Keyboard.dismiss();
    dispatch(
      deviceSettingActions.setSafetyZone({
        draft: { address: item.address },
      }),
    );
    dispatch(storageActions.setSafetyZoneSearchHistory(item));
    setTimeout(() => {
      dispatch(
        deviceSettingActions.setSafetyZone({
          isSearchMode: false,
          animateCamera: true,
          draft: {
            coord: { latitude: item.latitude, longitude: item.longitude },
          },
        }),
      );
    }, 200);
  };

  return (
    <>
      <Button onPress={onPress}>
        <Search style={{ marginHorizontal: 13 }} width={18} height={18} />
        <MyText>{item.address}</MyText>
      </Button>
      <Divider />
    </>
  );
};

export default SearchResultItem;
