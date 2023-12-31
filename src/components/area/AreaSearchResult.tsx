import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getAddress } from "~/api/place";
import useDebounce from "~/hooks/useDebounce";
import { useDispatch } from "react-redux";
import { useAppSelector } from "~/store";
import SearchResultItem from "./AreaSearchResultItem";
import MyText from "~/components/common/MyText";
import { storageActions } from "~/store/storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const AreaSearchResult = ({ isUpdateArea }: { isUpdateArea?: boolean }) => {
  const { top } = useSafeAreaInsets();
  const address = useAppSelector(
    state => state.deviceSetting.draft.area.address,
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

  useEffect(() => {
    if (value) {
      getAddress(value).then(data => setData(data));
    } else {
      setData([]);
    }
  }, [value]);

  const onClean = () => {
    dispatch(storageActions.setSafetyZoneSearchHistory(null));
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      style={{
        ...(StyleSheet.absoluteFill as object),
        backgroundColor: "white",
        zIndex: 2,
      }}
      contentContainerStyle={{
        paddingTop: isUpdateArea ? 85 : top + 71,
        paddingHorizontal: 17,
        ...(isUpdateArea && { flexGrow: 1 }),
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
              onPress={onClean}
              style={{ marginVertical: 25, textAlign: "center" }}
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

export default AreaSearchResult;
