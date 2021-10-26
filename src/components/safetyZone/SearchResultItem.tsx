import React, { useContext } from "react";
import { Keyboard, StyleSheet } from "react-native";
import styled from "styled-components/native";
import Search from "~/assets/svg/search.svg";
import MyText from "~/components/common/MyText";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";
import { deviceSettingActions } from "~/store/deviceSetting";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";

const Button = styled.TouchableOpacity<{ rpWidth: RpWidth }>`
  height: ${({ rpWidth }) => rpWidth(44)}px;
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
  const { rpWidth } = useContext(DimensionsContext);

  return (
    <>
      <Button
        rpWidth={rpWidth}
        onPress={() => {
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
        }}>
        <Search
          style={{
            marginHorizontal: rpWidth(13),
          }}
          width={rpWidth(18)}
          height={rpWidth(18)}
        />
        <MyText>{item.address}</MyText>
      </Button>
      <Divider />
    </>
  );
};

export default SearchResultItem;
