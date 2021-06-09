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

  const subCategoryList = useMemo(() => {
    const list = (data[bigCategoryIndex][bigCategory] as SubCategoryList).map(
      item => {
        if (typeof item !== "string") {
          return Object.keys(item)[0];
        }
        return item;
      },
    );
    if (list.length === 0) return [""];
    return list;
  }, [bigCategory]);

  const detailCategoryList = useMemo<string[]>(() => {
    if (!subCategory) return;
    const arr = (data[bigCategoryIndex][bigCategory] as SubCategoryList).filter(
      item => {
        if (typeof item === "string") return false;
        return Object.keys(item)[0] === subCategory;
      },
    );
    if (arr.length === 0) return [""];
    return Object.values(arr[0])[0];
  }, [subCategory]);

  const handleList = () => {
    switch (step) {
      case 1:
        return bigCategoryList;
      case 2:
        return subCategoryList;
      default:
        return detailCategoryList;
    }
  };

  const handleDone = (index?: number) => {
    switch (step) {
      case 1:
        setBigCategory(bigCategoryList[!index ? bigCategoryIndex : index]);
        setStep(prev => prev + 1);
        break;
      case 2:
        setSubCategory(subCategoryList[!index ? subCategoryIndex : index]);
        setStep(prev => prev + 1);
        break;
      default:
        setDetailCategory(
          detailCategoryList[!index ? detailCategoryIndex : index],
        );
        setStep(prev => prev + 1);
        break;
    }
  };

  const selectedIndex =
    step === 1
      ? bigCategoryIndex
      : step === 2
      ? subCategoryIndex
      : detailCategoryIndex;

  const setSelectedIndex = (index: number) => {
    switch (step) {
      case 1:
        setBigCategryIndex(index);
        break;
      case 2:
        setSubCategoryIndex(index);
        break;
      default:
        setDetailCategoryIndex(index);
        break;
    }
  };

  const done = () => {
    close();
    setTimeout(() => {
      reset();
    }, 300);
  };

  useEffect(() => {
    if (step === 2 && subCategoryList.length === 1) {
      setValue(bigCategory);
      done();
    }
    if (step === 3 && detailCategoryList.length === 1) {
      setValue(`${bigCategory} ${subCategory}`);
      done();
    }
    if (step === 4 && detailCategoryList.length > 1 && detailCategory) {
      setValue(`${bigCategory} ${subCategory} ${detailCategory}`);
      done();
    }
  }, [step]);

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
