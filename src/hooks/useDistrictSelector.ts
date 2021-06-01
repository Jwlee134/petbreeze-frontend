import { useEffect, useMemo, useState } from "react";
import data from "~/assets/administrative-district.json";
import { BigCategory, SubCategoryList } from "~/types";
import useModal from "./useModal";

const useDistrictSelector = () => {
  const [step, setStep] = useState(1);

  const [bigCategory, setBigCategory] = useState<BigCategory>("서울특별시");
  const [bigCategoryIndex, setBigCategryIndex] = useState(0);
  const [subCategory, setSubCategory] = useState("");
  const [subCategoryIndex, setSubCategoryIndex] = useState(0);
  const [detailCategory, setDetailCategory] = useState("");
  const [detailCategoryIndex, setDetailCategoryIndex] = useState(0);

  const [value, setValue] = useState("");

  const reset = () => {
    setStep(1);
    setBigCategryIndex(0);
    setSubCategoryIndex(0);
    setDetailCategoryIndex(0);
  };

  const { open, close, modalProps, BottomModalComponent } = useModal({
    type: "bottom",
    handleCancel: reset,
  });

  const bigCategoryList = useMemo(
    () => data.map(item => Object.keys(item)[0]) as BigCategory[],
    [],
  );

  const subCategoryList = useMemo(
    () =>
      (data[bigCategoryIndex][bigCategory] as SubCategoryList).map(item => {
        if (typeof item !== "string") {
          return Object.keys(item)[0];
        }
        return item;
      }),
    [bigCategory],
  );

  const detailCategoryList = useMemo<string[]>(() => {
    if (!subCategory) return;
    const arr = (data[bigCategoryIndex][bigCategory] as SubCategoryList).filter(
      item => {
        if (typeof item === "string") return false;
        return Object.keys(item)[0] === subCategory;
      },
    );
    if (arr.length === 0) return [];
    return Object.values(arr[0])[0];
  }, [subCategory]);

  const handleList = () => {
    if (step === 1) {
      return bigCategoryList;
    } else if (step === 2) {
      return subCategoryList;
    } else {
      return detailCategoryList;
    }
  };

  const handleDone = () => {
    if (step === 1) {
      setBigCategory(bigCategoryList[bigCategoryIndex]);
      setStep(prev => prev + 1);
    } else if (step === 2) {
      setSubCategory(subCategoryList[subCategoryIndex]);
      setStep(prev => prev + 1);
    } else {
      setDetailCategory(detailCategoryList[detailCategoryIndex]);
    }
  };

  useEffect(() => {
    if (step === 2 && subCategoryList.length === 0) {
      setValue(bigCategory);
      reset();
      close();
      return;
    } else if (step === 3 && detailCategoryList.length === 0) {
      setValue(`${bigCategory} ${subCategory}`);
      reset();
      close();
      return;
    }
  }, [step]);

  useEffect(() => {
    if (detailCategory) {
      setValue(`${bigCategory} ${subCategory} ${detailCategory}`);
      reset();
      close();
    }
  }, [detailCategory]);

  const selectedIndex =
    step === 1
      ? bigCategoryIndex
      : step === 2
      ? subCategoryIndex
      : detailCategoryIndex;

  const setSelectedIndex = (index: number) => {
    if (step === 1) {
      setBigCategryIndex(index);
    } else if (step === 2) {
      setSubCategoryIndex(index);
    } else {
      setDetailCategoryIndex(index);
    }
  };

  return {
    handleList,
    handleDone,
    selectedIndex,
    setSelectedIndex,
    value,
    open,
    modalProps,
    BottomModalComponent,
  };
};

export default useDistrictSelector;
