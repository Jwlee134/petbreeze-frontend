import React, { useContext, useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getAddress } from "~/api/place";
import useDebounce from "~/hooks/useDebounce";
import { useDispatch } from "react-redux";
import { useAppSelector } from "~/store";
import SearchResultItem from "./SearchResultItem";
import MyText from "~/components/common/MyText";
import { storageActions } from "~/store/storage";
import { DimensionsContext } from "~/context/DimensionsContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SearchResult = () => {
  const { top } = useSafeAreaInsets();
  const address = useAppSelector(
    state => state.deviceSetting.safetyZone.draft.address,
  );
  const history = useAppSelector(
    state => state.storage.history.safetyZoneSearch,
  );
  const value = useDebounce(address, 200);
  const [data, setData] = useState<
    {
      address: string;
      latitude: number;
      longitude: number;
    }[]
  >([]);
  const dispatch = useDispatch();
  const { height, rpWidth } = useContext(DimensionsContext);

  useEffect(() => {
    if (value) {
      getAddress(value).then(data => setData(data));
    } else {
      setData([]);
    }
  }, [value]);

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      style={{
        ...(StyleSheet.absoluteFill as object),
        backgroundColor: "white",
        zIndex: 2,
      }}
      contentContainerStyle={{
        paddingTop: top + rpWidth(71),
        paddingHorizontal: rpWidth(17),
        minHeight: height,
      }}>
      {data.length ? (
        data.map((item, i) => <SearchResultItem item={item} key={i} />)
      ) : !address ? (
        <>
          {history.map((item, i) => (
            <SearchResultItem item={item} key={i} />
          ))}
          {history.length ? (
            <MyText
              onPress={() =>
                dispatch(storageActions.setSafetyZoneSearchHistory(null))
              }
              style={{ marginTop: rpWidth(25), textAlign: "center" }}
              fontSize={14}
              color="rgba(0, 0, 0, 0.5)">
              검색 히스토리 삭제
            </MyText>
          ) : null}
        </>
      ) : null}
    </KeyboardAwareScrollView>
  );
};

export default SearchResult;
